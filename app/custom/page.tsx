import { CustomExample } from "@/components/custom-example";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Custom PDF editor",
  description:
    "Replace the default PDF toolbar in react-web-pdf-editor with your own tools, zoom, search, and export actions.",
  path: "/custom",
});

export default function CustomPage() {
  return <CustomExample />;
}
