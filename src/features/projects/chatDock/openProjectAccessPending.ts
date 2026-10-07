/** Rail anchors: owner Join requests section, else the Members column. */
const ACCESS_PENDING_TARGET_IDS = ["members-join-requests", "project-members-column"] as const;

/**
 * P1-S4a: bring the live Access pending view (Members rail → Join requests)
 * into view. Called after the Chat full view closes, so the rail is visible.
 */
export const openProjectAccessPending = (doc: Document = document): void => {
  const target = ACCESS_PENDING_TARGET_IDS.map((id) => doc.getElementById(id)).find(
    (el): el is HTMLElement => el !== null,
  );
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
};
