"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { COMPANY_DIRECTORY_TITLE } from "@/lib/admin/companyGroupCopy.constant";

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
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {COMPANY_DIRECTORY_TITLE}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        See which assistants your teammates offer before you send a task.
      </p>
      <div className="mt-4 space-y-6">
        {groups.map((group) => (
          <div key={group.groupId}>
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              {group.groupName}
            </h3>
            <ul className="mt-3 space-y-4">
              {group.members.map((member) => (
                <li
                  key={member.userId}
                  className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
                >
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {member.name ?? member.email}
                  </p>
                  {member.capabilities.length === 0 ? (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      No published assistants yet.
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {member.capabilities.map((capability) => (
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
              ))}
            </ul>
          </div>
        ))}
      </div>
    </AppPanel>
  );
}
