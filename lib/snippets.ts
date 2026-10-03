export const installSnippet = `npm install react-web-pdf-editor`;

export const quickStartSnippet = `"use client";

import { PdfEditor } from "react-web-pdf-editor";
import "react-web-pdf-editor/styles.css";

export function QuickStart() {
  return (
    <PdfEditor
      file="/file/compressed.tracemonkey-pldi-09.pdf"
      name="Quick Start"
      style={{ height: "100vh" }}
    />
  );
}`;

export const quickStartPageSnippet = `import type { Metadata } from "next";
import { QuickStart } from "@/components/quick-start";

export const metadata: Metadata = {
  title: "Quick start",
  description:
    "A client component that renders PdfEditor with a file URL and a document name.",
};

export default function QuickStartPage() {
  return <QuickStart />;
}`;

export const basicDemoSnippet = `"use client";

import dynamic from "next/dynamic";
import "react-web-pdf-editor/styles.css";

const PdfEditor = dynamic(
  () => import("react-web-pdf-editor").then((mod) => mod.PdfEditor),
  { ssr: false },
);

export function BasicPdfEditor() {
  return (
    <PdfEditor
      file="/file/compressed.tracemonkey-pldi-09.pdf"
      name="compressed.tracemonkey-pldi-09.pdf"
      style={{ height: "100vh" }}
    />
  );
}`;

export const customExampleSnippet = `"use client";

import dynamic from "next/dynamic";
import "react-web-pdf-editor/styles.css";
import { CustomToolbar } from "@/components/custom-toolbar";

const PdfEditor = dynamic(
  () => import("react-web-pdf-editor").then((mod) => mod.PdfEditor),
  { ssr: false },
);

export function CustomExample() {
  return (
    <PdfEditor
      file="/file/compressed.tracemonkey-pldi-09.pdf"
      name="Document name"
      style={{ height: "100vh" }}
      toolbar={(api) => <CustomToolbar api={api} />}
    />
  );
}`;

export const customToolbarSnippet = `"use client";

import type { ToolbarApi } from "react-web-pdf-editor";

export function CustomToolbar({ api }: { api: ToolbarApi }) {
  return (
    <header>
      <span>{api.name}</span>
      <button type="button" onClick={api.undo} disabled={!api.canUndo}>
        Undo
      </button>
      <button type="button" onClick={api.redo} disabled={!api.canRedo}>
        Redo
      </button>
      <button type="button" onClick={() => api.setTool("text")}>
        Text
      </button>
      <button
        type="button"
        onClick={api.exportPdf}
        disabled={api.disabled || api.exporting}
      >
        {api.exporting ? "Saving…" : "Export PDF"}
      </button>
    </header>
  );
}`;
