import type { ConnectionsNotice } from "@/features/projects/settings/connections/useProjectConnectionsActions";

/** Success / error toast line (design toast), live-region announced. */
export default function AwcProjectConnectionsNotice({
  notice,
}: {
  readonly notice: ConnectionsNotice;
}) {
  if (notice === null) return null;
  return (
    <p
      role={notice.error ? "alert" : "status"}
      className={`rounded-awc-lg px-3 py-2 text-sm font-medium ${
        notice.error
          ? "bg-awc-bad-soft text-awc-bad"
          : "bg-awc-ok-soft text-awc-ok"
      }`}
    >
      {notice.text}
    </p>
  );
}
