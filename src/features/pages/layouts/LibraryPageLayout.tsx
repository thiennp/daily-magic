import LibraryPageClient from "@/features/library/LibraryPageClient";

export default function LibraryPageLayout() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          My library
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Your saved and published playbooks. Create a workflow, tap Use to run
          on your Mac, or copy a prompt for ChatGPT and Gemini.
        </p>
      </div>
      <LibraryPageClient />
    </div>
  );
}
