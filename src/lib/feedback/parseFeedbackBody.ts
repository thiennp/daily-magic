export interface ParsedFeedbackBody {
  readonly rating: number | null;
  readonly comment: string;
}

export function parseFeedbackBody(
  body: unknown,
): ParsedFeedbackBody | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const record = body as Record<string, unknown>;
  const comment =
    typeof record.comment === "string" ? record.comment.trim() : "";

  if (comment.length === 0) {
    return undefined;
  }

  const rating =
    typeof record.rating === "number" &&
    Number.isInteger(record.rating) &&
    record.rating >= 1 &&
    record.rating <= 5
      ? record.rating
      : null;

  return { rating, comment };
}

export function parseFeedbackStatusBody(
  body: unknown,
): "acknowledged" | "dismissed" | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const status = (body as Record<string, unknown>).status;
  if (status === "acknowledged" || status === "dismissed") {
    return status;
  }

  return undefined;
}
