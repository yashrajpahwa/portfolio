"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import {
  Plus,
  Trash2,
  Eye,
  Pencil,
  Bold,
  Italic,
  Link2,
  Code,
  Code2,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";


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

export default function StudioEditor() {
  const [posts, setPosts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [tab, setTab] = useState("write");
  const [previewSource, setPreviewSource] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [status, setStatus] = useState(null);
  const [modKey, setModKey] = useState("Ctrl");
  const [historyState, setHistoryState] = useState({ canUndo: false, canRedo: false });
  const [pendingDraft, setPendingDraft] = useState(null);
  const debounceRef = useRef(null);
  const textareaRef = useRef(null);
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);
  const lastHistoryPushRef = useRef(0);
  const lastSavedFormRef = useRef(emptyForm);
  const draftSaveTimerRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only platform check, mirrors ThemeToggle's mount pattern
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
    if (tab !== "preview") return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchPreview(form.content);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [form.content, tab]);

  const saveRef = useRef(() => {});

  useEffect(() => {
    function handleGlobalSave(e) {
      const isSave = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s";
      if (!isSave) return;
      e.preventDefault();
      saveRef.current();
    }
    window.addEventListener("keydown", handleGlobalSave);
    return () => window.removeEventListener("keydown", handleGlobalSave);
  }, []);

  function syncHistoryState() {
    setHistoryState({
      canUndo: undoStackRef.current.length > 0,
      canRedo: redoStackRef.current.length > 0,
    });
  }

  function pushHistory(prevContent, { immediate = false } = {}) {
    const now = Date.now();
    if (immediate || now - lastHistoryPushRef.current > 600) {
      undoStackRef.current.push(prevContent);
      if (undoStackRef.current.length > 100) undoStackRef.current.shift();
      redoStackRef.current = [];
    }
    lastHistoryPushRef.current = now;
    syncHistoryState();
  }

  function setContent(next, opts) {
    pushHistory(form.content, opts);
    updateField("content", next);
  }

  function undo() {
    if (undoStackRef.current.length === 0) return;
    const prev = undoStackRef.current.pop();
    redoStackRef.current.push(form.content);
    updateField("content", prev);
    syncHistoryState();
  }

  function redo() {
    if (redoStackRef.current.length === 0) return;
    const next = redoStackRef.current.pop();
    undoStackRef.current.push(form.content);
    updateField("content", next);
    syncHistoryState();
  }

  function resetHistory() {
    undoStackRef.current = [];
    redoStackRef.current = [];
    syncHistoryState();
  }

  function checkForDraft(slug, baseForm) {
    const key = draftKey(slug);
    const raw = window.localStorage.getItem(key);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (JSON.stringify(parsed.form) !== JSON.stringify(baseForm)) {
        setPendingDraft({ key, ...parsed });
      }
    } catch {
      window.localStorage.removeItem(key);
    }
  }

  function restoreDraft() {
    if (!pendingDraft) return;
    setForm(pendingDraft.form);
    setSlugTouched(true);
    resetHistory();
    setPendingDraft(null);
  }

  function discardDraft() {
    if (!pendingDraft) return;
    window.localStorage.removeItem(pendingDraft.key);
    setPendingDraft(null);
  }

  function wrapSelection(before, after = before, placeholder = "") {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || placeholder;
    const next =
      value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd);
    setContent(next, { immediate: true });
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = selectionStart + before.length;
      textarea.setSelectionRange(cursor, cursor + selected.length);
    });
  }

  function prefixLine(prefix) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, value } = textarea;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setContent(next, { immediate: true });
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = selectionStart + prefix.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  }

  function handleEditorKeyDown(e) {
    const mod = e.metaKey || e.ctrlKey;
    if (!mod) return;
    const key = e.key.toLowerCase();

    if (key === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if (key === "z" && e.shiftKey) {
      e.preventDefault();
      redo();
    } else if (key === "y") {
      e.preventDefault();
      redo();
    } else if (key === "b") {
      e.preventDefault();
      wrapSelection("**", "**", "bold text");
    } else if (key === "i") {
      e.preventDefault();
      wrapSelection("*", "*", "italic text");
    } else if (key === "k") {
      e.preventDefault();
      wrapSelection("[", "](https://)", "link text");
    } else if (key === "e") {
      e.preventDefault();
      wrapSelection("`", "`", "code");
    } else if (key === "." && e.shiftKey) {
      e.preventDefault();
      prefixLine("> ");
    } else if (key === "8" && e.shiftKey) {
      e.preventDefault();
      prefixLine("- ");
    } else if (key === "7" && e.shiftKey) {
      e.preventDefault();
      prefixLine("1. ");
    }
  }

  const toolbarActions = [
    { label: "Undo", shortcut: `${modKey}+Z`, icon: Undo2, run: undo, disabled: !historyState.canUndo },
    { label: "Redo", shortcut: `${modKey}+Shift+Z`, icon: Redo2, run: redo, disabled: !historyState.canRedo },
    { label: "Bold", shortcut: `${modKey}+B`, icon: Bold, run: () => wrapSelection("**", "**", "bold text") },
    { label: "Italic", shortcut: `${modKey}+I`, icon: Italic, run: () => wrapSelection("*", "*", "italic text") },
    { label: "Link", shortcut: `${modKey}+K`, icon: Link2, run: () => wrapSelection("[", "](https://)", "link text") },
    { label: "Inline code", shortcut: `${modKey}+E`, icon: Code, run: () => wrapSelection("`", "`", "code") },
    { label: "Code block", icon: Code2, run: () => wrapSelection("```\n", "\n```", "code") },
    { label: "Heading", icon: Heading2, run: () => prefixLine("## ") },
    { label: "Bullet list", shortcut: `${modKey}+Shift+8`, icon: List, run: () => prefixLine("- ") },
    { label: "Numbered list", shortcut: `${modKey}+Shift+7`, icon: ListOrdered, run: () => prefixLine("1. ") },
    { label: "Quote", shortcut: `${modKey}+Shift+.`, icon: Quote, run: () => prefixLine("> ") },
  ];

  async function loadPosts() {
    const res = await fetch("/api/studio/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  }

  async function fetchPreview(content) {
    setPreviewError(null);
    try {
      const res = await fetch("/api/studio/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Preview failed");
      setPreviewSource(data.mdxSource);
    } catch (err) {
      setPreviewError(err.message);
    }
  }

  function selectPost(post) {
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
    setTab("write");
    resetHistory();
    lastSavedFormRef.current = loaded;
    setPendingDraft(null);
    checkForDraft(post.slug, loaded);
  }

  function newPost() {
    setSelectedSlug(null);
    setSlugTouched(false);
    setForm(emptyForm);
    setStatus(null);
    setTab("write");
    resetHistory();
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

  async function save() {
    setStatus(null);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const res = await fetch("/api/studio/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus({ type: "error", message: data.error || "Save failed." });
      return;
    }

    window.localStorage.removeItem(draftKey(selectedSlug));
    lastSavedFormRef.current = form;
    setStatus({ type: "ok", message: `Saved content/blog/${data.slug}.mdx` });
    setSelectedSlug(data.slug);
    await loadPosts();
  }

  async function remove() {
    if (!selectedSlug) return;
    if (!window.confirm(`Delete content/blog/${selectedSlug}.mdx? This can't be undone.`)) return;

    await fetch(`/api/studio/posts/${selectedSlug}`, { method: "DELETE" });
    window.localStorage.removeItem(draftKey(selectedSlug));
    setStatus({ type: "ok", message: `Deleted ${selectedSlug}.mdx` });
    newPost();
    await loadPosts();
  }

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [posts]
  );

  const isDirty = JSON.stringify(form) !== JSON.stringify(lastSavedFormRef.current);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-10">
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

      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        <aside className="space-y-1 md:border-r md:border-border md:pr-6">
          {sortedPosts.map((post) => (
            <button
              key={post.slug}
              type="button"
              onClick={() => selectPost(post)}
              aria-current={selectedSlug === post.slug ? "true" : undefined}
              className={`block w-full text-left py-1.5 text-sm transition-colors duration-150 ease-out ${
                selectedSlug === post.slug ? "text-accent" : "text-muted hover:text-text"
              }`}
            >
              {post.title || post.slug}
            </button>
          ))}
          {sortedPosts.length === 0 && (
            <p className="font-mono text-xs text-muted">No posts yet.</p>
          )}
        </aside>

        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">title</span>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors duration-150 ease-out"
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">slug</span>
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", slugify(e.target.value))}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-accent transition-colors duration-150 ease-out"
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">date</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-accent transition-colors duration-150 ease-out"
              />
            </label>
            <label className="block space-y-1">
              <span className="font-mono text-xs text-muted">tags (comma separated)</span>
              <input
                value={form.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors duration-150 ease-out"
              />
            </label>
            <label className="block space-y-1 sm:col-span-2">
              <span className="font-mono text-xs text-muted">excerpt</span>
              <input
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors duration-150 ease-out"
              />
            </label>
          </div>

          <div className="flex items-center gap-4">
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
                className="flex-1 bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-accent transition-colors duration-150 ease-out"
              />
            )}
          </div>

          {form.hosted && (
            <div>
              <div
                className="flex items-center gap-1 border-b border-border mb-3"
                role="tablist"
                aria-label="Editor mode"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "write"}
                  onClick={() => setTab("write")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs -mb-px border-b transition-colors duration-150 ease-out ${
                    tab === "write" ? "text-accent border-accent" : "text-muted border-transparent hover:text-text"
                  }`}
                >
                  <Pencil size={12} strokeWidth={1.5} /> write
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "preview"}
                  onClick={() => setTab("preview")}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs -mb-px border-b transition-colors duration-150 ease-out ${
                    tab === "preview" ? "text-accent border-accent" : "text-muted border-transparent hover:text-text"
                  }`}
                >
                  <Eye size={12} strokeWidth={1.5} /> preview
                </button>
              </div>

              {tab === "write" ? (
                <div className="border border-border rounded-md overflow-hidden focus-within:border-accent transition-colors duration-150 ease-out">
                  <div
                    role="toolbar"
                    aria-label="Formatting"
                    className="flex items-center gap-0.5 border-b border-border bg-surface px-1.5 py-1"
                  >
                    {toolbarActions.map(({ label, shortcut, icon: Icon, run, disabled }, index) => (
                      <span key={label} className="flex items-center">
                        {(index === 2 || index === 6) && (
                          <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
                        )}
                        <button
                          type="button"
                          onClick={run}
                          disabled={disabled}
                          aria-label={shortcut ? `${label} (${shortcut})` : label}
                          title={shortcut ? `${label} (${shortcut})` : label}
                          className="inline-flex h-7 w-7 items-center justify-center rounded text-muted transition-colors duration-150 ease-out hover:text-accent hover:bg-bg disabled:opacity-30 disabled:hover:text-muted disabled:hover:bg-transparent disabled:cursor-not-allowed"
                        >
                          <Icon size={14} strokeWidth={1.5} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={form.content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleEditorKeyDown}
                    rows={20}
                    spellCheck={false}
                    aria-label="Post content (Markdown)"
                    className="w-full bg-surface px-3 py-3 text-sm font-mono leading-relaxed outline-none resize-y"
                  />
                </div>
              ) : (
                <div className="border border-border rounded-md px-4 py-4 min-h-[20rem]">
                  {previewError && <p className="text-sm text-red-400">{previewError}</p>}
                  {!previewError && previewSource && (
                    <div className="prose-blog max-w-[65ch]">
                      <MDXRemote {...previewSource} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={save}
              title={`Save (${modKey}+S)`}
              className="font-mono text-xs bg-accent text-bg px-4 py-2 rounded-md transition-opacity duration-150 ease-out hover:opacity-90"
            >
              save <span className="opacity-70">({modKey}+S)</span>
            </button>
            {selectedSlug && (
              <button
                type="button"
                onClick={remove}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-accent"
              >
                <Trash2 size={12} strokeWidth={1.5} /> delete
              </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
