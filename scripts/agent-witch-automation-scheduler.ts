import { exitUnlessActiveMacOsConsoleUser } from "./guardMacOsConsoleUser";
import { tickAgentWitchScheduledAutomations } from "./tickAgentWitchScheduledAutomations";

exitUnlessActiveMacOsConsoleUser("agent-witch-automation-scheduler");

void tickAgentWitchScheduledAutomations();
