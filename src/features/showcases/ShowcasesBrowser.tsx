"use client";

import { useState } from "react";

import {
  ALL_SHOWCASE_GROUPS,
  filterShowcaseGroups,
} from "@/features/showcases/filterShowcaseGroups";
import type { ShowcaseGroup } from "@/features/showcases/filterShowcaseGroups";
import ShowcasesEmptyState from "@/features/showcases/ShowcasesEmptyState";
import ShowcasesIndexSection from "@/features/showcases/ShowcasesIndexSection";
import ShowcasesToolbar from "@/features/showcases/ShowcasesToolbar";

interface ShowcasesBrowserProps {
  readonly groups: readonly ShowcaseGroup[];
}

export default function ShowcasesBrowser({ groups }: ShowcasesBrowserProps) {
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState<string>(ALL_SHOWCASE_GROUPS);
  const visible = filterShowcaseGroups(groups, query, groupId);
  const total = visible.reduce((sum, g) => sum + g.articles.length, 0);
  const clear = () => {
    setQuery("");
    setGroupId(ALL_SHOWCASE_GROUPS);
  };

  return (
    <>
      <ShowcasesToolbar
        groups={groups}
        query={query}
        groupId={groupId}
        onQueryChange={setQuery}
        onGroupChange={setGroupId}
      />
      <div aria-live="polite">
        {total === 0 ? (
          <ShowcasesEmptyState onClear={clear} />
        ) : (
          <>
            <p role="status" className="mt-6 text-sm text-awc-fg-muted">
              {total} {total === 1 ? "showcase" : "showcases"}
            </p>
            {visible.map((group) => (
              <ShowcasesIndexSection
                key={group.id}
                title={group.title}
                description={group.description}
                articles={group.articles}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
