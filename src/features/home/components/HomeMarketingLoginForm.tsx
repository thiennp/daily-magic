"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import LoginForm from "@/features/auth/LoginForm";
import { resolvePostAuthReturnFromSearchParams } from "@/lib/auth/resolvePostAuthReturnFromSearchParams";

export default function HomeMarketingLoginForm() {
  const searchParams = useSearchParams();
  const defaultCallbackUrl = useMemo(
    () => resolvePostAuthReturnFromSearchParams(searchParams),
    [searchParams],
  );

  return (
    <LoginForm defaultCallbackUrl={defaultCallbackUrl} appearance="marketing" />
  );
}
