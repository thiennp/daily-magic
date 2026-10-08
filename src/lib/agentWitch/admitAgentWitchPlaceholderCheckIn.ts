import { parseAgentWitchInstallDeviceLabel } from "@/lib/agentWitch/buildAgentWitchInstallDeviceLabel";
import {
  findAgentWitchPlaceholderByToken,
  revokeAgentWitchPlaceholder,
} from "@/lib/agentWitch/findAgentWitchPlaceholderByToken";
import { buildComputerLimitErrorMessage } from "@/lib/billing/buildComputerLimitErrorMessage";
import { countOtherActiveComputersForCheckIn } from "@/lib/billing/countOtherActiveComputersForCheckIn";
import { listActiveComputersForLimit } from "@/lib/billing/listActiveComputersForLimit";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { loadCostControlSnapshot } from "@/lib/billing/loadCostControlSnapshot";
import { resolveBillingEntitlements } from "@/lib/billing/resolveBillingEntitlements";

export type PlaceholderCheckInAdmission =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "computer_limit";
      readonly errorMessage: string;
    };

const sameComputerLabels = (deviceLabel: string | null): readonly string[] => {
  const trimmed = deviceLabel?.trim() ?? "";
  if (trimmed.length === 0) {
    return [];
  }
  const parsed = parseAgentWitchInstallDeviceLabel(trimmed);
  return parsed.macOsUsername === null ? [trimmed] : [trimmed, parsed.hostname];
};

/**
 * 6abb783e: placeholders do not count toward the computer limit (544db9dd),
 * so the limit is enforced again when one first checks in. Past the limit
 * the check-in is refused with the same message the Connect UI shows, and
 * the placeholder stays revoked. Computers already checked in are untouched.
 */
export const admitAgentWitchPlaceholderCheckIn = async (input: {
  readonly pairingToken: string;
  readonly deviceLabel: string | null;
}): Promise<PlaceholderCheckInAdmission> => {
  const placeholder = await findAgentWitchPlaceholderByToken(
    input.pairingToken,
  );
  if (placeholder === null) {
    return { ok: true };
  }
  const [row, cost, others] = await Promise.all([
    loadBillingPlanForUser(placeholder.userId),
    loadCostControlSnapshot(),
    countOtherActiveComputersForCheckIn({
      userId: placeholder.userId,
      deviceId: placeholder.id,
      sameComputerLabels: sameComputerLabels(input.deviceLabel),
    }),
  ]);
  const { maxComputers } = resolveBillingEntitlements({
    row,
    trialGate: cost.trialGate,
  });
  if (others < maxComputers) {
    return { ok: true };
  }
  await revokeAgentWitchPlaceholder(placeholder.id);
  return {
    ok: false,
    code: "computer_limit",
    errorMessage: buildComputerLimitErrorMessage({
      maxComputers,
      computers: await listActiveComputersForLimit(placeholder.userId),
    }),
  };
};
