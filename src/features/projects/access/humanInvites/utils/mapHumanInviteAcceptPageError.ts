import type { HumanInviteAcceptViewState } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import { mapHumanAcceptEmailErrorView } from "@/features/projects/access/humanInvites/utils/mapHumanAcceptEmailError";

export const expiresInLabel = (expiresAt: string | null): string => {
  if (!expiresAt) return "expires soon";
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "expired";
  const days = Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  return days === 1 ? "expires in 1 day" : `expires in ${days} days`;
};

export const mapAcceptError = (
  status: number,
  code?: string,
): HumanInviteAcceptViewState => {
  const emailView = mapHumanAcceptEmailErrorView(code);
  if (emailView) return emailView;
  if (status === 401) return "signed_out";
  if (code === "expired") return "expired";
  if (code === "revoked") return "revoked";
  if (code === "already_redeemed") return "used";
  if (code === "already_member" || code === "already_owner") {
    return "already_member";
  }
  if (code === "invalid_token") return "invalid";
  return "invalid";
};
