"use client";

import { useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";

export function useTeamDispatchSelection(): {
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly selectedCapabilityId: string;
  readonly setSelectedGroupId: (value: string) => void;
  readonly setSelectedTargetUserId: (value: string) => void;
  readonly setSelectedCapabilityId: (value: string) => void;
} {
  const demoPreview = useDemoPreview();
  const [selectedGroupId, setSelectedGroupId] = useState(
    demoPreview?.agentComposer.groupId ?? "",
  );
  const [selectedTargetUserId, setSelectedTargetUserId] = useState(
    demoPreview?.agentComposer.targetUserId ?? "",
  );
  const [selectedCapabilityId, setSelectedCapabilityId] = useState(
    demoPreview?.agentComposer.capabilityId ?? "",
  );

  return {
    selectedGroupId,
    selectedTargetUserId,
    selectedCapabilityId,
    setSelectedGroupId: (value: string) => {
      setSelectedGroupId(value);
      setSelectedTargetUserId("");
      setSelectedCapabilityId("");
    },
    setSelectedTargetUserId: (value: string) => {
      setSelectedTargetUserId(value);
      setSelectedCapabilityId("");
    },
    setSelectedCapabilityId,
  };
}
