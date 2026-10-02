import { AWC_PROJECT_REPO_URLS_COPY } from "@/features/projects/repoUrls/awcProjectRepoUrlsCopy.constant";
import { isValidProjectRepoUrl } from "@/lib/projects/isValidProjectRepoUrl";

export const awcProjectRepoUrlFieldError = (url: string): string | null => {
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
