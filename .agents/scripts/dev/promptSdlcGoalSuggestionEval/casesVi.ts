import type { PromptSdlcGoalSuggestionEvalCase } from "./types";

export const PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES_VI: readonly PromptSdlcGoalSuggestionEvalCase[] =
  [
    {
      id: "vi-feature-copy",
      prompt:
        "Viết lại mô tả tính năng Prompt optimizer trên trang /prompt-optimizer cho ngắn gọn.",
      writerReply: JSON.stringify({
        options: [
          "File src/app/prompt-optimizer/page.tsx có đoạn mô tả ≤ 120 từ tiếng Việt.",
          "npm run test passes sau khi đổi copy.",
          "Git diff không đụng file ngoài src/app/prompt-optimizer/.",
        ],
      }),
      expectScorePasses: true,
    },
    {
      id: "vi-mixed-quality",
      prompt: "Thêm test cho parse goal suggestions.",
      writerReply: JSON.stringify({
        options: [
          "src/lib/promptOptimizer/parsePromptSdlcGoalSuggestions.test.ts có case tiếng Việt.",
          "Làm tốt hơn và chi tiết hơn.",
          "vitest chạy pass cho file parse*.test.ts.",
        ],
      }),
      expectScorePasses: true,
    },
  ];
