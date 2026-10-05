import isMobileClient from "@/lib/mobile/isMobileClient";
import readMobileClientSignals from "@/lib/mobile/readMobileClientSignals";

/** Browser-side mobile check for non-React code. Server (no window) → false. */
export default function detectMobileClient(): boolean {
  const signals = readMobileClientSignals();

  return signals !== null && isMobileClient(signals);
}
