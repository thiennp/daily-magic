import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

const initialsOf = (name: string): string =>
  name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

interface GroupCompanyIdentityProps {
  readonly name: string;
  readonly actorRoleLabel: string | null;
  readonly peopleCount: number;
}

export default function GroupCompanyIdentity({
  name,
  actorRoleLabel,
  peopleCount,
}: GroupCompanyIdentityProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-lg bg-awc-accent-soft text-sm font-semibold text-awc-blue-700"
      >
        {initialsOf(name)}
      </span>
      <div className="min-w-0 flex-1 basis-48">
        <h2 id="co-name" className="truncate text-lg font-semibold text-awc-fg">
          {name}
        </h2>
        <p className="flex flex-wrap items-center gap-2 text-sm text-awc-fg-muted">
          {actorRoleLabel ? (
            <span className="rounded-full bg-awc-fill px-2 py-0.5 text-xs font-medium">
              {C.youRole} {actorRoleLabel}
            </span>
          ) : null}
          <span>
            {peopleCount} {C.peopleCount}
          </span>
        </p>
      </div>
    </>
  );
}
