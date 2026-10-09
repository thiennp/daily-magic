"use client";

const ITEM_CLASS =
  "rounded-awc-control px-3 py-2 text-left text-[length:var(--awc-fs-body)] text-awc-fg hover:bg-awc-tile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-awc-blue-600 dark:text-gray-100 dark:hover:bg-white/10";
const DANGER_ITEM_CLASS =
  "rounded-awc-control px-3 py-2 text-left text-[length:var(--awc-fs-body)] text-awc-bad hover:bg-awc-bad-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-awc-blue-600 dark:text-red-400 dark:hover:bg-red-950/40";

/** One entry of the header More actions menu. */
export default function AwcProjectDetailHeaderMenuItem({
  label,
  danger = false,
  onSelect,
}: {
  readonly label: string;
  readonly danger?: boolean;
  readonly onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={danger ? DANGER_ITEM_CLASS : ITEM_CLASS}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}
