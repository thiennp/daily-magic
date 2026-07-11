"use client";

import Badge from "@/components/ui/badge/Badge";

interface TargetPresenceBadgesProps {
  readonly isOnline: boolean;
  readonly isPaired: boolean;
}

export default function TargetPresenceBadges({
  isOnline,
  isPaired,
}: TargetPresenceBadgesProps) {
  return (
    <span className="inline-flex gap-1">
      {isOnline ? (
        <Badge color="success" size="sm">
          Online
        </Badge>
      ) : null}
      {isPaired ? (
        <Badge color="info" size="sm">
          Paired
        </Badge>
      ) : (
        <Badge color="light" size="sm">
          Not paired
        </Badge>
      )}
    </span>
  );
}
