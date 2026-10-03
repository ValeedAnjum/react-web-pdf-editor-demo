"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { ToolbarApi, Tool } from "react-web-pdf-editor";

const ACCENT = "#6f62e8";

type ToolItem = {
  id: Tool;
  label: string;
  icon: ReactNode;
};

const TOOL_GROUPS: ToolItem[][] = [
  [
    {
      id: "select",
      label: "Select",
      icon: <CursorIcon />,
    },
  ],
  [
    { id: "draw", label: "Draw", icon: <PenIcon /> },
    { id: "highlight", label: "Highlight", icon: <HighlightIcon /> },
  ],
  [
    { id: "text", label: "Text", icon: <TypeIcon /> },
    { id: "image", label: "Image", icon: <ImageIcon /> },
    { id: "signature", label: "Signature", icon: <SignatureIcon /> },
  ],
];

export function CustomToolbar({ api }: { api: ToolbarApi }) {
  return (
    <div
      className="flex h-[52px] w-full shrink-0 items-center gap-2 overflow-x-auto border-b border-[#e6e8ee] bg-white px-3 text-[#1f2430]"
      role="toolbar"
      aria-label="PDF toolbar"
    >
      <div className="flex min-w-0 items-center">
        <DocumentName name={api.name} onNameChange={api.setName} />

        <div className="flex items-center">
          <IconButton
            label={
              api.canUndo && api.undoLabel ? `Undo ${api.undoLabel}` : "Undo"
            }
            title={
              api.canUndo && api.undoLabel
                ? `Undo ${api.undoLabel} (${api.shortcuts.undo})`
                : `Undo (${api.shortcuts.undo})`
            }
            shortcuts={api.shortcuts.undoKeys}
            disabled={!api.canUndo}
            onClick={api.undo}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            label={
              api.canRedo && api.redoLabel ? `Redo ${api.redoLabel}` : "Redo"
            }
            title={
              api.canRedo && api.redoLabel
                ? `Redo ${api.redoLabel} (${api.shortcuts.redo})`
                : `Redo (${api.shortcuts.redo})`
            }
            shortcuts={api.shortcuts.redoKeys}
            disabled={!api.canRedo}
            onClick={api.redo}
          >
            <RedoIcon />
          </IconButton>
        </div>

        {TOOL_GROUPS.map((group) => (
          <div key={group[0].id} className="flex items-center">
            <Divider />
            <div className="flex items-center">
              {group.map((tool) => (
                <IconButton
                  key={tool.id}
                  label={tool.label}
                  title={tool.label}
                  pressed={api.activeTool === tool.id}
                  disabled={api.disabled}
                  onClick={() =>
                    api.setTool(
                      tool.id !== "select" && api.activeTool === tool.id
                        ? "select"
                        : tool.id,
                    )
                  }
                >
                  {tool.icon}
                </IconButton>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ZoomControl api={api} />
        <PageControl api={api} />
        <SearchField api={api} />
        <button
          type="button"
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(180deg, #9086f6 0%, ${ACCENT} 100%)`,
          }}
          disabled={api.disabled || api.exporting}
          aria-label="Export PDF"
          aria-busy={api.exporting}
          title={api.exportError?.message ?? "Export PDF"}
          onClick={api.exportPdf}
        >
          <UploadIcon />
          {api.exporting ? "Exporting…" : "Export PDF"}
        </button>
      </div>
    </div>
  );
}

function DocumentName({
  name,
  onNameChange,
}: {
  name: string;
  onNameChange: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  useLayoutEffect(() => {
    if (!editing) {
      return;
    }
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);

  const commit = (raw: string) => {
    setEditing(false);
    const next = raw.replace(/[/\\?%*:|"<>]/g, "").replace(/\s+/g, " ").trim();
    if (!next || next === name) {
      setDraft(name);
      return;
    }
    onNameChange(next);
  };

  const suffix = name.match(/\s+pdf$/i);
  const title = suffix ? name.slice(0, -suffix[0].length) : name;

  return (
    <div className="flex min-w-0 items-center gap-2 pr-1">
      <span
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ background: ACCENT }}
        aria-hidden="true"
      >
        <FileIcon />
      </span>
      {editing ? (
        <input
          ref={inputRef}
          className="h-8 w-56 min-w-0 rounded-md border border-[#6f62e8] bg-white px-2 text-[15px] font-semibold text-[#111827] outline-none"
          value={draft}
          aria-label="Document name"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={(event) => {
            if (cancelRef.current) {
              cancelRef.current = false;
              setDraft(name);
              return;
            }
            commit(event.currentTarget.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.stopPropagation();
              commit(event.currentTarget.value);
            } else if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              cancelRef.current = true;
              setDraft(name);
              setEditing(false);
            }
          }}
        />
      ) : (
        <button
          type="button"
          className="inline-flex h-8 min-w-0 items-center gap-1.5 rounded-md px-1 text-left hover:bg-[#f4f5f7]"
          title={`${name} — Click to rename`}
          aria-label={`Document name ${name}. Click to rename`}
          onClick={() => {
            cancelRef.current = false;
            setDraft(name);
            setEditing(true);
          }}
        >
          <span className="max-w-[220px] truncate text-[15px] font-semibold text-[#16181d]">
            {title}
          </span>
          {suffix ? (
            <span className="text-[13px] font-medium text-[#8b919e]">PDF</span>
          ) : null}
          <ChevronDownIcon />
        </button>
      )}
    </div>
  );
}

function ZoomControl({ api }: { api: ToolbarApi }) {
  const percent = Math.round(api.scale * 100);
  const [draft, setDraft] = useState<string | null>(null);
  const min = Math.round(api.minScale * 100);
  const max = Math.round(api.maxScale * 100);

  const commit = (raw: string) => {
    const cleaned = raw.trim().replace(/%/g, "").replace(",", ".");
    const value = Number(cleaned);
    setDraft(null);
    if (!Number.isFinite(value)) {
      return;
    }
    api.setScale(Math.min(api.maxScale, Math.max(api.minScale, value / 100)));
  };

  return (
    <div className="inline-flex h-8 shrink-0 items-center rounded-lg border border-[#e5e7eb] bg-white">
      <IconButton
        label="Zoom out"
        title="Zoom out"
        compact
        disabled={api.disabled || api.scale <= api.minScale}
        onClick={api.zoomOut}
      >
        <MinusIcon />
      </IconButton>
      <span className="h-4 w-px bg-[#e5e7eb]" />
      <input
        className="h-7 w-12 border-none bg-transparent text-center text-[13px] font-semibold text-[#1f2430] outline-none disabled:opacity-50"
        value={draft ?? `${percent}%`}
        disabled={api.disabled}
        aria-label={`Zoom, ${min}% to ${max}%`}
        inputMode="decimal"
        onFocus={(event) => {
          setDraft(String(percent));
          event.currentTarget.select();
        }}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => commit(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            commit(event.currentTarget.value);
            event.currentTarget.blur();
          } else if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            setDraft(null);
            event.currentTarget.blur();
          }
        }}
      />
      <span className="h-4 w-px bg-[#e5e7eb]" />
      <IconButton
        label="Zoom in"
        title="Zoom in"
        compact
        disabled={api.disabled || api.scale >= api.maxScale}
        onClick={api.zoomIn}
      >
        <PlusIcon />
      </IconButton>
    </div>
  );
}

function PageControl({ api }: { api: ToolbarApi }) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? (api.numPages === 0 ? "" : String(api.page));

  const commit = (raw: string) => {
    setDraft(null);
    if (!/^\d+$/.test(raw.trim()) || api.numPages === 0) {
      return;
    }
    const next = Number(raw.trim());
    api.setPage(Math.min(api.numPages, Math.max(1, next)));
  };

  return (
    <div className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-2 text-[13px]">
      <span className="text-[#8b919e]">Page</span>
      <input
        className="h-6 w-8 rounded-md border border-[#e6e8ee] bg-[#f4f5f7] text-center text-[13px] font-semibold text-[#1f2430] outline-none focus:border-[#6f62e8] disabled:opacity-50"
        value={display}
        disabled={api.disabled || api.numPages === 0}
        aria-label={`Page number, 1 to ${api.numPages || 1}`}
        inputMode="numeric"
        onFocus={(event) => event.currentTarget.select()}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => commit(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            commit(event.currentTarget.value);
            event.currentTarget.blur();
          } else if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            setDraft(null);
            event.currentTarget.blur();
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            event.stopPropagation();
            api.setPage(Math.min(api.numPages, api.page + 1));
            setDraft(null);
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();
            api.setPage(Math.max(1, api.page - 1));
            setDraft(null);
          }
        }}
      />
      <span className="text-[#8b919e]">of {api.numPages || "—"}</span>
    </div>
  );
}

function SearchField({ api }: { api: ToolbarApi }) {
  const { search } = api;
  const countLabel =
    search.matchCount > 0
      ? `${search.currentIndex + 1} of ${search.matchCount}`
      : "0";

  return (
    <div className="inline-flex h-8 w-[230px] shrink-0 items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-2.5 focus-within:border-[#6f62e8]">
      <span className="text-[#9aa1ab]" aria-hidden="true">
        <SearchIcon />
      </span>
      <input
        className="rpe-find-input h-full min-w-0 flex-1 border-none bg-transparent p-0 text-[13px] text-[#1f2430] outline-none placeholder:text-[#9aa1ab] disabled:opacity-50"
        style={{ width: "100%", height: "100%", border: "none", padding: 0 }}
        type="text"
        placeholder="Find in document..."
        value={search.query}
        disabled={api.disabled}
        aria-label="Find in document"
        onChange={(event) => search.setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            if (event.shiftKey) {
              search.prev();
            } else {
              search.next();
            }
          } else if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            search.clear();
            event.currentTarget.blur();
          }
        }}
      />
      {search.query ? (
        <span className="shrink-0 text-[12px] text-[#8b919e]">{countLabel}</span>
      ) : null}
    </div>
  );
}

function IconButton({
  label,
  title,
  shortcuts,
  pressed,
  compact,
  disabled,
  onClick,
  children,
}: {
  label: string;
  title: string;
  shortcuts?: string;
  pressed?: boolean;
  compact?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        compact ? "size-7" : "size-8"
      } ${
        pressed
          ? "text-white"
          : "text-[#3f4553] hover:bg-[#f3f4f6] disabled:hover:bg-transparent"
      }`}
      style={pressed ? { background: ACCENT } : undefined}
      aria-label={label}
      aria-pressed={pressed}
      aria-keyshortcuts={shortcuts}
      title={title}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1.5 h-5 w-px shrink-0 bg-[#e5e7eb]" aria-hidden="true" />;
}

function Svg({ children, filled = false }: { children: ReactNode; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function FileIcon() {
  return (
    <Svg>
      <path d="M7 3.5h6.5L19 9v11.5H7z" stroke="white" />
      <path d="M13.5 3.5V9H19" stroke="white" />
    </Svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#9aa1ab" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <Svg>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h9.5a6.5 6.5 0 1 1 0 13H12" />
    </Svg>
  );
}

function RedoIcon() {
  return (
    <Svg>
      <path d="M15 14l5-5-5-5" />
      <path d="M20 9h-9.5a6.5 6.5 0 1 0 0 13H12" />
    </Svg>
  );
}

function CursorIcon() {
  return (
    <Svg filled>
      <path d="M5.2 3.4c-.7-.4-1.5.3-1.3 1.1l2.8 13.2c.2.8 1.2 1 1.7.3l2.7-3.6 4.3 4.1c.5.5 1.3.4 1.7-.2l1.3-1.6c.4-.5.3-1.3-.2-1.7l-4.2-3.8 4.1-1.4c.8-.3.9-1.4.1-1.8L5.2 3.4z" />
    </Svg>
  );
}

function PenIcon() {
  return (
    <Svg>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
    </Svg>
  );
}

function HighlightIcon() {
  return (
    <Svg>
      <path d="M4 20h8" />
      <path d="M14.5 4.5l5 5L10 19H5v-5z" />
    </Svg>
  );
}

function TypeIcon() {
  return (
    <span className="text-[15px] font-semibold leading-none" aria-hidden="true">
      T
    </span>
  );
}

function ImageIcon() {
  return (
    <Svg>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <path d="M7 16l3.2-3.2a1 1 0 0 1 1.4 0L16 17" />
    </Svg>
  );
}

function SignatureIcon() {
  return (
    <Svg>
      <path d="M4 16c2-4 3-6 4.5-6S10 13 11 13s1.5-2 3-2 2 1.5 3.2 1.5S20 10 20 10" />
      <path d="M4 20h16" />
    </Svg>
  );
}

function MinusIcon() {
  return (
    <Svg>
      <path d="M6 12h12" />
    </Svg>
  );
}

function PlusIcon() {
  return (
    <Svg>
      <path d="M12 6v12M6 12h12" />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </Svg>
  );
}

function UploadIcon() {
  return (
    <Svg>
      <path d="M12 16V6" stroke="white" />
      <path d="M8 9.5L12 5.5l4 4" stroke="white" />
      <path d="M6 19h12" stroke="white" />
    </Svg>
  );
}
