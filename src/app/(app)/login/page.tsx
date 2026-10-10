import { redirect } from "next/navigation";

import { resolveLoginNotice } from "@/features/agent-access/public-api/types";
import { LoginPageView } from "@/features/auth/public-api/presentation";
import { auth } from "@/lib/auth/auth";
import { resolvePostAuthReturnFromSearchParams } from "@/lib/auth/resolvePostAuthReturnFromSearchParams";

interface LoginPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const params = await searchParams;

  if (session?.user) {
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

  return <LoginPageView notice={resolveLoginNotice(params.notice)} />;
}
