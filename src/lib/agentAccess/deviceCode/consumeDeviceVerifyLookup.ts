import { createHash } from "node:crypto";

import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  DEVICE_VERIFY_LOOKUP_BUCKET,
  DEVICE_VERIFY_LOOKUP_PER_HOUR,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";

/**
 * One /device/verify code lookup by a signed-in person. False once they hit
 * the hourly cap, so codes cannot be guessed by reloading the page.
 */
export const consumeDeviceVerifyLookup = (userId: string): Promise<boolean> =>
  consumeAgentAccessBucket({
    subjectHash: createHash("sha256")
      .update(`device-verify-lookup:${userId}`)
      .digest("hex"),
    bucket: DEVICE_VERIFY_LOOKUP_BUCKET,
    limit: DEVICE_VERIFY_LOOKUP_PER_HOUR,
  });
