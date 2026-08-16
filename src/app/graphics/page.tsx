import { redirect } from "next/navigation";

// Legacy path: /graphics moved to /my.
export default function LegacyGraphicsPage() {
  redirect("/my");
}
