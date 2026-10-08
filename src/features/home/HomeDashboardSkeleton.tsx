import {
  HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS,
  HOME_RIGHT_RAIL_WITHOUT_LEFT_RAIL_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
import AwcSkeletonBar from "@/features/shell/loading/AwcSkeletonBar";
import AwcSkeletonStatus from "@/features/shell/loading/AwcSkeletonStatus";
import { AWC_SKELETON_CARD_CLASS } from "@/features/shell/loading/awcSkeleton.constant";

/** Design skeleton card: three bars of decreasing width. */
const SkeletonCard = () => (
  <div className={`${AWC_SKELETON_CARD_CLASS} space-y-3`}>
    <AwcSkeletonBar className="h-5 w-1/3" />
    <AwcSkeletonBar className="h-4 w-full" />
    <AwcSkeletonBar className="h-4 w-4/5" />
  </div>
);

/**
 * DF-016 route skeleton for signed-in Home — mirrors HomeDashboardBoard
 * (head · lead · 1.6fr/1fr grid without the optional onboarding rail).
 */
export default function HomeDashboardSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" data-skeleton="home">
      <div className="space-y-2">
        <AwcSkeletonBar className="h-8 w-72 max-w-full" />
        <AwcSkeletonBar className="h-4 w-full max-w-md" />
      </div>
      <div
        className={`${AWC_SKELETON_CARD_CLASS} flex flex-wrap items-center gap-3`}
      >
        <AwcSkeletonBar className="h-5 w-1/3 min-w-40" />
        <AwcSkeletonBar accent className="ml-auto h-9 w-32 rounded-lg" />
      </div>
      <div className={HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS}>
        <div className={HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className={HOME_RIGHT_RAIL_WITHOUT_LEFT_RAIL_CLASS}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
      <AwcSkeletonStatus />
    </div>
  );
}
