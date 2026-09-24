import { notFound } from "next/navigation";

import WorkflowProgressSection from "@/features/styleguide/sections/WorkflowProgressSection";

export default function DevWorkflowProgressPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 sm:p-10">
      <WorkflowProgressSection />
    </div>
  );
}
