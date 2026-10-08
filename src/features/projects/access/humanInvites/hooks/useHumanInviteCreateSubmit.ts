import type {
  CreateHumanInviteBody,
  HumanInviteRole,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import { buildHumanInviteCreateBody } from "@/features/projects/access/humanInvites/utils/buildHumanInviteCreateBody";

/** Copy-link submit: build the create body (email lock only on the Email tab). */
export const useHumanInviteCreateSubmit = (input: {
  readonly role: HumanInviteRole;
  readonly isEmailTab: boolean;
  readonly email: string;
  readonly requireEmailMatch: boolean;
  readonly setLocalError: (value: string | null) => void;
  readonly onCreate?: (body: CreateHumanInviteBody) => void;
}) => {
  const built = buildHumanInviteCreateBody({
    role: input.role,
    email: input.isEmailTab ? input.email : "",
    requireEmailMatch: input.isEmailTab ? input.requireEmailMatch : false,
  });
  return () => {
    if (!built.ok) {
      input.setLocalError(built.errorMessage);
      return;
    }
    input.setLocalError(null);
    input.onCreate?.(built.body);
  };
};
