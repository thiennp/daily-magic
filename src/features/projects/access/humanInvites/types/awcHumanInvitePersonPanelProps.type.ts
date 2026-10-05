import type {
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInvitePersonPanelProps = {
  readonly projectName: string;
  readonly createdInvite?: CreateHumanInviteResponse | null;
  readonly busy?: boolean;
  readonly errorMessage?: string | null;
  readonly onCreate?: (body: CreateHumanInviteBody) => void;
  readonly onCopyLink?: (url: string) => void;
  readonly onCancel?: () => void;
  readonly onDismissCreated?: () => void;
};
