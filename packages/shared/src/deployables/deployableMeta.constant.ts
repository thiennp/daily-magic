import type { DeployableId } from "./DeployableId.type";

export interface DeployableMeta {
  readonly id: DeployableId;
  readonly name: string;
  readonly slug: "console" | "live" | "bridge" | "install";
  readonly targetFolder: `apps/${string}`;
}

export const DEPLOYABLE_META: Readonly<Record<DeployableId, DeployableMeta>> = {
  AWC: {
    id: "AWC",
    name: "AgentWitch Cloud",
    slug: "console",
    targetFolder: "apps/console",
  },
  AWL: {
    id: "AWL",
    name: "AgentWitch Local",
    slug: "live",
    targetFolder: "apps/live",
  },
  AWB: {
    id: "AWB",
    name: "AgentWitch Bridge",
    slug: "bridge",
    targetFolder: "apps/bridge",
  },
  AWI: {
    id: "AWI",
    name: "AgentWitch Install",
    slug: "install",
    targetFolder: "apps/install",
  },
};
