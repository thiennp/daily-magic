"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { resolveShowcaseTryNextHref } from "@/features/showcases/resolveShowcaseTryNextHref";

interface ShowcaseTryNextLinkProps {
  readonly href: string;
  readonly label: string;
}

export default function ShowcaseTryNextLink({
  href,
  label,
}: ShowcaseTryNextLinkProps) {
  const { data: session, status } = useSession();
  const isSignedIn = status === "authenticated" && Boolean(session?.user);
  const resolvedHref = resolveShowcaseTryNextHref(href, isSignedIn);

  return (
    <Link
      href={resolvedHref}
      className="mt-2 inline-flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
    >
      {label}
    </Link>
  );
}
