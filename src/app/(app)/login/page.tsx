import { redirect } from "next/navigation";

import LoginPageView from "@/features/auth/LoginPageView";
import { auth } from "@/lib/auth/auth";
import { resolvePostAuthReturnFromSearchParams } from "@/lib/auth/resolvePostAuthReturnFromSearchParams";

interface LoginPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const session = await auth();

  if (session?.user) {
    const params = await searchParams;
    const callbackParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        callbackParams.set(key, value);
      } else if (Array.isArray(value) && value[0] !== undefined) {
        callbackParams.set(key, value[0]);
      }
    }

    redirect(resolvePostAuthReturnFromSearchParams(callbackParams));
  }

  return <LoginPageView />;
}
