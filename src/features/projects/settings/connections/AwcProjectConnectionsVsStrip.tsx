import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

const CARD = "min-w-0 rounded-awc-lg border p-3.5";

/** Connections vs Resources comparison strip (design). */
export default function AwcProjectConnectionsVsStrip() {
  return (
    <div
      aria-label="Connections and Resources compared"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      <div className={`${CARD} border-awc-blue-600/30 bg-awc-tile/60`}>
        <h4 className="text-sm font-semibold text-awc-fg">
          {C.vsConnectionsTitle}
        </h4>
        <p className="mt-1 text-[13px] text-awc-fg-muted">
          {C.vsConnectionsBody}
        </p>
      </div>
      <div className={`${CARD} border-awc-border bg-awc-surface`}>
        <h4 className="text-sm font-semibold text-awc-fg">
          {C.vsResourcesTitle}
        </h4>
        <p className="mt-1 text-[13px] text-awc-fg-muted">
          {C.vsResourcesBody}{" "}
          <a
            href="#resources"
            className="awc-focus-ring rounded-awc-chip-sm font-semibold text-awc-blue-700 underline"
          >
            {C.vsOpenResources}
          </a>
        </p>
      </div>
    </div>
  );
}
