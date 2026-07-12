import Link from "next/link";

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";

export type ShowcaseCardVariant = "default" | "featured" | "spotlight";

interface ShowcaseCardProps {
  readonly article: ShowcaseArticle;
  readonly variant?: ShowcaseCardVariant;
  readonly className?: string;
}

const VARIANT_CLASSES: Record<ShowcaseCardVariant, string> = {
  default:
    "border-gray-200 hover:border-brand-200 dark:border-gray-800",
  featured:
    "border-brand-200 bg-gradient-to-b from-brand-50/40 to-white shadow-theme-sm dark:border-brand-900/40",
  spotlight:
    "border-brand-200 bg-gradient-to-r from-brand-50/60 via-white to-white shadow-theme-md md:col-span-2 dark:border-brand-900/40",
};

export default function ShowcaseCard({
  article,
  variant = "default",
  className,
}: ShowcaseCardProps) {
  const isFeatured = variant === "featured" || variant === "spotlight";

  return (
    <article
      className={mergeMarketingClasses(
        "group rounded-2xl border bg-white p-6 transition duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-theme-md focus-within:ring-2 focus-within:ring-brand-500/30 focus-within:ring-offset-2",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-white/[0.03]",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
        {article.category} · {article.readMinutes} min read
      </p>
      <h3
        className={mergeMarketingClasses(
          "mt-2 font-semibold text-gray-900 dark:text-white/90",
          isFeatured ? "text-xl sm:text-2xl" : "text-lg",
        )}
      >
        <Link
          href={`/showcases/${article.slug}`}
          className="rounded-sm transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:hover:text-brand-400"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {article.subtitle}
      </p>
      <Link
        href={`/showcases/${article.slug}`}
        className={mergeMarketingClasses(
          "mt-4 inline-block text-sm",
          MARKETING_TEXT_LINK_CLASSES,
          "dark:text-brand-400",
        )}
      >
        Read story →
      </Link>
    </article>
  );
}
