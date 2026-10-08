import type { KnowledgeTaskClass } from "./episode.types";

const FILE_PATH_PATTERN =
  /[\w./-]+\.(?:tsx?|jsx?|mjs|cjs|json|md|mdx|sql|css|scss|html|go|py|rs|swift|sh|ya?ml|toml)\b/i;

const CODE_INTENT_PATTERN =
  /\b(fix|bug|implement|refactor|add|create|update|change|remove|delete|rename|test|lint|build|deploy|migrate|commit|revert|function|component|endpoint|api|error|exception|stack trace|sửa|thêm|tạo|xoá|xóa|đổi|chạy|lỗi|viết|làm)\b/i;

const FENCE = "```";

/** Rules only (no LLM): does the prompt look like it will touch code? */
export const classifyKnowledgeTaskClass = (
  prompt: string,
): KnowledgeTaskClass =>
  prompt.includes(FENCE) ||
  FILE_PATH_PATTERN.test(prompt) ||
  CODE_INTENT_PATTERN.test(prompt)
    ? "code"
    : "chat";
