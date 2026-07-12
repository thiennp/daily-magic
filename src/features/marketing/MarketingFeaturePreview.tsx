import type { ReactElement } from "react";

import Badge from "@/components/ui/badge/Badge";
import type { MarketingFeaturePreviewKey } from "@/features/marketing/marketingFeatureItems.constant";

const DISPATCH_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-gray-700">Team presence</span>
      <Badge color="success" size="sm">
        2 online
      </Badge>
    </div>
    <div className="rounded-lg bg-white px-3 py-2 text-xs text-gray-600">
      Dispatch to your Mac · paired
    </div>
  </div>
);

const APPROVE_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-700">Group policy</span>
      <Badge color="warning" size="sm">
        Approval
      </Badge>
    </div>
    <p className="text-gray-600">Admin must approve cross-user dispatch.</p>
  </div>
);

const REPORT_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-700">Run #1042</span>
      <Badge color="success" size="sm">
        Completed
      </Badge>
    </div>
    <p className="truncate text-gray-600">Output saved · policy: open</p>
  </div>
);

const PREVIEW_MAP: Record<MarketingFeaturePreviewKey, () => ReactElement> = {
  dispatch: DISPATCH_PREVIEW,
  approve: APPROVE_PREVIEW,
  report: REPORT_PREVIEW,
};

interface MarketingFeaturePreviewProps {
  readonly preview: MarketingFeaturePreviewKey;
}

export default function MarketingFeaturePreview({
  preview,
}: MarketingFeaturePreviewProps) {
  return PREVIEW_MAP[preview]();
}
