import Link from "next/link";

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

interface ShowcaseCardProps {
  readonly article: ShowcaseArticle;
  readonly variant?: "default" | "featured";
}

export default function ShowcaseCard({
  article,
  variant = "default",
}: ShowcaseCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`rounded-2xl border bg-white p-6 transition hover:border-brand-200 dark:bg-white/[0.03] ${
        isFeatured
          ? "border-brand-200 shadow-theme-sm dark:border-brand-900/40"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
        {article.category} · {article.readMinutes} min read
      </p>
      <h3
        className={`mt-2 font-semibold text-gray-900 dark:text-white/90 ${
          isFeatured ? "text-xl" : "text-lg"
        }`}
      >
        <Link
          href={`/showcases/${article.slug}`}
          className="hover:text-brand-600 dark:hover:text-brand-400"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {article.subtitle}
      </p>
      <Link
        href={`/showcases/${article.slug}`}
        className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        Read story →
      </Link>
    </article>
  );
}
