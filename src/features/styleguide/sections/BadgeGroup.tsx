import type { ReactNode } from "react";

interface BadgeGroupProps {
  readonly title: string;
  readonly children: ReactNode;
}

export default function BadgeGroup({ title, children }: BadgeGroupProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
      </div>
      <div className="border-t border-gray-100 p-6 dark:border-gray-800 xl:p-10">
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
