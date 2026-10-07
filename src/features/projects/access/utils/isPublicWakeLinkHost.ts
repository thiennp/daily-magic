/** IPv4 ranges the server refuses (assertSafeProjectWebhookUrl: private, loopback, link-local, CGNAT). */
const isPrivateIpv4 = (host: string): boolean => {
  const parts = host.split(".").map(Number);
  const [a, b] = parts;
  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127)
  );
};

const IPV4 = /^\d{1,3}(?:\.\d{1,3}){3}$/;

/**
 * Cheap client mirror of the server's blocked-host rules (DF-036 F10): no
 * localhost / .local / .internal / .lan names, no private or loopback IPs,
 * no single-label hosts. The server (with DNS) stays the gate.
 */
export const isPublicWakeLinkHost = (hostname: string): boolean => {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || /\.(?:localhost|local|internal|lan|home|intranet)$/.test(host)) return false;
  if (host.includes(":")) {
    if (host.startsWith("::ffff:")) return isPublicWakeLinkHost(host.slice("::ffff:".length));
    return !(host === "::1" || host === "::" || /^(?:fc|fd|fe80)/.test(host));
  }
  if (IPV4.test(host)) return !isPrivateIpv4(host);
  return host.includes(".");
};
