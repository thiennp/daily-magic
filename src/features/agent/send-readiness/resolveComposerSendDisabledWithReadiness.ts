import type { SendReadinessBannerModel } from "@/features/agent/send-readiness/sendReadinessBanner.types";

/** AW-READY-2 / OPEN-003 — readiness `blocksSend` must gate the Send button. */
export const resolveComposerSendDisabledWithReadiness = (input: {
  readonly isSendDisabled: boolean;
  readonly readinessBanner: SendReadinessBannerModel | null;
}): boolean =>
  input.isSendDisabled || input.readinessBanner?.blocksSend === true;
