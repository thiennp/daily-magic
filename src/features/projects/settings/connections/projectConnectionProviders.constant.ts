import {
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import type { ProjectConnectionProvider } from "@/features/projects/settings/connections/projectConnection.types";

export const PROJECT_CONNECTION_PROVIDERS: readonly ProjectConnectionProvider[] =
  ["slack", "linear", "gmail", "github"] as const;

export const PROJECT_CONNECTION_PROVIDER_LABEL: Record<
  ProjectConnectionProvider,
  string
> = {
  slack: C.providerSlack,
  linear: C.providerLinear,
  gmail: C.providerGmail,
  github: C.providerGithub,
};
