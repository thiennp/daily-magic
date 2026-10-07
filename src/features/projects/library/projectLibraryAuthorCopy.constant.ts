import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";

export type ProjectLibraryAuthorKind = "skill" | "playbook";

/** New → Skill / Add playbook author form copy (project skills, by kind). */
export const PROJECT_LIBRARY_AUTHOR_COPY = {
  skill: {
    heading: A["library.skills.heading"],
    count: A["library.skills.count"],
    empty: A["library.skills.empty"],
    nameSr: A["library.skills.name.sr"],
    namePlaceholder: A["library.skills.name.placeholder"],
    bodySr: A["library.skills.body.sr"],
    bodyPlaceholder: A["library.skills.body.placeholder"],
  },
  playbook: {
    heading: "Project playbooks",
    count: "{n} playbooks",
    empty:
      "No playbooks yet. Members and viewers see published items; drafts are visible only to you.",
    nameSr: "Playbook title",
    namePlaceholder: "Title",
    bodySr: "Playbook content",
    bodyPlaceholder: "Playbook (Markdown): how this project works",
  },
} as const;

export const PROJECT_LIBRARY_ADD_PLAYBOOK_LABEL = "Add playbook";
