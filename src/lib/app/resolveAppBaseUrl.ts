import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const LOCAL_APP_BASE_URL = "http://localhost:3000";

export const resolveAppBaseUrl = (): string =>
  process.env.NODE_ENV === "production"
    ? AGENT_WITCH_DEFAULT_ORIGIN
    : LOCAL_APP_BASE_URL;
