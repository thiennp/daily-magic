import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import type { ShowcaseRelatedLink } from "@/features/showcases/types/ShowcaseArticle.type";

interface ShowcaseRelatedShowcasesProps {
  readonly relatedShowcases: readonly ShowcaseRelatedLink[];
}

export default function ShowcaseRelatedShowcases({
  relatedShowcases,
}: ShowcaseRelatedShowcasesProps) {
  if (relatedShowcases.length === 0) {
    return null;
  }

  return (
    <AppPanel
      as="aside"
      padding="compact"
      className="mt-10 bg-gray-50 dark:bg-white/[0.03]"
    >
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Related guides
      </p>
      <ul className="mt-3 space-y-2">
        {relatedShowcases.map((related) => (
          <li key={related.slug}>
            <Link
              href={`/showcases/${related.slug}`}
              className={MARKETING_TEXT_LINK_CLASSES}
            >
              {related.label}
            </Link>
          </li>
        ))}
      </ul>
    </AppPanel>
  );
}
