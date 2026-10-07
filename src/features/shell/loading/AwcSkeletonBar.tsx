import {
  AWC_SKELETON_ACCENT_CLASS,
  AWC_SKELETON_FILL_CLASS,
} from "@/features/shell/loading/awcSkeleton.constant";

interface AwcSkeletonBarProps {
  /** Size / shape utilities (e.g. `h-4 w-40`, `size-8 rounded-full`). */
  readonly className?: string;
  /** Pine-tinted fill for primary chips / active affordances. */
  readonly accent?: boolean;
}

/** One sand skeleton block (decorative; pair with an `AwcSkeletonStatus`). */
export default function AwcSkeletonBar({
  className = "",
  accent = false,
}: AwcSkeletonBarProps) {
  const fill = accent ? AWC_SKELETON_ACCENT_CLASS : AWC_SKELETON_FILL_CLASS;
  return <span aria-hidden="true" className={`block ${fill} ${className}`} />;
}
