import {
  MK_SKEL_BAR_CLASS,
  MK_SKEL_CARD_CLASS,
  MK_SKEL_GRID_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import { MARKETPLACE_LOADING_LABEL } from "@/features/marketplace/marketplaceCopy.constant";

interface MarketplaceSectionSkeletonProps {
  readonly label?: string;
}

export default function MarketplaceSectionSkeleton({
  label = MARKETPLACE_LOADING_LABEL,
}: MarketplaceSectionSkeletonProps) {
  return (
    <div aria-busy="true" aria-label={label}>
      <p className="sr-only" role="status">
        {label}
      </p>
      <ul className={MK_SKEL_GRID_CLASS} aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className={MK_SKEL_CARD_CLASS}>
            <i className={`${MK_SKEL_BAR_CLASS} h-[18px] w-2/5`} />
            <i className={`${MK_SKEL_BAR_CLASS} w-[90%]`} />
            <i className={`${MK_SKEL_BAR_CLASS} w-[65%]`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
