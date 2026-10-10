"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { LoginForm } from "@/features/auth/public-api/presentation";
import { resolvePostAuthReturnFromSearchParams } from "@/lib/auth/resolvePostAuthReturnFromSearchParams";

interface HomeMarketingLoginFormProps {
  readonly termsGate?: {
    readonly agreed: boolean;
    readonly onMissing: () => void;
  };
}

export default function HomeMarketingLoginForm({
  termsGate,
}: HomeMarketingLoginFormProps) {
  const searchParams = useSearchParams();
  const defaultCallbackUrl = useMemo(
    () => resolvePostAuthReturnFromSearchParams(searchParams),
    [searchParams],
  );

  return (
    <LoginForm
      defaultCallbackUrl={defaultCallbackUrl}
      appearance="marketing"
      termsGate={termsGate}
    />
  );
}
