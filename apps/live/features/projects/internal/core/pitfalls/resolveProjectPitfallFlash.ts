import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";

export type ProjectPitfallFlashCode =
  | "saved"
  | "retired"
  | "restored"
  | "invalid"
  | "limit"
  | "missing"
  | "rejected"
  | "unavailable";

export type ProjectPitfallFlash = {
  readonly message: string | null;
  readonly error: string | null;
};

const MESSAGES: Readonly<Record<ProjectPitfallFlashCode, ProjectPitfallFlash>> =
  {
    saved: { message: "Pitfall saved.", error: null },
    retired: {
      message: "Pitfall retired. Turn on Show retired to see it again.",
      error: null,
    },
    restored: { message: "Pitfall is active again.", error: null },
    invalid: {
      message: null,
      error:
        "Add a title, why it happens, and a fix. Keep them short, then save again.",
    },
    limit: {
      message: null,
      error: `This project already has ${PROJECT_PITFALL_MAX_ACTIVE} active pitfalls, the most allowed. Retire one, then try again.`,
    },
    missing: {
      message: null,
      error: "That pitfall is gone. Reload the page and try again.",
    },
    rejected: {
      message: null,
      error:
        "AgentWitch Cloud did not accept this change. Check the fields and try again.",
    },
    unavailable: {
      message: null,
      error:
        "Could not reach AgentWitch Cloud. Check this computer on Status, then try again.",
    },
  };

const resolveProjectPitfallFlash = (
  code: string | null,
): ProjectPitfallFlash | null =>
  code !== null && Object.prototype.hasOwnProperty.call(MESSAGES, code)
    ? MESSAGES[code as ProjectPitfallFlashCode]
    : null;

export default resolveProjectPitfallFlash;
