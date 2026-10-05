import type {
  CreateHumanInviteBody,
  HumanInviteRole,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type BuildHumanInviteCreateBodyInput = {
  readonly role: HumanInviteRole;
  readonly email: string;
  readonly requireEmailMatch: boolean;
};

export type BuildHumanInviteCreateBodyResult =
  | { readonly ok: true; readonly body: CreateHumanInviteBody }
  | { readonly ok: false; readonly errorMessage: string };

/**
 * Client create payload: lock on → require non-empty email + requireEmailMatch true.
 * Lock off → requireEmailMatch false; email still optional.
 */
export const buildHumanInviteCreateBody = (
  input: BuildHumanInviteCreateBodyInput,
): BuildHumanInviteCreateBodyResult => {
  const trimmed = input.email.trim();
  if (input.requireEmailMatch && trimmed.length === 0) {
    return {
      ok: false,
      errorMessage: HUMAN_INVITE_UI_COPY.emailRequiredForLock,
    };
  }
  return {
    ok: true,
    body: {
      role: input.role,
      email: trimmed.length > 0 ? trimmed : null,
      requireEmailMatch: input.requireEmailMatch,
    },
  };
};

/** Prefer server message; fall back for EMAIL_REQUIRED_FOR_LOCK. */
export const mapCreateHumanInviteError = (
  code: string | undefined,
  errorMessage: string | undefined,
): string => {
  if (code === "EMAIL_REQUIRED_FOR_LOCK") {
    return errorMessage?.trim() || HUMAN_INVITE_UI_COPY.emailRequiredForLock;
  }
  return errorMessage?.trim() || HUMAN_INVITE_UI_COPY.createFailed;
};
