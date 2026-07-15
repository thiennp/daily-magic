export default function breakEmailHostForDisplay(host: string): string {
  return host.replace(/\./g, "&#8203;.");
}
