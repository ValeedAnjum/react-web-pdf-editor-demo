import type { Metadata } from "next";
import { CustomExample } from "@/components/custom-example";

export const metadata: Metadata = {
  title: "Custom PDF editor",
};

export default function CustomPage() {
  return <CustomExample />;
}
