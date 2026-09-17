/** Cloud-backed project row for AWL UI (Neon `user_projects` via device API). */
export default interface AgentWitchProjectView {
  readonly id: string;
  readonly name: string;
  readonly projectFolderPath: string;
}
