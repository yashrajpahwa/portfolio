"use client";

import { useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import {
  Bold,
  Italic,
  Link2,
  Code,
  Code2,
  Heading2,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Table,
} from "lucide-react";

// Editor chrome inherits the site's design tokens, so it adapts to the
// light/dark theme without a separate CodeMirror theme per mode.
const editorTheme = EditorView.theme({
  "&": { backgroundColor: "transparent", fontSize: "13px" },
  ".cm-scroller": {
    fontFamily: "var(--font-mono)",
    lineHeight: "1.7",
  },
  ".cm-content": { padding: "12px", caretColor: "var(--accent)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--accent)" },
  "&.cm-focused": { outline: "none" },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
    backgroundColor: "color-mix(in srgb, var(--accent) 25%, transparent)",
  },
  ".cm-panels": {
    backgroundColor: "var(--surface)",
    color: "var(--text)",
    borderTop: "1px solid var(--border)",
  },
  ".cm-panels input, .cm-panels button": {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--text)",
  },
  ".cm-searchMatch": {
    backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
  },
  ".cm-searchMatch-selected": {
    backgroundColor: "color-mix(in srgb, var(--accent) 55%, transparent)",
  },
  ".cm-placeholder": { color: "var(--muted)" },
});

const markdownHighlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.heading, fontWeight: "600" },
    { tag: t.strong, fontWeight: "600" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: [t.link, t.url], color: "var(--accent)" },
    { tag: t.monospace, color: "var(--accent)" },
    { tag: [t.quote, t.meta, t.processingInstruction, t.contentSeparator], color: "var(--muted)" },
    { tag: t.comment, color: "var(--muted)" },
    { tag: t.keyword, color: "var(--accent)" },
  ])
);

function wrapSelection(view, before, after = before, placeholder = "text") {
  const range = view.state.selection.main;
  const selected = view.state.sliceDoc(range.from, range.to) || placeholder;
  view.dispatch({
    changes: { from: range.from, to: range.to, insert: before + selected + after },
    selection: {
      anchor: range.from + before.length,
      head: range.from + before.length + selected.length,
    },
  });
  view.focus();
  return true;
}

function toggleLinePrefix(view, prefix) {
  const { state } = view;
  const range = state.selection.main;
  const fromLine = state.doc.lineAt(range.from).number;
  const toLine = state.doc.lineAt(range.to).number;
  const changes = [];
  for (let n = fromLine; n <= toLine; n++) {
    const line = state.doc.line(n);
    if (line.text.startsWith(prefix)) {
      changes.push({ from: line.from, to: line.from + prefix.length, insert: "" });
    } else {
      changes.push({ from: line.from, insert: prefix });
    }
  }
  view.dispatch({ changes });
  view.focus();
  return true;
}

function insertBlock(view, text) {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const insert = (line.length > 0 ? "\n\n" : "") + text;
  view.dispatch({
    changes: { from: line.to, insert },
    selection: { anchor: line.to + insert.length },
  });
  view.focus();
  return true;
}

const TABLE_SNIPPET = `| Column | Column |
| ------ | ------ |
| Cell   | Cell   |`;

async function uploadImages(view, files, handlers) {
  for (const file of files) {
    handlers.onStatus?.({ type: "info", message: `Uploading ${file.name}…` });
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/studio/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      const pos = view.state.selection.main.head;
      view.dispatch({
        changes: { from: pos, insert: `![${data.alt}](${data.url})\n` },
      });
      handlers.onStatus?.({ type: "ok", message: `Uploaded ${data.url}` });
    } catch (err) {
      handlers.onStatus?.({ type: "error", message: err.message });
    }
  }
  view.focus();
}

function imageFiles(fileList) {
  return Array.from(fileList ?? []).filter((file) => file.type.startsWith("image/"));
}

// Extensions are created once per mount and bind `handlers` then, so onSave
// and onStatus must be behaviorally stable for the lifetime of the editor
// (the parent passes a ref-backed wrapper and a state setter).
function createExtensions(handlers) {
  return [
    markdown({ base: markdownLanguage, codeLanguages: languages }),
    EditorView.lineWrapping,
    editorTheme,
    markdownHighlight,
    Prec.high(
      keymap.of([
        {
          key: "Mod-s",
          run: () => {
            handlers.onSave?.();
            return true;
          },
        },
        { key: "Mod-b", run: (v) => wrapSelection(v, "**", "**", "bold text") },
        { key: "Mod-i", run: (v) => wrapSelection(v, "*", "*", "italic text") },
        { key: "Mod-k", run: (v) => wrapSelection(v, "[", "](https://)", "link text") },
        { key: "Mod-e", run: (v) => wrapSelection(v, "`", "`", "code") },
        { key: "Mod-Shift-.", run: (v) => toggleLinePrefix(v, "> ") },
        { key: "Mod-Shift-8", run: (v) => toggleLinePrefix(v, "- ") },
        { key: "Mod-Shift-7", run: (v) => toggleLinePrefix(v, "1. ") },
      ])
    ),
    EditorView.domEventHandlers({
      paste(event, view) {
        const files = imageFiles(event.clipboardData?.files);
        if (files.length === 0) return false;
        event.preventDefault();
        uploadImages(view, files, handlers);
        return true;
      },
      drop(event, view) {
        const files = imageFiles(event.dataTransfer?.files);
        if (files.length === 0) return false;
        event.preventDefault();
        uploadImages(view, files, handlers);
        return true;
      },
    }),
  ];
}

const TOOLBAR = [
  { label: "Bold", shortcut: "Mod+B", icon: Bold, command: (v) => wrapSelection(v, "**", "**", "bold text") },
  { label: "Italic", shortcut: "Mod+I", icon: Italic, command: (v) => wrapSelection(v, "*", "*", "italic text") },
  { label: "Link", shortcut: "Mod+K", icon: Link2, command: (v) => wrapSelection(v, "[", "](https://)", "link text") },
  { divider: true },
  { label: "Inline code", shortcut: "Mod+E", icon: Code, command: (v) => wrapSelection(v, "`", "`", "code") },
  { label: "Code block", icon: Code2, command: (v) => wrapSelection(v, "```\n", "\n```", "code") },
  { divider: true },
  { label: "Heading", icon: Heading2, command: (v) => toggleLinePrefix(v, "## ") },
  { label: "Bullet list", shortcut: "Mod+Shift+8", icon: List, command: (v) => toggleLinePrefix(v, "- ") },
  { label: "Numbered list", shortcut: "Mod+Shift+7", icon: ListOrdered, command: (v) => toggleLinePrefix(v, "1. ") },
  { label: "Quote", shortcut: "Mod+Shift+.", icon: Quote, command: (v) => toggleLinePrefix(v, "> ") },
  { divider: true },
  { label: "Table", icon: Table, command: (v) => insertBlock(v, TABLE_SNIPPET) },
  { label: "Image (or paste / drag one in)", icon: ImageIcon, pickImage: true },
];

export default function MarkdownEditor({ value, onChange, onSave, onStatus, modKey = "Ctrl" }) {
  const cmRef = useRef(null);
  const fileInputRef = useRef(null);
  const [{ handlers, extensions }] = useState(() => {
    const boundHandlers = { onSave, onStatus };
    return { handlers: boundHandlers, extensions: createExtensions(boundHandlers) };
  });

  function runToolbarItem(item) {
    if (item.pickImage) {
      fileInputRef.current?.click();
      return;
    }
    const view = cmRef.current?.view;
    if (view) item.command(view);
  }

  function handleFilePick(e) {
    const view = cmRef.current?.view;
    const files = imageFiles(e.target.files);
    if (view && files.length > 0) uploadImages(view, files, handlers);
    e.target.value = "";
  }

  return (
    <div className="border border-border rounded-md overflow-hidden bg-surface focus-within:border-accent transition-colors duration-150 ease-out">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap items-center gap-0.5 border-b border-border px-1.5 py-1"
      >
        {TOOLBAR.map((item, index) => {
          if (item.divider) {
            return (
              <span key={`divider-${index}`} className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
            );
          }
          const title = item.shortcut
            ? `${item.label} (${item.shortcut.replace("Mod", modKey)})`
            : item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => runToolbarItem(item)}
              aria-label={title}
              title={title}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-muted transition-colors duration-150 ease-out hover:text-accent hover:bg-bg"
            >
              <item.icon size={14} strokeWidth={1.5} />
            </button>
          );
        })}
      </div>

      <CodeMirror
        ref={cmRef}
        value={value}
        onChange={onChange}
        extensions={extensions}
        placeholder="Write in Markdown…"
        minHeight="30rem"
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
        aria-label="Post content (Markdown)"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={handleFilePick}
      />
    </div>
  );
}
