import type { ReactElement } from "react";

import Badge from "@/components/ui/badge/Badge";
import type { MarketingFeaturePreviewKey } from "@/features/marketing/marketingFeatureItems.constant";

const DISPATCH_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-gray-700">Who is online</span>
      <Badge color="success" size="sm">
        2 teammates
      </Badge>
    </div>
    <div className="rounded-lg bg-white px-3 py-2 text-xs text-gray-600">
      Send to your Mac · ready
    </div>
  </div>
);

const APPROVE_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-700">Team rule</span>
      <Badge color="warning" size="sm">
        Ask first
      </Badge>
    </div>
    <p className="text-gray-600">
      A manager approves before using someone else&apos;s Mac.
    </p>
  </div>
);

const REPORT_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-700">Job #1042</span>
      <Badge color="success" size="sm">
        Finished
      </Badge>
    </div>
    <p className="truncate text-gray-600">Saved with the full answer</p>
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
