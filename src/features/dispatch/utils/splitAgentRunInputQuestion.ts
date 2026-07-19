export const splitAgentRunInputQuestion = (
  question: string,
): readonly string[] => {
  const trimmed = question.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const parts = trimmed.split(/\?\s+(?:And|and)\s+/);
  if (parts.length <= 1) {
    return [trimmed];
  }

  const first = parts[0]?.trim() ?? "";
  const second = parts.slice(1).join(" ").trim();
  const questions: string[] = [];

  if (first.length > 0) {
    questions.push(first.endsWith("?") ? first : `${first}?`);
  }
  if (second.length > 0) {
    const normalizedSecond = second.charAt(0).toUpperCase() + second.slice(1);
    questions.push(
      normalizedSecond.endsWith("?")
        ? normalizedSecond
        : `${normalizedSecond}?`,
    );
  }

  return questions;
};
