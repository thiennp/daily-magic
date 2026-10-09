"use client";

import { useAddOwnedBot } from "@/features/projects/members/useAddOwnedBot";
import { BOT_CLAIM_COPY as C } from "@/features/projects/members/botClaimCopy.constant";

const LINK =
  "awc-focus-ring text-[13px] font-semibold text-awc-primary hover:underline disabled:opacity-50";
const FIELD =
  "rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-1.5 text-sm text-awc-fg";

/** Add an assistant you already own (used in another project) without a new invite. */
export default function AwcProjectMembersAddOwnedBot({
  projectId,
  onAdded,
}: {
  readonly projectId: string;
  readonly onAdded: () => void;
}) {
  const {
    bots,
    open,
    setOpen,
    botUserId,
    name,
    setName,
    pending,
    error,
    pick,
    show,
    add,
  } = useAddOwnedBot({ projectId, onAdded });

  if (!open) {
    return (
      <button
        type="button"
        className={`${LINK} justify-self-start`}
        onClick={() => void show()}
      >
        {C.addTitle}
      </button>
    );
  }
  return (
    <div className="grid gap-2" data-add-owned-bot="">
      <p className="m-0 text-[12.5px] text-awc-fg-muted">{C.addHint}</p>
      {bots !== null && bots.length === 0 ? (
        <p className="m-0 text-[13px] text-awc-fg-muted">{C.addNone}</p>
      ) : (
        <>
          <label className="grid gap-1 text-[13px] text-awc-fg">
            {C.addPick}
            <select
              className={FIELD}
              value={botUserId}
              onChange={(e) => pick(e.target.value, bots ?? [])}
            >
              {(bots ?? []).map((b) => (
                <option key={b.userId} value={b.userId}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-[13px] text-awc-fg">
            {C.addName}
            <input
              className={FIELD}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <span className="flex gap-3">
            <button
              type="button"
              className={LINK}
              disabled={pending || botUserId === "" || name.trim() === ""}
              onClick={() => void add()}
            >
              {pending ? C.adding : C.addButton}
            </button>
            <button
              type="button"
              className={LINK}
              onClick={() => setOpen(false)}
            >
              {C.cancel}
            </button>
          </span>
        </>
      )}
      {error !== null ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {error}
        </span>
      ) : null}
    </div>
  );
}
