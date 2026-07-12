import Link from "next/link";

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import {
  MARKETING_SHOWCASE_CARD_BASE_CLASSES,
  MARKETING_TEXT_LINK_CLASSES,
} from "@/features/marketing/marketingInteractiveClasses.constant";
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
  featured: "bg-gradient-to-b from-zinc-50 to-white",
  spotlight: "bg-gradient-to-r from-zinc-50 via-white to-white md:col-span-2",
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
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {article.category} · {article.readMinutes} min read
      </p>
      <h3
        className={mergeMarketingClasses(
          "mt-2 font-semibold",
          MARKETING_TEXT_PRIMARY_CLASSES,
          isFeatured ? "text-xl sm:text-2xl" : "text-lg",
        )}
      >
        <Link
          href={`/showcases/${article.slug}`}
          className="rounded-sm transition hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2"
        >
          {article.title}
        </Link>
      </h3>
      <p
        className={mergeMarketingClasses(
          "mt-2 text-sm leading-relaxed",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        {article.subtitle}
      </p>
      <Link
        href={`/showcases/${article.slug}`}
        className={mergeMarketingClasses("mt-4 inline-block text-sm", MARKETING_TEXT_LINK_CLASSES)}
      >
        Read story →
      </Link>
    </article>
  );
}
