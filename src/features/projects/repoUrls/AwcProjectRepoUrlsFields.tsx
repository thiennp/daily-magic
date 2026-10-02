"use client";

import { AWC_PROJECT_REPO_URLS_COPY } from "@/features/projects/repoUrls/awcProjectRepoUrlsCopy.constant";
import {
  PROJECT_REPO_URLS_MAX,
  isValidProjectRepoUrl,
} from "@/lib/projects/validateProjectRepoUrls";

export type AwcProjectRepoUrlsFieldsValue = {
  readonly repoUrls: readonly string[];
  readonly defaultBranch: string;
};

interface AwcProjectRepoUrlsFieldsProps {
  readonly value: AwcProjectRepoUrlsFieldsValue;
  readonly onChange: (next: AwcProjectRepoUrlsFieldsValue) => void;
  readonly disabled?: boolean;
  /** When set, show field-level errors keyed by URL index or "defaultBranch". */
  readonly fieldErrors?: Readonly<Record<string, string>>;
}

const urlFieldError = (url: string): string | null => {
  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (!isValidProjectRepoUrl(trimmed)) {
    if (/@/.test(trimmed) && /^https?:\/\//iu.test(trimmed)) {
      return AWC_PROJECT_REPO_URLS_COPY.validationCredentials;
    }
    if (/[?&#](token|access_token|api_key|password|secret)=/iu.test(trimmed)) {
      return AWC_PROJECT_REPO_URLS_COPY.validationCredentials;
    }
    return AWC_PROJECT_REPO_URLS_COPY.validationScheme;
  }
  return null;
};

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
      <ul className="space-y-2">
        {urls.map((url, index) => {
          const inlineError =
            fieldErrors?.[String(index)] ?? urlFieldError(url);
          return (
            <li key={`repo-url-${index}`} className="space-y-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <label className="sr-only" htmlFor={`repo-url-input-${index}`}>
                  {copy.urlLabel} {index + 1}
                </label>
                <input
                  id={`repo-url-input-${index}`}
                  type="text"
                  disabled={disabled}
                  value={url}
                  placeholder={copy.urlPlaceholder}
                  onChange={(event) => setUrlAt(index, event.target.value)}
                  className="w-full flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-800"
                />
                <button
                  type="button"
                  disabled={disabled || urls.length <= 1}
                  className="rounded-md border px-2 py-1 text-xs disabled:opacity-40"
                  onClick={() => removeAt(index)}
                >
                  {copy.removeUrl}
                </button>
              </div>
              {inlineError !== null && inlineError.length > 0 ? (
                <p className="text-xs text-error-600 dark:text-error-400">
                  {inlineError}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
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

/** Collect non-empty trimmed URLs + optional branch for API payloads. */
export const buildRepoUrlsPayload = (
  value: AwcProjectRepoUrlsFieldsValue,
): {
  readonly repoUrls: string[];
  readonly defaultBranch: string | null;
} => {
  const repoUrls = value.repoUrls
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
  const trimmedBranch = value.defaultBranch.trim();
  return {
    repoUrls,
    defaultBranch: trimmedBranch.length > 0 ? trimmedBranch : null,
  };
};
