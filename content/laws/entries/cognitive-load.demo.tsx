"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";

// Two versions of the same tiny app, "Stickies". Both let you add, pin, edit and delete notes
// (the simple one edits on double-click, the busy one with an Edit button). The first piles on controls that have nothing to do with jotting a note down
// (extraneous load), though every control on it does work; the second keeps only what the task
// needs (intrinsic load).

type Note = {
  id: number;
  text: string;
  color: number;
  pinned: boolean;
  /** Only the busy version fills this in: the note's text with bold, italic and underline kept. */
  html?: string;
  tag?: string;
  archived?: boolean;
  reminder?: boolean;
};

const SEED: Note[] = [
  { id: 1, text: "Buy oat milk", color: 0, pinned: false, tag: "home" },
  { id: 2, text: "Call Sam about Friday", color: 1, pinned: false, tag: "work" },
  { id: 3, text: "Water the fern", color: 2, pinned: false, tag: "home" },
];

/** Notes plus add, remove, pin, edit and update. Each version keeps its own list. */
function useNotes() {
  const [notes, setNotes] = useState<Note[]>(SEED);
  const [text, setText] = useState("");
  const [nextId, setNextId] = useState(4);
  const [editing, setEditing] = useState<number | null>(null);

  const add = (e?: FormEvent, extra?: Partial<Note>) => {
    e?.preventDefault();
    const t = text.trim();
    if (!t) return;
    setNotes((n) => [...n, { id: nextId, text: t, color: nextId % 4, pinned: false, tag: "work", ...extra }]);
    setNextId(nextId + 1);
    setText("");
  };
  const update = (id: number, patch: Partial<Note>) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const remove = (id: number) => setNotes((n) => n.filter((x) => x.id !== id));
  const togglePin = (id: number) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x)));
  /** An empty edit keeps the old text rather than leaving a blank sticky. */
  const save = (id: number, value: string) => {
    const t = value.trim();
    if (t) update(id, { text: t });
    setEditing(null);
  };
  return { notes, text, setText, add, update, remove, togglePin, editing, setEditing, save };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Keeps only plain text plus bold, italic and underline, so whatever was typed or pasted is safe to show. */
function clean(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walk = (node: Node): string =>
    Array.from(node.childNodes)
      .map((c) => {
        if (c.nodeType === Node.TEXT_NODE) return esc(c.textContent ?? "");
        if (c.nodeType !== Node.ELEMENT_NODE) return "";
        const el = c as HTMLElement;
        const tag = el.tagName.toLowerCase();
        let out = walk(el);
        if (tag === "br") return " ";
        if (tag === "div" || tag === "p") return out + " ";
        const st = el.style;
        if (tag === "b" || tag === "strong" || st.fontWeight === "bold" || Number(st.fontWeight) >= 600) out = `<b>${out}</b>`;
        if (tag === "i" || tag === "em" || st.fontStyle === "italic") out = `<i>${out}</i>`;
        if (tag === "u" || st.textDecorationLine.includes("underline") || st.textDecoration.includes("underline")) out = `<u>${out}</u>`;
        return out;
      })
      .join("");
  return walk(doc.body).trim();
}

/** Pinned notes first; otherwise the order the list is already in. */
const pinnedFirst = (list: Note[]) => [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned));

/** The note's text, or a box to change it while editing. Enter or clicking away saves, Escape cancels. */
function NoteText({ note, editing, onSave, onCancel }: { note: Note; editing: boolean; onSave: (v: string) => void; onCancel: () => void }) {
  const cancelled = useRef(false);
  if (!editing) return <p>{note.text}</p>;
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      cancelled.current = true;
      onCancel();
    }
  };
  return (
    <textarea
      className="sn-edit"
      autoFocus
      defaultValue={note.text}
      aria-label="Edit note"
      onKeyDown={onKey}
      onBlur={(e) => (cancelled.current ? (cancelled.current = false) : onSave(e.currentTarget.value))}
      onFocus={(e) => e.currentTarget.select()}
    />
  );
}

/** A note's text with its formatting, or a box to change it while editing. Works on the selected part
 *  of the text. Enter or clicking away saves, Escape cancels. */
function RichNoteText({ note, editing, onSave, onCancel }: { note: Note; editing: boolean; onSave: (html: string, text: string) => void; onCancel: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const cancelled = useRef(false);
  const html = note.html ?? esc(note.text);

  useEffect(() => {
    const el = ref.current;
    if (!editing || !el) return;
    el.innerHTML = html;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    // Only when editing starts: the box then owns its own text until it is saved.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  if (!editing) return <p dangerouslySetInnerHTML={{ __html: html }} />;
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      cancelled.current = true;
      onCancel();
    }
  };
  return (
    <div
      ref={ref}
      className="sn-edit sn-rich"
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label="Edit note"
      onKeyDown={onKey}
      onBlur={(e) => (cancelled.current ? (cancelled.current = false) : onSave(clean(e.currentTarget.innerHTML), e.currentTarget.textContent ?? ""))}
    />
  );
}

/** Bold, italic or underline. It styles the text selected in the note box you are in, or what you type next
 *  from the cursor. With no box active it jumps to the new-note box. */
function FormatBtn({ cmd, label, children, fallback }: { cmd: "bold" | "italic" | "underline"; label: string; children: ReactNode; fallback: () => void }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(!!document.activeElement?.closest(".sn-rich") && document.queryCommandState(cmd));
    document.addEventListener("selectionchange", sync);
    return () => document.removeEventListener("selectionchange", sync);
  }, [cmd]);
  const run = () => {
    if (!document.activeElement?.closest(".sn-rich")) fallback();
    document.execCommand(cmd);
    setOn(document.queryCommandState(cmd));
  };
  return (
    <button
      type="button"
      className={`sn-chip${on ? " on" : ""}`}
      aria-pressed={on}
      aria-label={label}
      title="Select some text, or just start typing"
      onMouseDown={(e) => e.preventDefault() /* keep the text selected */}
      onClick={run}
    >
      {children}
    </button>
  );
}

/** A small button for the busy version. `on` marks a toggle that is switched on. */
function Btn({ children, on, onClick, disabled, title, label }: { children: ReactNode; on?: boolean; onClick?: () => void; disabled?: boolean; title?: string; label?: string }) {
  return (
    <button type="button" className={`sn-chip${on ? " on" : ""}`} aria-pressed={on === undefined ? undefined : on} aria-label={label} title={title} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

const TAGS = ["work", "home", "ideas", "urgent"];
const SORTS = ["Oldest", "Newest", "A–Z"] as const;

/** The counter-example: everything on screen at once, and the one thing you came to do is easy to lose.
 *  Every control works. Bold, italic and underline style the selected text (or what you type next).
 *  The colour buttons act on the selected note (click a note to select it), or on the next
 *  note you add if none is selected. The #tags filter the list, and the tag on a note cycles when clicked. */
export function Cluttered() {
  const { notes, text, setText, add, update, remove, togglePin, editing, setEditing } = useNotes();
  const [selected, setSelected] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<Note>>({});
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(0);
  const [list, setList] = useState(false);
  const [settings, setSettings] = useState(false);
  const [showDates, setShowDates] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [sync, setSync] = useState<"idle" | "busy" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const compose = useRef<HTMLDivElement>(null);
  const saveRich = (id: number, html: string, t: string) => {
    if (t.trim()) update(id, { text: t.trim(), html });
    setEditing(null);
  };
  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const el = compose.current;
    if (!el || !text.trim()) return;
    add(undefined, { ...draft, tag: tagFilter ?? "work", html: clean(el.innerHTML) });
    el.innerHTML = "";
  };

  const sel = notes.find((n) => n.id === selected && !!n.archived === showArchived) ?? null;
  const cur: Partial<Note> = sel ?? draft;
  /** Change the selected note, or the style the next new note will get. */
  const apply = (patch: Partial<Note>) => (sel ? update(sel.id, patch) : setDraft((d) => ({ ...d, ...patch })));

  const q = query.trim().toLowerCase();
  let visible = notes.filter((n) => !!n.archived === showArchived && (!tagFilter || n.tag === tagFilter) && (!q || n.text.toLowerCase().includes(q)));
  if (SORTS[sort] === "Newest") visible = [...visible].reverse();
  if (SORTS[sort] === "A–Z") visible = [...visible].sort((a, b) => a.text.localeCompare(b.text));
  visible = pinnedFirst(visible);

  const archivedCount = notes.filter((n) => n.archived).length;
  const liveCount = notes.length - archivedCount;

  const doSync = () => {
    setSync("busy");
    timer.current = setTimeout(() => setSync("done"), 900);
  };

  return (
    <div className="sn sn-busy">
      <div className="sn-banner">Free plan · Upgrade for unlimited stickies. 50% off ends tonight!</div>
      <div className="sn-top">
        <b>Stickies</b>
        <Btn on={searching} onClick={() => { setSearching(!searching); setQuery(""); }}>Search</Btn>
        <Btn onClick={() => setSort((sort + 1) % SORTS.length)} label={`Sort: ${SORTS[sort]}. Click to change.`}>Sort: {SORTS[sort]}</Btn>
        <Btn on={list} onClick={() => setList(!list)}>{list ? "List" : "Grid"}</Btn>
        <Btn onClick={doSync} disabled={sync === "busy"}>{sync === "busy" ? "Syncing…" : "Sync"}</Btn>
        <Btn on={settings} onClick={() => setSettings(!settings)}>Settings</Btn>
      </div>
      {searching && (
        <input className="sn-search" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes..." aria-label="Search notes" />
      )}
      {settings && (
        <div className="sn-panel">
          <label><input type="checkbox" checked={showDates} onChange={(e) => setShowDates(e.target.checked)} /> Show dates</label>
          <label><input type="checkbox" checked={showTags} onChange={(e) => setShowTags(e.target.checked)} /> Show tags</label>
        </div>
      )}
      <div className="sn-tools">
        <FormatBtn cmd="bold" label="Bold" fallback={() => compose.current?.focus()}><b>B</b></FormatBtn>
        <FormatBtn cmd="italic" label="Italic" fallback={() => compose.current?.focus()}><i>I</i></FormatBtn>
        <FormatBtn cmd="underline" label="Underline" fallback={() => compose.current?.focus()}><u>U</u></FormatBtn>
        {[0, 1, 2, 3].map((c) => (
          <button key={c} type="button" className={`sn-dot c${c}${cur.color === c ? " on" : ""}`} aria-label={`Colour ${c + 1}`} aria-pressed={cur.color === c} onClick={() => apply({ color: c })} />
        ))}
        <span className="sn-hint">for: {sel ? "selected note" : "next note"}</span>
      </div>
      <div className="sn-tags">
        {TAGS.map((t) => <Btn key={t} on={tagFilter === t} onClick={() => setTagFilter(tagFilter === t ? null : t)}>#{t}</Btn>)}
        <Btn disabled={!sel} title={sel ? undefined : "Click a note first"} on={!!sel?.archived} onClick={() => sel && update(sel.id, { archived: !sel.archived })}>
          {showArchived ? "Unarchive" : "Archive"}
        </Btn>
        <Btn disabled={!sel} title={sel ? undefined : "Click a note first"} on={!!sel?.reminder} onClick={() => sel && update(sel.id, { reminder: !sel.reminder })}>Remind me</Btn>
      </div>
      <form className="sn-add" onSubmit={submit}>
        <div
          ref={compose}
          className="sn-compose sn-rich"
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="New note"
          data-placeholder="Type here..."
          onInput={(e) => {
            const el = e.currentTarget;
            if (!el.textContent) el.innerHTML = "";
            setText(el.textContent ?? "");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit(e);
          }}
        />
        <button type="submit" className="sn-chip">Add</button>
      </form>
      <div
        className={`sn-notes${list ? " list" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
      >
        {visible.map((n) => (
          <div key={n.id} className={`sn-note c${n.color}${n.id === sel?.id ? " sel" : ""}`} onClick={(e) => {
            // Clicking the note again unselects it. Clicks on its buttons or its edit box only select.
            const inner = (e.target as HTMLElement).closest("button, .sn-edit");
            setSelected(n.id === sel?.id && !inner ? null : n.id);
          }}>
            <span className="sn-meta">
              {showDates && <span>Nov 17</span>}
              {showTags && n.tag && (
                <button type="button" className="sn-tagbtn" title="Click to change tag" onClick={() => update(n.id, { tag: TAGS[(TAGS.indexOf(n.tag!) + 1) % TAGS.length] })}>#{n.tag}</button>
              )}
              {n.pinned && <span>Pinned</span>}
              {n.reminder && <span>Reminder</span>}
              {!showDates && !(showTags && n.tag) && !n.pinned && !n.reminder && "\u00a0"}
            </span>
            <RichNoteText note={n} editing={editing === n.id} onSave={(h, t) => saveRich(n.id, h, t)} onCancel={() => setEditing(null)} />
            <span className="sn-acts">
              <button type="button" className="sn-chip" onClick={() => setEditing(n.id)}>Edit</button>
              <button type="button" className="sn-chip" aria-pressed={n.pinned} onClick={() => togglePin(n.id)}>{n.pinned ? "Unpin" : "Pin"}</button>
              <button type="button" className="sn-chip" onClick={() => remove(n.id)} aria-label={`Delete ${n.text}`}>Del</button>
            </span>
          </div>
        ))}
        {!visible.length && <p className="sn-empty">{q ? "No notes match." : tagFilter ? `No notes tagged #${tagFilter}.` : showArchived ? "Nothing archived." : "No notes yet."}</p>}
      </div>
      <div className="sn-foot">
        <span>{liveCount} of 50 free notes used</span>
        <Btn on={showArchived} onClick={() => { setShowArchived(!showArchived); setSelected(null); }}>Archived ({archivedCount})</Btn>
        <span>{sync === "done" ? "Synced just now" : sync === "busy" ? "Syncing…" : "Not synced"}</span>
      </div>
    </div>
  );
}

/** The ⋯ button on a note. Opens a small menu with Pin and Delete; closes on outside click or Escape. */
function NoteMenu({ pinned, onPin, onDelete }: { pinned: boolean; onPin: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div className="sn-menu" ref={ref}>
      <button type="button" className="sn-dots" aria-label="Note options" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>⋯</button>
      {open && (
        <div className="sn-pop" role="menu">
          <button type="button" role="menuitem" onClick={() => { onPin(); setOpen(false); }}>{pinned ? "Unpin" : "Pin"}</button>
          <button type="button" role="menuitem" onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

/** The applied version: a title, one place to type, and the notes themselves. */
export function Simple() {
  const { notes, text, setText, add, remove, togglePin, editing, setEditing, save } = useNotes();
  return (
    <div className="sn sn-calm">
      <h4>Stickies</h4>
      <form className="sn-add" onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a note..." aria-label="New note" />
        <button type="submit" className="sn-primary">Add</button>
      </form>
      <div className="sn-notes">
        {pinnedFirst(notes).map((n) => (
          <div key={n.id} className={`sn-note c${n.color}${n.pinned ? " pinned" : ""}`} onDoubleClick={() => setEditing(n.id)}>
            <NoteText note={n} editing={editing === n.id} onSave={(v) => save(n.id, v)} onCancel={() => setEditing(null)} />
            <NoteMenu pinned={n.pinned} onPin={() => togglePin(n.id)} onDelete={() => remove(n.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
