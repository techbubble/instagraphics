import { notFound, redirect } from "next/navigation";
import { getTemplate } from "@/lib/templates";
import { currentUser } from "@/lib/auth";
import Builder from "@/components/Builder";

export default async function BuildPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) notFound();
  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/build/${templateId}`)}`);
  return <Builder template={template} />;
}
