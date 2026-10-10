"use client";

import AwcMemberPermissionSwitch from "@/features/projects/settings/memberPermissions/AwcMemberPermissionSwitch";
import {
  MEMBER_PERMISSIONS_COPY as C,
  MEMBER_PERMISSION_GROUPS,
} from "@/features/projects/settings/memberPermissions/memberPermissionsCopy.constant";
import { useProjectMemberPermissions } from "@/features/projects/settings/memberPermissions/useProjectMemberPermissions";
import { PROJECT_PANEL_CARD_CLASS as CARD } from "@/features/projects/projectPanelCardClasses.constant";
import { PROJECT_MEMBER_PERMISSION_KEYS } from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

interface AwcProjectSettingsMemberPermissionsRowProps {
  readonly projectId: string;
}

/**
 * Settings · "What members can do". Owner only (the panel does not render it
 * for anyone else). Everything is on by default; each switch saves at once and
 * the server writes the Access log row.
 */
export default function AwcProjectSettingsMemberPermissionsRow({
  projectId,
}: AwcProjectSettingsMemberPermissionsRowProps) {
  const setting = useProjectMemberPermissions(projectId);
  const ready = setting.loadState === "ready";
  const anyDenied = PROJECT_MEMBER_PERMISSION_KEYS.some(
    (key) => !setting.permissions[key],
  );

  return (
    <section
      className={`flex flex-col gap-3 ${CARD}`}
      aria-labelledby="p-set-mp-h"
    >
      <div className="flex flex-col gap-0.5">
        <h3
          id="p-set-mp-h"
          className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
        >
          {C.heading}
        </h3>
        <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
          {C.intro}
        </p>
      </div>
      {setting.loadState === "loading" ? (
        <p className="px-3.5 text-[13px] text-awc-fg-muted dark:text-gray-400">
          {C.loading}
        </p>
      ) : null}
      {setting.loadState === "error" ? (
        <p className="px-3.5 text-[13px] text-awc-fg-muted dark:text-gray-400">
          {C.loadError}{" "}
          <button
            type="button"
            onClick={setting.reload}
            className="font-medium text-awc-fg underline dark:text-gray-200"
          >
            {C.retry}
          </button>
        </p>
      ) : null}
      {ready
        ? MEMBER_PERMISSION_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <h4 className="px-3.5 text-[12px] font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-500">
                {group.title}
              </h4>
              {group.rows.map((row) => (
                <AwcMemberPermissionSwitch
                  key={row.key}
                  row={row}
                  on={setting.permissions[row.key]}
                  disabled={setting.saving}
                  onToggle={() =>
                    void setting.save({
                      [row.key]: !setting.permissions[row.key],
                    })
                  }
                />
              ))}
            </div>
          ))
        : null}
      {ready && anyDenied ? (
        <button
          type="button"
          onClick={() => void setting.resetAll()}
          disabled={setting.saving}
          className="self-start px-3.5 text-[13px] font-medium text-awc-fg underline disabled:opacity-60 dark:text-gray-200"
        >
          {C.reset}
        </button>
      ) : null}
      {setting.saveFailed ? (
        <p
          role="alert"
          className="px-3.5 text-[13px] text-error-600 dark:text-error-400"
        >
          {C.saveError}
        </p>
      ) : null}
    </section>
  );
}
