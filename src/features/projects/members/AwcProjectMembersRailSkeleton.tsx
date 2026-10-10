import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";
import { AwcSkeletonBar } from "@/features/shell/loading/public-api/presentation";
import { AwcSkeletonStatus } from "@/features/shell/loading/public-api/presentation";

/** Pulse stops under reduced motion (DF-016). */
const BAR = "motion-reduce:animate-none";

function SkeletonRow({ width }: { readonly width: string }) {
  return (
    <div className="flex items-center gap-2.5 py-2">
      <AwcSkeletonBar className={`size-[30px] shrink-0 rounded-full ${BAR}`} />
      <div className="grid min-w-0 flex-1 gap-1.5">
        <AwcSkeletonBar className={`h-2.5 ${width} ${BAR}`} />
        <AwcSkeletonBar className={`h-2 w-2/5 ${BAR}`} />
      </div>
    </div>
  );
}

/** DF-016 / design state 4: sand skeleton in the rail's real layout while access loads. */
export default function AwcProjectMembersRailSkeleton() {
  return (
    <div
      className="flex flex-col px-3.5"
      aria-busy="true"
      data-skeleton="members-rail"
    >
      <AwcSkeletonBar className={`mb-2.5 h-3 w-[70px] ${BAR}`} />
      <AwcSkeletonBar className={`h-[132px] rounded-xl ${BAR}`} />
      <AwcSkeletonBar className={`mb-1.5 mt-[18px] h-3 w-[90px] ${BAR}`} />
      <SkeletonRow width="w-[70%]" />
      <SkeletonRow width="w-3/5" />
      <SkeletonRow width="w-2/3" />
      <AwcSkeletonBar className={`mb-1.5 mt-4 h-3 w-[60px] ${BAR}`} />
      <SkeletonRow width="w-[64%]" />
      <SkeletonRow width="w-[54%]" />
      <AwcSkeletonBar className={`mt-3.5 h-8 w-[130px] rounded-lg ${BAR}`} />
      <AwcSkeletonStatus label={C.loading} />
    </div>
  );
}
