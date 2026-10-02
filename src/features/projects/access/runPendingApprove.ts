import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

export const runPendingApprove = async (input: {
  readonly requestId: string;
  readonly needsName: boolean;
  readonly nameValue: string;
  readonly available: readonly string[];
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  readonly setError: (message: string | null) => void;
  readonly setName: (name: string) => void;
}): Promise<void> => {
  const copy = AWC_PROJECT_ACCESS_COPY;
  if (input.needsName && !input.nameValue.trim()) {
    input.setError(copy.displayNameRequired);
    return;
  }
  const result = await input.onApprove(
    input.requestId,
    input.needsName ? input.nameValue : undefined,
  );
  if (!result.ok) {
    const msg =
      result.errorMessage === "display_name_taken"
        ? copy.displayNameTaken
        : (result.errorMessage ?? "Failed.");
    input.setError(msg);
    if (input.available.length > 0) {
      const next =
        input.available[Math.floor(Math.random() * input.available.length)];
      if (next) {
        input.setName(next);
      }
    }
    return;
  }
  input.setError(null);
};
