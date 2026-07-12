"use client";

import Link from "next/link";

import { useAppPath } from "@/features/demo/DemoPreviewContext";

export default function MarketplaceHomePromo() {
  const appPath = useAppPath();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Marketplace
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Browse agents and workflows teammates published for your company.
        Preview a listing, then install its rules bundle on your Mac.
      </p>
      <Link
        href={appPath("/marketplace")}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        Open marketplace
      </Link>
    </section>
  );
}
