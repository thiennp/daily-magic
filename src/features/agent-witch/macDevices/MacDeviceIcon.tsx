interface MacDeviceIconProps {
  readonly className?: string;
}

export default function MacDeviceIcon({ className }: MacDeviceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden="true"
    >
      <path
        d="M4 6.5C4 5.11929 5.11929 4 6.5 4H17.5C18.8807 4 20 5.11929 20 6.5V13.5C20 14.8807 18.8807 16 17.5 16H6.5C5.11929 16 4 14.8807 4 13.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 19H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16V19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
