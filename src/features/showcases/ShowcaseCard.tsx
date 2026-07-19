import Link from "next/link";

import { resolveShowcaseArticleCoverImage } from "@/features/showcases/resolveShowcaseArticleCoverImage";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import {
  MARKETING_SHOWCASE_CARD_BASE_CLASSES,
  MARKETING_TEXT_LINK_CLASSES,
} from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_MUTED_CLASSES,
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
  default: "",
  featured: "bg-gradient-to-b from-zinc-50 to-white",
  spotlight: "bg-gradient-to-b from-zinc-50 to-white md:col-span-2",
};

const COVER_ASPECT_CLASSES: Record<ShowcaseCardVariant, string> = {
  default: "aspect-[16/10]",
  featured: "aspect-[16/11] lg:min-h-[14rem]",
  spotlight: "aspect-[21/9]",
};

export default function ShowcaseCard({
  article,
  variant = "default",
  className,
}: ShowcaseCardProps) {
  const isFeatured = variant === "featured" || variant === "spotlight";
  const cover = resolveShowcaseArticleCoverImage(article);
  const href = `/showcases/${article.slug}`;

  return (
    <article
      className={mergeMarketingClasses(
        MARKETING_SHOWCASE_CARD_BASE_CLASSES,
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {cover ? (
        <Link
          href={href}
          className="-mx-6 -mt-6 mb-4 block overflow-hidden rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- public showcase product screens */}
          <img
            src={cover.src}
            alt={cover.alt}
            width={960}
            height={560}
            className={mergeMarketingClasses(
              "w-full object-cover object-top",
              COVER_ASPECT_CLASSES[variant],
            )}
          />
        </Link>
      ) : null}
      <p
        className={mergeMarketingClasses(
          "text-xs font-semibold uppercase tracking-wide",
          MARKETING_TEXT_MUTED_CLASSES,
        )}
      >
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
          href={href}
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
        href={href}
        className={mergeMarketingClasses(
          "mt-4 inline-block text-sm",
          MARKETING_TEXT_LINK_CLASSES,
        )}
      >
        Read story →
      </Link>
    </article>
  );
}
