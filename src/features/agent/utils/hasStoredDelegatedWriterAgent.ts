import { DELEGATED_WRITER_AGENT_STORAGE_KEY } from "@/features/agent/constants/delegatedWriterAgentStorage.constant";

export const hasStoredDelegatedWriterAgent = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.localStorage.getItem(DELEGATED_WRITER_AGENT_STORAGE_KEY) !== null
  );
};
