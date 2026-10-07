import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

/** Members rail title; "Members · {n}" once the roster is loaded (DF-036 EN PASS S6). */
export default function AwcProjectMembersRailHeading({ count }: { readonly count: number | null }) {
  return (
    <h2 className="mb-3 px-3.5 text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400" data-members-heading>
      {count === null ? C.columnLabel : C.columnLabelCount(count)}
    </h2>
  );
}
