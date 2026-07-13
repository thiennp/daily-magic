import Link from "next/link";

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_PANEL_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type ShowcaseCardVariant = "default" | "featured" | "spotlight";

interface ShowcaseCardProps {
  readonly article: ShowcaseArticle;
  readonly variant?: ShowcaseCardVariant;
  readonly className?: string;
}

const SHOWCASE_CARD_BASE_CLASSES = [
  "group p-6",
  APP_SURFACE_PANEL_CLASS,
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md",
  "focus-within:ring-2 focus-within:ring-brand-300/60 focus-within:ring-offset-2",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");

const VARIANT_CLASSES: Record<ShowcaseCardVariant, string> = {
  default: "",
  featured: "bg-gradient-to-b from-brand-50/80 to-white dark:from-brand-950/20",
  spotlight:
    "bg-gradient-to-r from-brand-50/80 via-white to-white md:col-span-2 dark:from-brand-950/20",
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
        SHOWCASE_CARD_BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
          className="rounded-sm transition hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50 focus-visible:ring-offset-2 dark:hover:text-gray-200"
        >
          {article.title}
        </Link>
      </h3>
      <p
        className={mergeMarketingClasses(
          "mt-2 text-sm leading-relaxed",
          APP_SURFACE_BODY_TEXT_CLASS,
        )}
      >
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
