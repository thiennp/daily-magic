import { describe, expect, it, vi } from "vitest";

import {
  isDisplayNameTakenError,
  runPendingApprove,
} from "@/features/projects/access/runPendingApprove";

const setup = (result: { ok: boolean; errorMessage?: string }) => {
  const onApprove = vi.fn(async () => result);
  const setError = vi.fn();
  return { onApprove, setError };
};

describe("runPendingApprove (DF-017: no silent name swap)", () => {
  it("name taken: keeps the owner's name, shows the inline error, no retry", async () => {
    const { onApprove, setError } = setup({
      ok: false,
      errorMessage: "That project nickname is already taken.",
    });
    const ok = await runPendingApprove({
      requestId: "r1",
      needsName: true,
      nameValue: "NRG Lead",
      onApprove,
      setError,
    });
    expect(ok).toBe(false);
    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onApprove).toHaveBeenCalledWith("r1", "NRG Lead");
    expect(setError).toHaveBeenLastCalledWith(
      "Another assistant here is already called “NRG Lead”. Pick a different name.",
    );
  });

  it("recognises raw, public and mapped taken errors", () => {
    expect(isDisplayNameTakenError("display_name_taken")).toBe(true);
    expect(isDisplayNameTakenError("DISPLAY_NAME_TAKEN")).toBe(true);
    expect(
      isDisplayNameTakenError("That project nickname is already taken."),
    ).toBe(true);
    expect(isDisplayNameTakenError("forbidden")).toBe(false);
    expect(isDisplayNameTakenError(undefined)).toBe(false);
  });

  it("other errors map to friendly copy; success clears the error", async () => {
    const failed = setup({ ok: false, errorMessage: "That name is reserved." });
    expect(
      await runPendingApprove({
        requestId: "r1",
        needsName: true,
        nameValue: "Owner",
        ...failed,
      }),
    ).toBe(false);
    expect(failed.setError).toHaveBeenLastCalledWith("That name is reserved.");

    const done = setup({ ok: true });
    expect(
      await runPendingApprove({
        requestId: "r1",
        needsName: false,
        nameValue: "",
        ...done,
      }),
    ).toBe(true);
    expect(done.onApprove).toHaveBeenCalledWith("r1", undefined);
    expect(done.setError).toHaveBeenLastCalledWith(null);
  });

  it("empty name for an assistant never calls the server", async () => {
    const { onApprove, setError } = setup({ ok: true });
    await runPendingApprove({
      requestId: "r1",
      needsName: true,
      nameValue: "  ",
      onApprove,
      setError,
    });
    expect(onApprove).not.toHaveBeenCalled();
    expect(setError).toHaveBeenCalledWith(
      "Enter a project nickname before Approve.",
    );
  });
});
