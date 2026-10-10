import type { SendHumanInviteEmailsInput } from "@/features/projects/access/humanInvites/hooks/public-api/types";
import type {
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInvitePersonPanelProps = {
  readonly projectName: string;
  /** A member's invite always needs the owner's approval, so only the owner picks it. */
  readonly viewerIsOwner?: boolean;
  readonly createdInvite?: CreateHumanInviteResponse | null;
  readonly busy?: boolean;
  readonly errorMessage?: string | null;
  readonly onCreate?: (body: CreateHumanInviteBody) => void;
  readonly onCopyLink?: (url: string) => void;
  readonly onCancel?: () => void;
  /** DF-025 Email tab → Send invite. Resolves true when every email was sent. */
  readonly onSendEmails?: (
    body: SendHumanInviteEmailsInput,
  ) => Promise<boolean>;
  readonly sendBusy?: boolean;
  readonly sendErrorMessage?: string | null;
};
