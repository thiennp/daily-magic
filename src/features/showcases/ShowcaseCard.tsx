import Link from "next/link";

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import { MARKETING_SHOWCASE_CARD_BASE_CLASSES, MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type ShowcaseCardVariant = "default" | "featured" | "spotlight";

interface ShowcaseCardProps {
  readonly article: ShowcaseArticle;
  readonly variant?: ShowcaseCardVariant;
  readonly className?: string;
}

const VARIANT_CLASSES: Record<ShowcaseCardVariant, string> = {
  default: "dark:bg-white/[0.03]",
  featured:
    "bg-gradient-to-b from-brand-500/[0.03] to-white dark:border-brand-900/40",
  spotlight:
    "bg-gradient-to-r from-brand-500/[0.04] via-white to-white md:col-span-2 dark:border-brand-900/40",
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
        MARKETING_SHOWCASE_CARD_BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
        {article.category} · {article.readMinutes} min read
      </p>
      <h3
        className={mergeMarketingClasses(
          "mt-2 font-semibold dark:text-white/90",
          MARKETING_TEXT_PRIMARY_CLASSES,
          isFeatured ? "text-xl sm:text-2xl" : "text-lg",
        )}
      >
        <Link
          href={`/showcases/${article.slug}`}
          className="rounded-sm transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 dark:hover:text-brand-400"
        >
          {article.title}
        </Link>
      </h3>
      <p
        className={mergeMarketingClasses(
          "mt-2 text-sm leading-relaxed dark:text-slate-400",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
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
