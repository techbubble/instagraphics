import AuthForm from "@/components/AuthForm";
import { signupAction } from "../actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <AuthForm mode="signup" action={signupAction} next={next || "/"} />;
}
