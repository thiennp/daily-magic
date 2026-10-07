import AwcMessengerEmptyState from "@/features/projects/messenger/AwcMessengerEmptyState";
import AwcOneWindowFeedError from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedError";
import AwcOneWindowFeedLoading from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedLoading";
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
  onRetry,
}: {
  readonly gate: Exclude<MessengerGate, { kind: "ready" }>;
  readonly onRetry?: () => void;
}) {
  if (gate.kind === "loading") {
    return <AwcOneWindowFeedLoading />;
  }
  if (gate.kind === "empty") {
    return <AwcMessengerEmptyState />;
  }
  if (onRetry !== undefined) {
    return <AwcOneWindowFeedError onRetry={onRetry} />;
  }
  return (
    <p className="rounded-md border border-awc-border bg-awc-warn-soft px-3 py-2 text-xs text-awc-warn">
      {gate.message}
    </p>
  );
}
