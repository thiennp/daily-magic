import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import type { ProjectConnectionProvider } from "@/features/projects/settings/connections/projectConnection.types";

export const PROJECT_CONNECTION_PROVIDERS: readonly ProjectConnectionProvider[] =
  ["slack", "linear", "gmail", "github", "notion", "google_drive"] as const;

export const PROJECT_CONNECTION_PROVIDER_LABEL: Record<
  ProjectConnectionProvider,
  string
> = {
  slack: C.providerSlack,
  linear: C.providerLinear,
  gmail: C.providerGmail,
  github: C.providerGithub,
  notion: C.providerNotion,
  google_drive: C.providerGoogleDrive,
};

/** One-line "what assistants can do" under a not-connected provider. */
export const PROJECT_CONNECTION_PROVIDER_DESCRIPTION: Record<
  ProjectConnectionProvider,
  string
> = {
  slack: C.descSlack,
  linear: C.descLinear,
  gmail: C.descGmail,
  github: C.descGithub,
  notion: C.descNotion,
  google_drive: C.descGoogleDrive,
};
