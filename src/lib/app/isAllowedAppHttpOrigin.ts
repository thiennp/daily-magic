import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

const parseUrlHost = (value: string): string | null => {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
};

const readRequestOriginHost = (request: Request): string | null => {
  const origin = request.headers.get("origin");
  if (origin !== null && origin.length > 0) {
    return parseUrlHost(origin);
  }

  const referer = request.headers.get("referer");
  if (referer !== null && referer.length > 0) {
    return parseUrlHost(referer);
  }

  return null;
};

export const isAllowedAppHttpOrigin = (request: Request): boolean => {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const allowedHost = parseUrlHost(resolveAppBaseUrl());
  const requestHost = readRequestOriginHost(request);

  if (allowedHost === null) {
    return false;
  }

  if (requestHost === null) {
    return false;
  }

  return allowedHost === requestHost;
};
