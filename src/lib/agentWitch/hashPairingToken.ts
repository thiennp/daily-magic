import { createHash } from "node:crypto";

export default function hashPairingToken(pairingToken: string): string {
  return createHash("sha256").update(pairingToken.trim()).digest("hex");
}
