import isMobileUserAgent from "@/lib/mobile/isMobileUserAgent";
import parseSecChUaMobile from "@/lib/mobile/parseSecChUaMobile";

interface HeaderReader {
  get(name: string): string | null;
}

/**
 * Server orchestrator: mobile when `Sec-CH-UA-Mobile: ?1` OR the User-Agent is
 * a phone/tablet. `?0` does not override a mobile UA (Chrome on Android tablets
 * sends `?0`). Missing headers → desktop (never blocks desktop by accident).
 */
export default function isMobileRequest(headers: HeaderReader): boolean {
  if (parseSecChUaMobile(headers.get("sec-ch-ua-mobile")) === true) {
    return true;
  }

  return isMobileUserAgent(headers.get("user-agent"));
}
