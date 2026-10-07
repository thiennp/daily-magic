import AwcSkeletonBar from "@/features/shell/loading/AwcSkeletonBar";
import AwcSkeletonStatus from "@/features/shell/loading/AwcSkeletonStatus";
import { AWC_SKELETON_CARD_CLASS } from "@/features/shell/loading/awcSkeleton.constant";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

/** DF-016: generic shell page body — page header + two content cards. */
export default function AwcPageSkeleton() {
  return (
    <div className={APP_PAGE_STACK_CLASS} aria-busy="true">
      <header className="space-y-2">
        <AwcSkeletonBar className="h-8 w-56" />
        <AwcSkeletonBar className="h-4 w-full max-w-md" />
      </header>
      {[0, 1].map((card) => (
        <div key={card} className={`${AWC_SKELETON_CARD_CLASS} space-y-3`}>
          <AwcSkeletonBar className="h-5 w-1/3" />
          <AwcSkeletonBar className="h-4 w-full" />
          <AwcSkeletonBar className="h-4 w-5/6" />
          <AwcSkeletonBar className="h-4 w-2/3" />
        </div>
      ))}
      <AwcSkeletonStatus />
    </div>
  );
}
