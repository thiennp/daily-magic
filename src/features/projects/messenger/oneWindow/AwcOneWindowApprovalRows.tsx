import type { OneWindowApprovalCardModel } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import { ONE_WINDOW_FEED_COPY as copy } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** Approval card detail rows: Wants to / Request · Folder · Time · Email · Computer. */
export default function AwcOneWindowApprovalRows({
  model,
}: {
  readonly model: OneWindowApprovalCardModel;
}) {
  return (
    <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[13px]">
      <dt className="text-awc-fg-subtle">
        {model.kind === "run" ? copy.rowWantsTo : copy.rowRequest}
      </dt>
      <dd className="m-0 text-awc-fg">{model.action}</dd>
      {model.folder !== undefined ? (
        <>
          <dt className="text-awc-fg-subtle">Folder</dt>
          <dd className="m-0 font-mono text-[12.5px] text-awc-fg">
            {model.folder}
          </dd>
        </>
      ) : null}
      {model.duration !== undefined ? (
        <>
          <dt className="text-awc-fg-subtle">{copy.rowTime}</dt>
          <dd className="m-0 text-awc-fg">{model.duration}</dd>
        </>
      ) : null}
      {model.email !== undefined ? (
        <>
          <dt className="text-awc-fg-subtle">{copy.rowEmail}</dt>
          <dd className="m-0 text-awc-fg">{model.email}</dd>
        </>
      ) : null}
      {model.computerLabel !== undefined ? (
        <>
          <dt className="text-awc-fg-subtle">Computer</dt>
          <dd className="m-0 text-awc-fg">{model.computerLabel}</dd>
        </>
      ) : null}
    </dl>
  );
}
