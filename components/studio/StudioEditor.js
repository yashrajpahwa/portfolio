"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import readingTime from "reading-time";
import { ArrowUpRight, Columns2, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import MarkdownEditor from "@/components/studio/MarkdownEditor";
import PreviewPane from "@/components/studio/PreviewPane";
import { formatDate } from "@/lib/utils";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyForm = {
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tags: "",
  hosted: true,
  mediumUrl: "",
  content: "",
};

function draftKey(slug) {
  return `studio-draft:${slug || "new"}`;
}

const modes = [
  { id: "write", label: "write", icon: Pencil },
  { id: "split", label: "split", icon: Columns2 },
  { id: "preview", label: "preview", icon: Eye },
];

const inputClass =
  "w-full bg-surface border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors duration-150 ease-out";

export default function StudioEditor() {
  const [posts, setPosts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [mode, setMode] = useState("split");
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState(null);
  const [modKey, setModKey] = useState("Ctrl");
  const [pendingDraft, setPendingDraft] = useState(null);

  const lastSavedFormRef = useRef(emptyForm);
  const draftSaveTimerRef = useRef(null);
  const saveRef = useRef(() => {});
  const isDirtyRef = useRef(false);

  const isDirty = JSON.stringify(form) !== JSON.stringify(lastSavedFormRef.current);
  isDirtyRef.current = isDirty;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only platform check
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");
  }, []);

  useEffect(() => {
    loadPosts();
    checkForDraft(null, emptyForm);
  }, []);

  // Autosave the in-progress form to localStorage so a closed tab or crash
  // doesn't lose work that hasn't been written to disk yet.
  useEffect(() => {
    clearTimeout(draftSaveTimerRef.current);
    draftSaveTimerRef.current = setTimeout(() => {
      const key = draftKey(selectedSlug);
      if (!form.title && !form.content) {
        window.localStorage.removeItem(key);
        return;
      }
      window.localStorage.setItem(key, JSON.stringify({ form, savedAt: Date.now() }));
    }, 500);
    return () => clearTimeout(draftSaveTimerRef.current);
  }, [form, selectedSlug]);

  useEffect(() => {
    function handleGlobalSave(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    }
    function handleBeforeUnload(e) {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("keydown", handleGlobalSave);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("keydown", handleGlobalSave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function checkForDraft(slug, baseForm) {
    const raw = window.localStorage.getItem(draftKey(slug));
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (JSON.stringify(parsed.form) !== JSON.stringify(baseForm)) {
        setPendingDraft({ key: draftKey(slug), ...parsed });
      }
    } catch {
      window.localStorage.removeItem(draftKey(slug));
    }
  }

  function restoreDraft() {
    if (!pendingDraft) return;
    setForm(pendingDraft.form);
    setSlugTouched(true);
    setPendingDraft(null);
  }

  function discardDraft() {
    if (!pendingDraft) return;
    window.localStorage.removeItem(pendingDraft.key);
    setPendingDraft(null);
  }

  async function loadPosts() {
    const res = await fetch("/api/studio/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  }

  function selectPost(post) {
    if (isDirtyRef.current && !window.confirm("Discard unsaved changes?")) return;
    const loaded = {
      slug: post.slug,
      title: post.title || "",
      date: post.date || emptyForm.date,
      excerpt: post.excerpt || "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      hosted: post.hosted !== false,
      mediumUrl: post.mediumUrl || "",
      content: post.content || "",
    };
    setSelectedSlug(post.slug);
    setSlugTouched(true);
    setForm(loaded);
    setStatus(null);
    lastSavedFormRef.current = loaded;
    setPendingDraft(null);
    checkForDraft(post.slug, loaded);
  }

  function newPost() {
    if (isDirtyRef.current && !window.confirm("Discard unsaved changes?")) return;
    setSelectedSlug(null);
    setSlugTouched(false);
    setForm(emptyForm);
    setStatus(null);
    lastSavedFormRef.current = emptyForm;
    setPendingDraft(null);
    checkForDraft(null, emptyForm);
  }

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
    if (field === "slug") setSlugTouched(true);
    setStatus(null);
  }

  saveRef.current = save;

  async function save(overwrite = false) {
    setStatus(null);
    const payload = {
      ...form,
      previousSlug: selectedSlug,
      overwrite,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const res = await fetch("/api/studio/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.status === 409 && data.code === "EXISTS") {
      if (window.confirm(`${form.slug}.mdx already exists. Overwrite it?`)) {
        return save(true);
      }
      setStatus({ type: "error", message: "Save cancelled — change the slug to keep both." });
      return;
    }

    if (!res.ok) {
      setStatus({ type: "error", message: data.error || "Save failed." });
      return;
    }

    window.localStorage.removeItem(draftKey(selectedSlug));
    window.localStorage.removeItem(draftKey(data.slug));
    lastSavedFormRef.current = form;
    setSelectedSlug(data.slug);
    setStatus({
      type: "ok",
      message: data.renamedFrom
        ? `Saved and renamed ${data.renamedFrom}.mdx → ${data.slug}.mdx`
        : `Saved content/blog/${data.slug}.mdx`,
    });
    await loadPosts();
  }

  async function remove() {
    if (!selectedSlug) return;
    if (!window.confirm(`Delete content/blog/${selectedSlug}.mdx? This can't be undone.`)) return;

    await fetch(`/api/studio/posts/${selectedSlug}`, { method: "DELETE" });
    window.localStorage.removeItem(draftKey(selectedSlug));
    setSelectedSlug(null);
    setSlugTouched(false);
    setForm(emptyForm);
    lastSavedFormRef.current = emptyForm;
    setStatus({ type: "ok", message: `Deleted ${selectedSlug}.mdx` });
    await loadPosts();
  }

  const sortedPosts = useMemo(() => {
    const query = filter.trim().toLowerCase();
    return [...posts]
      .filter(
        (post) =>
          !query ||
          (post.title || "").toLowerCase().includes(query) ||
          post.slug.includes(query)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts, filter]);

  const stats = useMemo(() => {
    const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0;
    return { words, readingTime: words > 0 ? readingTime(form.content).text : null };
  }, [form.content]);

  const showEditor = form.hosted && (mode === "write" || mode === "split");
  const showPreview = form.hosted && (mode === "preview" || mode === "split");

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="text-xl font-medium tracking-tight">Studio</h1>
          <p className="font-mono text-xs text-muted mt-1">
            Local only &middot; writes to content/blog &middot; commit &amp; push to publish
          </p>
        </div>
        <button
          type="button"
          onClick={newPost}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-accent"
        >
          <Plus size={13} strokeWidth={1.5} /> new post
        </button>
      </div>

      {pendingDraft && (
        <div className="flex items-center justify-between gap-4 mb-6 rounded-md border border-accent-dim bg-surface px-4 py-3">
          <p className="font-mono text-xs text-muted">
            Found unsaved changes from {new Date(pendingDraft.savedAt).toLocaleTimeString()} for{" "}
            <span className="text-text">{pendingDraft.form.title || "an untitled post"}</span>.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={restoreDraft}
              className="font-mono text-xs text-accent transition-opacity duration-150 ease-out hover:opacity-80"
            >
              restore
            </button>
            <button
              type="button"
              onClick={discardDraft}
              className="font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-text"
            >
              discard
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside className="md:border-r md:border-border md:pr-6">
          <label className="relative block mb-3">
            <Search
              size={13}
              strokeWidth={1.5}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="filter posts"
              aria-label="Filter posts"
              className="w-full bg-surface border border-border rounded-md pl-8 pr-3 py-1.5 font-mono text-xs outline-none focus:border-accent transition-colors duration-150 ease-out"
            />
          </label>

          <div className="space-y-0.5">
            {sortedPosts.map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => selectPost(post)}
                aria-current={selectedSlug === post.slug ? "true" : undefined}
                className={`block w-full text-left py-1.5 transition-colors duration-150 ease-out ${
                  selectedSlug === post.slug ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                <span className="block text-sm truncate">
                  {post.title || post.slug}
                  {post.hosted === false && (
                    <ArrowUpRight size={11} strokeWidth={1.5} className="inline ml-1 align-baseline" />
                  )}
                </span>
                <span className="block font-mono text-[11px] opacity-70">
                  {post.date ? formatDate(post.date) : "no date"}
                </span>
              </button>
            ))}
            {sortedPosts.length === 0 && (
              <p className="font-mono text-xs text-muted">
                {posts.length === 0 ? "No posts yet." : "No matches."}
              </p>
            )}
          </div>
        </aside>

        <div className="space-y-6 min-w-0">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">title</span>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">
                slug{selectedSlug && form.slug !== selectedSlug ? " (will rename file)" : ""}
              </span>
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", slugify(e.target.value))}
                className={`${inputClass} font-mono`}
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">date</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className={`${inputClass} font-mono`}
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">tags (comma separated)</span>
              <input
                value={form.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block space-y-1 sm:col-span-2">
              <span className="font-mono text-xs text-muted">excerpt</span>
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={2}
                className={`${inputClass} resize-y`}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 font-mono text-xs text-muted">
              <input
                type="checkbox"
                checked={form.hosted}
                onChange={(e) => updateField("hosted", e.target.checked)}
                className="accent-accent"
              />
              hosted on this site
            </label>
            {!form.hosted && (
              <input
                placeholder="https://medium.com/..."
                value={form.mediumUrl}
                onChange={(e) => updateField("mediumUrl", e.target.value)}
                aria-label="Medium URL"
                className={`${inputClass} flex-1 font-mono`}
              />
            )}
            {form.hosted && (
              <div
                role="tablist"
                aria-label="Editor mode"
                className="ml-auto flex items-center rounded-md border border-border overflow-hidden"
              >
                {modes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={mode === id}
                    onClick={() => setMode(id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out ${
                      mode === id ? "bg-surface text-accent" : "text-muted hover:text-text"
                    }`}
                  >
                    <Icon size={12} strokeWidth={1.5} /> {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {form.hosted && (
            <div className={mode === "split" ? "grid lg:grid-cols-2 gap-4 items-start" : ""}>
              {showEditor && (
                <MarkdownEditor
                  key={selectedSlug || "new"}
                  value={form.content}
                  onChange={(value) => updateField("content", value)}
                  onSave={() => saveRef.current()}
                  onStatus={setStatus}
                  modKey={modKey}
                />
              )}
              {showPreview && (
                <PreviewPane
                  title={form.title}
                  date={form.date}
                  readingTimeText={stats.readingTime}
                  content={form.content}
                />
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => save()}
              title={`Save (${modKey}+S)`}
              className="font-mono text-xs bg-accent text-bg px-4 py-2 rounded-md transition-opacity duration-150 ease-out hover:opacity-90"
            >
              save <span className="opacity-70">({modKey}+S)</span>
            </button>
            {selectedSlug && (
              <>
                <button
                  type="button"
                  onClick={remove}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-accent"
                >
                  <Trash2 size={12} strokeWidth={1.5} /> delete
                </button>
                {form.hosted && (
                  <a
                    href={`/blog/${selectedSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-accent"
                  >
                    view post <ArrowUpRight size={11} strokeWidth={1.5} />
                  </a>
                )}
              </>
            )}
            {isDirty && !status && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                unsaved changes
              </span>
            )}
            {status && (
              <span
                role="status"
                aria-live="polite"
                className={`font-mono text-xs ${status.type === "error" ? "text-red-400" : "text-muted"}`}
              >
                {status.message}
              </span>
            )}
            {form.hosted && stats.words > 0 && (
              <span className="ml-auto font-mono text-xs text-muted">
                {stats.words} words &middot; {stats.readingTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
