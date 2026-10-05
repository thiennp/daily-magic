import Link from "next/link";
import type { ReactNode } from "react";

import { PROJECTS_LIBRARY_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";

/** Inline link from send-task empty states to a project's Library tab. */
export default function ProjectLibraryLink({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <Link
      href={PROJECTS_LIBRARY_INTENT_HREF}
      className="text-brand-700 dark:text-brand-300"
    >
      {children}
    </Link>
  );
}
