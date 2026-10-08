/** Non-interactive hint row in the card menu (non-owners). */
export default function AwcProjectsMenuNote() {
  return (
    <li
      role="none"
      className="max-w-[16rem] px-3 py-2 text-[length:var(--awc-fs-row-sub)] text-awc-fg-muted"
    >
      Only the owner can rename or delete it.
    </li>
  );
}
