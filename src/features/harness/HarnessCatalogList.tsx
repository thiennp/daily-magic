"use client";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

export interface HarnessCatalogItem {
  readonly ownerUserId: string;
  readonly ownerEmail: string;
  readonly ownerName: string | null;
  readonly visibility: string;
  readonly hostname: string;
  readonly reportedAt: string;
  readonly isOnline: boolean;
  readonly activeSetSlugs: readonly string[];
  readonly setNames: readonly string[];
}

interface HarnessCatalogListProps {
  readonly entries: readonly HarnessCatalogItem[];
  readonly isLoading: boolean;
  readonly onBorrow: (ownerUserId: string) => void;
}

export default function HarnessCatalogList({
  entries,
  isLoading,
  onBorrow,
}: HarnessCatalogListProps) {
  if (isLoading) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Loading shared setups…
      </p>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        No shared setups available yet. Teammates must set sharing to group or
        public and have a connected Mac online.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {entries.map((entry) => (
        <article
          key={entry.ownerUserId}
          className={APP_SURFACE_NESTED_CARD_CLASS}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {entry.ownerName ?? entry.ownerEmail}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {entry.hostname} · {entry.visibility}
                {entry.isOnline ? " · online" : " · saved copy"}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onBorrow(entry.ownerUserId)}
            >
              Borrow
            </Button>
          </div>
          {entry.setNames.length > 0 ? (
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Sets: {entry.setNames.join(", ")}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
