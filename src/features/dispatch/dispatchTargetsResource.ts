import { createSharedPolledResource } from "@/lib/client/createSharedPolledResource";
import type { DispatchTargetGroup } from "@/features/dispatch/dispatchTarget.type";

const parseDispatchTargets = (
  data: unknown,
): readonly DispatchTargetGroup[] => {
  if (
    typeof data === "object" &&
    data !== null &&
    "groups" in data &&
    Array.isArray((data as { groups: unknown }).groups)
  ) {
    return (data as { groups: readonly DispatchTargetGroup[] }).groups;
  }

  return [];
};

const fetchDispatchTargets = async (): Promise<
  readonly DispatchTargetGroup[]
> => {
  const response = await fetch("/api/dispatch/targets");
  if (!response.ok) {
    return [];
  }

  const data: unknown = await response.json();
  return parseDispatchTargets(data);
};

export const dispatchTargetsResource = createSharedPolledResource<
  readonly DispatchTargetGroup[]
>({
  fetch: fetchDispatchTargets,
});
