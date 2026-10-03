import type { Metadata } from "next";

export const siteName = "React Web PDF Editor";

export const siteDescription =
  "Live Next.js examples for react-web-pdf-editor, with the code to open a PDF, load the editor in the browser, and render your own toolbar.";

/**
 * Set NEXT_PUBLIC_SITE_URL to the public origin (no trailing slash)
 * so canonical URLs, Open Graph, and the sitemap use the production host.
 */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const examples = [
  {
    href: "/quick-start",
    title: "Quick start",
    file: "components/quick-start.tsx",
    summary:
      "A client component that imports PdfEditor, loads the stylesheet, and opens a PDF with a document name and a full-viewport height.",
    points: [
      "Direct import of PdfEditor from react-web-pdf-editor",
      "Stylesheet import required for toolbar and page layout",
      "file, name, and style props",
    ],
  },
  {
    href: "/basic-demo",
    title: "Basic demo",
    file: "components/basic-pdf-editor.tsx",
    summary:
      "The Next.js pattern: next/dynamic loads PdfEditor with ssr disabled so canvas, window, and the PDF.js worker run in the browser.",
    points: [
      "dynamic(() => import(...), { ssr: false })",
      "Same file, name, and height props as the quick start",
      "Safe to render from an App Router page",
    ],
  },
  {
    href: "/custom",
    title: "Custom toolbar",
    file: "components/custom-example.tsx",
    summary:
      "The browser-only editor plus a toolbar render prop. The live bar renames the document, switches tools, and exports the PDF through ToolbarApi.",
    points: [
      "toolbar={(api) => <CustomToolbar api={api} />}",
      "Select, draw, highlight, text, image, and signature",
      "Undo, redo, zoom, pages, search, and export",
    ],
  },
] as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
