"use client";

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
      name="Waleed Anjum Testing PDF"
      style={{ height: "100vh" }}
      toolbar={(api) => <CustomToolbar api={api} />}
    />
  );
}
