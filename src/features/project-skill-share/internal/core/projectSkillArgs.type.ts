export interface PublishProjectSkillArgs {
  readonly projectId: string;
  readonly skillId?: string;
  readonly name?: string;
  readonly description?: string;
  /** Omit to promote the latest draft of an existing skill. */
  readonly body?: string;
  /** Save as a draft (publisher + owner only) instead of publishing. */
  readonly asDraft?: boolean;
}

export interface ProjectSkillRefArgs {
  readonly projectId: string;
  readonly skillId: string;
  readonly version?: number;
}

export interface ListProjectSkillsArgs {
  readonly projectId: string;
}
