import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

/** All-disconnected empty card (design: dashed card above the list). */
export default function AwcProjectConnectionsEmpty() {
  return (
    <div className="rounded-awc-lg border border-dashed border-awc-border-strong bg-awc-tile/50 p-4">
      <h4 className="text-sm font-semibold text-awc-fg">{C.empty}</h4>
      <p className="mt-1 text-[13px] text-awc-fg-muted">{C.vsResources}</p>
    </div>
  );
}
