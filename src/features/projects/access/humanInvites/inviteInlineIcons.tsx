import type { ReactNode } from "react";

type IconProps = { readonly className?: string };

const base = (children: ReactNode, className?: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

/** Inline stroke icons from the Claude invite designs (render in tests too). */
export const InviteCheckIcon = ({ className }: IconProps) =>
  base(<path d="M5 12.5l4.5 4.5L19 7.5" />, className);

export const InviteCloseIcon = ({ className }: IconProps) =>
  base(<path d="M6 6l12 12M18 6L6 18" />, className);

export const InviteClockIcon = ({ className }: IconProps) =>
  base(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
    className,
  );

export const InviteUsersIcon = ({ className }: IconProps) =>
  base(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6" />
    </>,
    className,
  );

export const InviteEyeIcon = ({ className }: IconProps) =>
  base(
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>,
    className,
  );

export const InviteAlertIcon = ({ className }: IconProps) =>
  base(
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17.5h.01" />
    </>,
    className,
  );
