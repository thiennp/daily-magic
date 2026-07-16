"use client";

import SendTaskComposerStepTrailLink from "@/features/agent/SendTaskComposerStepTrailLink";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";

interface SendTaskComposerStepTrailProps {
  readonly items: readonly SendTaskComposerStepTrailViewItem[];
}

export default function SendTaskComposerStepTrail({
  items,
}: SendTaskComposerStepTrailProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-2">
      {items.map((item) => (
        <SendTaskComposerStepTrailLink
          key={item.id}
          caption={item.caption}
          value={item.value}
          onBack={item.onBack}
        />
      ))}
    </div>
  );
}
