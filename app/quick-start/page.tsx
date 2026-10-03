import { QuickStyle } from "@/components/quick-start";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Quick start",
  description:
    "Render PdfEditor in a Next.js client component with a PDF URL, a document name, and a full-viewport height.",
  path: "/quick-start",
});

export default function QuickStartPage() {
  return <QuickStyle />;
}
