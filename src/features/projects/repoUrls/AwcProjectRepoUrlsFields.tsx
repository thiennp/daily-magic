"use client";

import AwcProjectRepoUrlList from "@/features/projects/repoUrls/AwcProjectRepoUrlList";
import { AWC_PROJECT_REPO_URLS_COPY } from "@/features/projects/repoUrls/awcProjectRepoUrlsCopy.constant";
import type { AwcProjectRepoUrlsFieldsValue } from "@/features/projects/repoUrls/buildRepoUrlsPayload";
import { PROJECT_REPO_URLS_MAX } from "@/lib/projects/validateProjectRepoUrls";

export type { AwcProjectRepoUrlsFieldsValue } from "@/features/projects/repoUrls/buildRepoUrlsPayload";
export { buildRepoUrlsPayload } from "@/features/projects/repoUrls/buildRepoUrlsPayload";

interface AwcProjectRepoUrlsFieldsProps {
  readonly value: AwcProjectRepoUrlsFieldsValue;
  readonly onChange: (next: AwcProjectRepoUrlsFieldsValue) => void;
  readonly disabled?: boolean;
  /** When set, show field-level errors keyed by URL index or "defaultBranch". */
  readonly fieldErrors?: Readonly<Record<string, string>>;
}

export default function AwcProjectRepoUrlsFields({
  value,
  onChange,
  disabled = false,
  fieldErrors,
}: AwcProjectRepoUrlsFieldsProps) {
  const copy = AWC_PROJECT_REPO_URLS_COPY;
  const urls =
    value.repoUrls.length > 0 ? value.repoUrls : ([""] as readonly string[]);

  const setUrlAt = (index: number, nextUrl: string) => {
    const next = [...urls];
    next[index] = nextUrl;
    onChange({ ...value, repoUrls: next });
  };

  const removeAt = (index: number) => {
    const next = urls.filter((_, i) => i !== index);
    onChange({
      ...value,
      repoUrls: next.length > 0 ? next : [""],
    });
  };

  const addUrl = () => {
    if (urls.length >= PROJECT_REPO_URLS_MAX) {
      return;
    }
    onChange({ ...value, repoUrls: [...urls, ""] });
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
          {copy.heading}
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {copy.hint}
        </p>
      </div>
      <AwcProjectRepoUrlList
        urls={urls}
        disabled={disabled}
        fieldErrors={fieldErrors}
        onChangeUrl={setUrlAt}
        onRemove={removeAt}
      />
      <button
        type="button"
        disabled={disabled || urls.length >= PROJECT_REPO_URLS_MAX}
        className="rounded-md border px-3 py-1 text-xs disabled:opacity-40"
        onClick={addUrl}
      >
        {copy.addUrl}
        {urls.length >= PROJECT_REPO_URLS_MAX
          ? ` (${copy.validationMax})`
          : ""}
      </button>
      <label className="block text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.defaultBranchLabel}
        <input
          type="text"
          disabled={disabled}
          value={value.defaultBranch}
          placeholder={copy.defaultBranchPlaceholder}
          onChange={(event) =>
            onChange({ ...value, defaultBranch: event.target.value })
          }
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      {fieldErrors?.defaultBranch ? (
        <p className="text-xs text-error-600 dark:text-error-400">
          {fieldErrors.defaultBranch}
        </p>
      ) : null}
      <p className="text-xs text-gray-500 dark:text-gray-400">{copy.clearHint}</p>
    </div>
  );
}
