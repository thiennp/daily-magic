interface EntitlementLimitNoteProps {
  readonly message: string;
}

/** Clear over-limit message; never hides Connect / Download / Marketplace. */
export default function EntitlementLimitNote({
  message,
}: EntitlementLimitNoteProps) {
  return (
    <p
      role="status"
      className="mt-2 text-sm text-amber-800 dark:text-amber-200"
    >
      {message}
    </p>
  );
}
