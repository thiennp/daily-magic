import LibraryPanel from "@/features/library/LibraryPanel";

export default function LibraryPageLayout() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          My library
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Your saved and published playbooks. Tap Use to run on your Mac with
          fields prefilled, or copy a prompt for ChatGPT and Gemini.
        </p>
      </div>
      <LibraryPanel />
    </div>
  );
}
