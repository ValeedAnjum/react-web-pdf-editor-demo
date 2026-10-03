"use client";

import { PdfEditor } from "react-web-pdf-editor";
import "react-web-pdf-editor/styles.css";

export function QuickStyle() {
  return (
    <PdfEditor
      file="/file/compressed.tracemonkey-pldi-09.pdf"
      name="Quick Start"
      style={{ height: "100vh" }}
    />
  );
}
