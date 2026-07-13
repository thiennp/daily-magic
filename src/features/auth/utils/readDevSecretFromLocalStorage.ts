import { DEV_SECRET_LOCAL_STORAGE_KEY } from "@/lib/auth/devSecret.constant";

const readDevSecretFromLocalStorage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const secret = window.localStorage.getItem(DEV_SECRET_LOCAL_STORAGE_KEY);

  if (typeof secret !== "string" || secret.trim().length === 0) {
    return null;
  }

  return secret;
};

export default readDevSecretFromLocalStorage;
