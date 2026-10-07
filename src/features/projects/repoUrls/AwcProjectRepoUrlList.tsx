"use client";

import AwcBotSupportUrlKindLabel from "@/features/projects/botSupportUrl/AwcBotSupportUrlKindLabel";
import { awcProjectRepoUrlFieldError } from "@/features/projects/repoUrls/awcProjectRepoUrlFieldError";
import { AWC_PROJECT_REPO_URLS_COPY } from "@/features/projects/repoUrls/awcProjectRepoUrlsCopy.constant";

interface AwcProjectRepoUrlListProps {
  readonly urls: readonly string[];
  readonly disabled: boolean;
  readonly fieldErrors?: Readonly<Record<string, string>>;
  readonly onChangeUrl: (index: number, nextUrl: string) => void;
  readonly onRemove: (index: number) => void;
}

export default function AwcProjectRepoUrlList({
  urls,
  disabled,
  fieldErrors,
  onChangeUrl,
  onRemove,
}: AwcProjectRepoUrlListProps) {
  const copy = AWC_PROJECT_REPO_URLS_COPY;

  return (
    <ul className="space-y-2">
      {urls.map((url, index) => {
        const inlineError =
          fieldErrors?.[String(index)] ?? awcProjectRepoUrlFieldError(url);
        return (
          <li key={`repo-url-${index}`} className="space-y-1">
            <AwcBotSupportUrlKindLabel url={url} />
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
                onChange={(event) => onChangeUrl(index, event.target.value)}
                className="w-full flex-1 rounded-lg border border-awc-border bg-white px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                type="button"
                disabled={disabled || urls.length <= 1}
                className="rounded-md border px-2 py-1 text-xs disabled:opacity-40"
                onClick={() => onRemove(index)}
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
  );
}
