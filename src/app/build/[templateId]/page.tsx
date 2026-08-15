import { redirect } from "next/navigation";

// Legacy path: /build/<id> moved to /publish/<id>.
export default async function LegacyBuildPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  redirect(`/publish/${templateId}`);
}
