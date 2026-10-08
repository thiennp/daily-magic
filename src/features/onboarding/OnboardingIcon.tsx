export type OnboardingIconName = "send" | "folder" | "lock" | "check";

const PATHS: Readonly<Record<OnboardingIconName, string>> = {
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  folder:
    "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3",
  check: "M5 12.5l4.5 4.5L19 7.5",
};

interface OnboardingIconProps {
  readonly name: OnboardingIconName;
  readonly size?: number;
}

export default function OnboardingIcon({
  name,
  size = 18,
}: OnboardingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
