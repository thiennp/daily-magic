import type { PendingCapabilityIcon } from "@/features/projects/access/approvalCard/pendingCapabilities";

const PATHS: Record<PendingCapabilityIcon, readonly string[]> = {
  eye: [
    "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z",
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  ],
  users: [
    "M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z",
    "M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5",
    "M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.6 3.5 5.2",
  ],
  send: ["M21 3 10 14", "M21 3l-7 18-4-7-7-4z"],
  inbox: ["M3 13h5l1.5 3h5L16 13h5", "M5 5h14l2 8v6H3v-6z"],
  spark: [
    "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  ],
  clock: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 7v5l3 2"],
};

/** 14px stroke icon for a capability chip (decorative). */
export default function AwcPendingCapabilityIcon({
  icon,
}: {
  readonly icon: PendingCapabilityIcon;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0 fill-none stroke-awc-fg-subtle"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[icon].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
