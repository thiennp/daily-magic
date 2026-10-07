import React from "react";
import { twMerge } from "tailwind-merge";

import { APP_SURFACE_PANEL_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div className={twMerge(APP_SURFACE_PANEL_CLASS, className)}>
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-awc-fg dark:text-white/90">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-awc-fg-muted dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-awc-border dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
