"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { COMPANY_DIRECTORY_TITLE } from "@/lib/admin/companyGroupCopy.constant";
import isUserCreatedCapability from "@/lib/capabilities/isUserCreatedCapability";

export default function TeamDirectoryPanel() {
  const { groups, isLoading } = useDispatchTargets();

  if (isLoading) {
    return (
      <AppPanel>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading {COMPANY_DIRECTORY_TITLE.toLowerCase()}…
        </p>
      </AppPanel>
    );
  }

  if (groups.length === 0) {
    return null;
  }

  return (
    <AppPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        {COMPANY_DIRECTORY_TITLE}
      </h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        See which assistants your teammates offer before you send a task.
      </p>
      <div className="mt-4 space-y-6">
        {groups.map((group) => (
          <div key={group.groupId}>
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              {group.groupName}
            </h3>
            <ul className="mt-3 space-y-4">
              {group.members.map((member) => {
                const visibleCapabilities = member.capabilities.filter(
                  isUserCreatedCapability,
                );

                return (
                  <li
                    key={member.userId}
                    className={APP_SURFACE_NESTED_CARD_CLASS}
                  >
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {member.name ?? member.email}
                    </p>
                    {visibleCapabilities.length === 0 ? (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        No published assistants yet.
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {visibleCapabilities.map((capability) => (
                          <li
                            key={capability.id}
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="font-medium text-gray-800 dark:text-white/90">
                              {capability.name}
                            </span>
                            {capability.description.length > 0
                              ? ` — ${capability.description}`
                              : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </AppPanel>
  );
}
