import { BasicDemo } from "./basic-demo";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Basic PDF editor",
  description:
    "Load PdfEditor in Next.js with next/dynamic and ssr disabled so the PDF editor runs in the browser.",
  path: "/basic-demo",
});

export default function BasicDemoPage() {
  return <BasicDemo />;
}
