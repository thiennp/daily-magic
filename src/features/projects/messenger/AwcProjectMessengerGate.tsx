import AwcMessengerEmptyState from "@/features/projects/messenger/AwcMessengerEmptyState";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

type MessengerGate =
  | { readonly kind: "loading" }
  | { readonly kind: "blocked"; readonly message: string }
  | { readonly kind: "empty" }
  | { readonly kind: "ready"; readonly threads: AwcMessengerThreadList };

export const resolveMessengerGate = (input: {
  readonly isLoading: boolean;
  readonly unavailable: boolean;
  readonly forbidden: boolean;
  readonly message: string | null;
  readonly threads: AwcMessengerThreadList | null;
}): MessengerGate => {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (input.isLoading) return { kind: "loading" };
  if (input.unavailable || input.forbidden) {
    return { kind: "blocked", message: input.message ?? copy.unavailable };
  }
  if (input.threads === null) {
    return { kind: "blocked", message: copy.unavailable };
  }
  if (input.threads.bots.length === 0) return { kind: "empty" };
  return { kind: "ready", threads: input.threads };
};

export default function AwcProjectMessengerGateView({
  gate,
}: {
  readonly gate: Exclude<MessengerGate, { kind: "ready" }>;
}) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (gate.kind === "loading") {
    return <p className="text-xs text-awc-fg-subtle">{copy.loading}</p>;
  }
  if (gate.kind === "empty") {
    return <AwcMessengerEmptyState />;
  }
  return (
    <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
      {gate.message}
    </p>
  );
}
