"use client";

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
}
