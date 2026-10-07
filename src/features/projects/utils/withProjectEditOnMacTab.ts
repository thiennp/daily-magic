import buildAgentWitchLocalProjectEditorHref, {
  type AgentWitchLocalProjectEditorTab,
} from "@/lib/projects/buildAgentWitchLocalProjectEditorHref";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

/** Same Edit on Mac state/label, but the link opens a specific AWL tab. */
const withProjectEditOnMacTab = (
  editCta: ProjectEditOnMacCta,
  projectId: string,
  tab: AgentWitchLocalProjectEditorTab,
): ProjectEditOnMacCta =>
  editCta.state !== "enabled" || editCta.href === null
    ? editCta
    : {
        ...editCta,
        href: buildAgentWitchLocalProjectEditorHref(projectId, tab),
      };

export default withProjectEditOnMacTab;
