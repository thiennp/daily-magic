/**
 * Shown with `project_required` when a run reaches dispatch without a project.
 * Thien LOCK: every run belongs to a project, so the fix is always "pick a
 * project", never "run without one".
 */
export const PROJECT_REQUIRED_DISPATCH_HINT =
  "Choose a project for this run, or open AgentWitch on the computer that runs it so your Default project is set up, then try again.";
