"use client";

import {
  PROJECT_LIBRARY_KIND_LABEL,
  PROJECT_LIBRARY_STATE_LABEL,
} from "@/features/projects/library/projectLibraryLabels.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { ProjectLibraryItem } from "@/features/projects/library/utils/buildProjectLibraryItems";
import {
  PANEL_HEADING_CLASS,
  PANEL_LIST_CLASS,
  PANEL_ROW_META_CLASS,
} from "@/features/projects/public-api/types";

const LABEL_CLASS =
  "text-[12px] font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-400";

/** Name heading · Kind · State · Updated + Content (description / example). */
export default function AwcProjectLibraryDetailFields({
  item,
}: {
  readonly item: ProjectLibraryItem;
}) {
  return (
    <article className="flex min-w-0 flex-col gap-3 px-1">
      <h4 className={PANEL_HEADING_CLASS}>
        {item.name.trim() || C["library.detail.heading"]}
      </h4>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt className={LABEL_CLASS}>{C["library.detail.kind"]}</dt>
        <dd className={PANEL_ROW_META_CLASS}>
          {PROJECT_LIBRARY_KIND_LABEL[item.kind]}
        </dd>
        <dt className={LABEL_CLASS}>{C["library.detail.state"]}</dt>
        <dd className={PANEL_ROW_META_CLASS}>
          {PROJECT_LIBRARY_STATE_LABEL[item.state]}
        </dd>
        <dt className={LABEL_CLASS}>{C["library.detail.updated"]}</dt>
        <dd className={PANEL_ROW_META_CLASS}>
          <time dateTime={item.updatedAt}>
            {new Date(item.updatedAt).toLocaleString()}
          </time>
        </dd>
      </dl>
      {item.body.trim().length > 0 ? (
        <section className="flex flex-col gap-1">
          <h5 className={LABEL_CLASS}>
            {item.skillId === null
              ? C["library.detail.body"]
              : C["library.detail.description"]}
          </h5>
          <p
            className={`${PANEL_LIST_CLASS} whitespace-pre-wrap p-3 text-[13px] text-awc-fg dark:text-gray-200`}
          >
            {item.body}
          </p>
        </section>
      ) : null}
    </article>
  );
}
