import { ASSISTANT_OWNER_LOGIN_NOTICE } from "@/features/agent-access/buildAssistantOwnerLoginPath";
import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";

/** Only allowlisted `?notice=` keys render; free text from the URL never does. */
export const resolveLoginNotice = (
  value: string | string[] | undefined,
): string | null =>
  value === ASSISTANT_OWNER_LOGIN_NOTICE
    ? DEVICE_VERIFY_COPY.loginRequired
    : null;
