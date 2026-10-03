import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import {
  basicDemoSnippet,
  customExampleSnippet,
  customToolbarSnippet,
  installSnippet,
  quickStartPageSnippet,
  quickStartSnippet,
} from "@/lib/snippets";
import {
  createPageMetadata,
  examples,
  getSiteUrl,
  siteDescription,
  siteName,
} from "@/lib/site";

const pageTitle = "Edit PDFs in Next.js | React Web PDF Editor";
const pageDescription =
  "Open three live PDF editor examples in Next.js: a quick start, a browser-only PdfEditor, and a custom toolbar. Copy the code to build your own.";

export const metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/",
  absoluteTitle: true,
});

const features = [
  "Text boxes, freehand ink, highlights, images, and signatures",
  "Page thumbnails, blank pages, delete, and drag-to-reorder",
  "In-document search, zoom, undo, and redo",
  "Export that flattens edits into a downloadable PDF",
];

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "en",
        about: {
          "@type": "SoftwareApplication",
          name: "react-web-pdf-editor",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          description:
            "React component for viewing and editing PDFs in the browser, with annotations, page edits, and export.",
        },
        mainEntity: {
          "@type": "ItemList",
          name: "PDF editor examples",
          itemListElement: examples.map((example, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: example.title,
            url: `${siteUrl}${example.href}`,
            description: example.summary,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            {siteName}
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
            <a href="#examples" className="hover:text-[#6f62e8]">
              Examples
            </a>
            <a href="#create" className="hover:text-[#6f62e8]">
              Create
            </a>
            <a
              href="https://www.npmjs.com/package/react-web-pdf-editor"
              className="hover:text-[#6f62e8]"
              rel="noopener noreferrer"
            >
              npm
            </a>
          </nav>
        </div>
      </header>
      <main id="content" className="flex-1 bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 sm:py-24">
            <p className="text-sm font-medium tracking-wide text-[#6f62e8]">
              react-web-pdf-editor
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Edit PDFs in Next.js
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              This demo opens the same sample PDF three ways: a direct client
              import, a browser-only dynamic import, and a toolbar you render
              yourself. Each section below links to the live page and shows the
              code to create that example in your own app.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#examples"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#6f62e8] px-5 text-sm font-medium text-white hover:bg-[#5c50d4]"
              >
                Browse the examples
              </a>
              <a
                href="#create"
                className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                Copy the code
              </a>
            </div>
          </div>
        </section>

        <section id="examples" className="scroll-mt-20 py-16 sm:py-20" aria-labelledby="examples-heading">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6">
            <div className="max-w-2xl">
              <h2 id="examples-heading" className="text-2xl font-semibold tracking-tight">
                Examples
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                All three routes load{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  /file/compressed.tracemonkey-pldi-09.pdf
                </code>
                . Replace that URL with your own PDF when you copy the code.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {examples.map((example, index) => (
                <article
                  key={example.href}
                  className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="text-xs font-medium tracking-wide text-zinc-500">
                    Example {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    <Link href={example.href} className="hover:text-[#6f62e8]">
                      {example.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {example.summary}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {example.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="mt-4 font-mono text-xs text-zinc-500">{example.file}</p>
                  <Link
                    href={example.href}
                    className="mt-4 inline-flex text-sm font-medium text-[#6f62e8] hover:underline"
                  >
                    Open {example.title.toLowerCase()}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20" aria-labelledby="editor-heading">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div>
              <h2 id="editor-heading" className="text-2xl font-semibold tracking-tight">
                What the editor includes
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  PdfEditor
                </code>{" "}
                views and edits a PDF in the browser. Rendering uses PDF.js.
                Export uses pdf-lib and writes annotations into a new file.
                Annotations stay in memory until you export.
              </p>
            </div>
            <ul className="space-y-3 text-sm leading-6">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="create" className="scroll-mt-20 py-16 sm:py-20" aria-labelledby="create-heading">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6">
            <div className="max-w-2xl">
              <h2 id="create-heading" className="text-2xl font-semibold tracking-tight">
                How to create these examples
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Install the package, import the stylesheet once, and give the
                editor a height. The root fills its parent, so a parent with no
                height collapses the page canvas.{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  file
                </code>{" "}
                accepts a URL string, URL, File, Blob, ArrayBuffer, or
                Uint8Array.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">1. Install</h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Peer dependencies are React and React DOM 18 or later. This
                demo uses pnpm; the same package name works with npm.
              </p>
              <CodeBlock title="Terminal" code={installSnippet} language="bash" />
            </div>

            <article id="quick-start-code" className="scroll-mt-24 flex flex-col gap-4">
              <h3 className="text-lg font-semibold">2. Quick start</h3>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Put the editor in a client component and render it from a route.
                The live page is{" "}
                <Link href="/quick-start" className="font-medium text-[#6f62e8] hover:underline">
                  /quick-start
                </Link>
                . Import{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  react-web-pdf-editor/styles.css
                </code>{" "}
                or the toolbar and pages have no layout.
              </p>
              <CodeBlock title="components/quick-start.tsx" code={quickStartSnippet} />
              <CodeBlock title="app/quick-start/page.tsx" code={quickStartPageSnippet} />
            </article>

            <article id="basic-demo-code" className="scroll-mt-24 flex flex-col gap-4">
              <h3 className="text-lg font-semibold">3. Basic demo for Next.js</h3>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                The editor talks to workers, canvas, and{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  window
                </code>{" "}
                while it renders. Load it with{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  next/dynamic
                </code>{" "}
                and{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  ssr: false
                </code>
                . The live page is{" "}
                <Link href="/basic-demo" className="font-medium text-[#6f62e8] hover:underline">
                  /basic-demo
                </Link>
                .
              </p>
              <CodeBlock title="components/basic-pdf-editor.tsx" code={basicDemoSnippet} />
            </article>

            <article id="custom-toolbar-code" className="scroll-mt-24 flex flex-col gap-4">
              <h3 className="text-lg font-semibold">4. Custom toolbar</h3>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Pass{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  toolbar
                </code>{" "}
                to draw your own bar. The callback receives{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  ToolbarApi
                </code>
                : document name, history, the active tool, zoom, page
                navigation, search, and export. The live page is{" "}
                <Link href="/custom" className="font-medium text-[#6f62e8] hover:underline">
                  /custom
                </Link>
                , and the full bar lives in{" "}
                <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
                  components/custom-toolbar.tsx
                </code>
                . Start from this smaller toolbar, then add the tools you need.
              </p>
              <CodeBlock title="Starter toolbar" code={customToolbarSnippet} />
              <CodeBlock title="Pass toolbar to PdfEditor" code={customExampleSnippet} />
            </article>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Examples for {siteName}.</p>
          <a
            href="https://www.npmjs.com/package/react-web-pdf-editor"
            className="font-medium text-[#6f62e8] hover:underline"
            rel="noopener noreferrer"
          >
            react-web-pdf-editor on npm
          </a>
        </div>
      </footer>
    </>
  );
}
