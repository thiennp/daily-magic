import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import { withAwlStorybookShell } from "@/utils/storybook/awl/withAwlStorybookShell";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const buildPromptOptimizerFixtureBody = (
  status: StorybookPageStatus,
): string => {
  if (status === "loading") {
    return `<section class="card"><h1>Prompt optimizer</h1><p class="muted">Checking writers…</p></section>`;
  }
  if (status === "empty") {
    return `<section class="card"><h1>Prompt optimizer</h1><p class="empty">Add a goal and prompt to start the wizard.</p></section>`;
  }
  const error =
    status === "error"
      ? `<p class="alert-warn">Writer check failed in story fixture.</p>`
      : "";
  return `<section class="card">
    <p class="eyebrow">Prompt optimizer</p>
    <h1>Ship Storybook coverage</h1>
    ${error}
    <p class="lede">Goal and prompt fields populated for Storybook preview.</p>
    <form class="sdlc-form">
      <label>Goal<input name="goal" value="Ship Storybook coverage" /></label>
      <label>Prompt<textarea name="prompt">You are improving AWC/AWL page previews.</textarea></label>
      <button type="button" class="btn btn-primary" ${status === "ready" ? "" : "disabled"}>Run wizard</button>
    </form>
  </section>`;
};

export const AWL_PROMPT_OPTIMIZER_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] =
  [
    withAwlStorybookShell({
      id: "prompt-optimizer",
      title: "Prompt optimizer",
      path: "/prompt-optimizer",
      activePath: "/prompt-optimizer",
      statuses: ["ready", "empty", "error", "loading"],
      buildBody: (status) => buildPromptOptimizerFixtureBody(status),
    }),
    withAwlStorybookShell({
      id: "prompt-optimizer-guide",
      title: "Prompt optimizer guide",
      path: "/prompt-optimizer/guide",
      activePath: "/prompt-optimizer",
      statuses: ["ready"],
      buildBody: () =>
        `<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede">Storybook fixture — see AWL for the full guide copy.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
    </section>`,
    }),
  ];
