export type PricingTrustIconName = "clock" | "check" | "bot";

const PATHS: Record<PricingTrustIconName, string> = {
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  check: "m5 12.5 4.5 4.5L19 7.5",
  bot: "M4 11a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6ZM12 4v4M9 13v1.5M15 13v1.5M2 13v3M22 13v3",
};

export default function PricingTrustIcon({
  name,
}: {
  readonly name: PricingTrustIconName;
}) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="mt-0.5 shrink-0 text-awc-blue-600"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
