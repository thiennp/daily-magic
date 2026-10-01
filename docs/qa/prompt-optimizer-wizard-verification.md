# How do I verify the Prompt SDLC wizard after a release?

## Query aliases

- verify prompt SDLC wizard steps 1 2 3 4
- dogfood prompt optimizer wizard bundle 172
- wizard evaluate separate optimize round logs step 4
- kiểm tra wizard prompt optimizer Agent Witch Local

## Short answer

Ship **bundle 172+** on `https://www.agentwitch.com`, update the Mac install, open **AWL** `http://127.0.0.1:43347/prompt-optimizer`, choose **Run** (wizard), and walk gates 1–4. Use the verification source prompt below; the wizard should generalize variables, run evaluate rounds (cannot continue on score 0), show module chunks at separate, and show **Scored rounds** plus timeline judge entries at step 4.

## Verification source prompt (improve this with the wizard)

**Goal:** `PROMPT_SDLC_WIZARD_VERIFICATION_GOAL` in `.agents/scripts/dev/promptSdlcWizardVerificationDogfood.constants.ts`.

**Starting prompt (weak — for dogfood):** `PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT` (same file).

**After wizard dogfood (2026-09-29):** `PROMPT_SDLC_WIZARD_VERIFICATION_IMPROVED_PROMPT` — produces `.cursor/skills/verify-prompt-optimizer-wizard/SKILL.md` with full steps 1–4. Artifact: `/opt/cursor/artifacts/prompt-optimizer-wizard-dogfood-result.md` (dev VM).

## Production checks (AWC)

```bash
curl -sS https://www.agentwitch.com/install/agent-witch/version
# expect bundleVersion "172" or newer

curl -sS https://www.agentwitch.com/install/agent-witch/app/agent-witch.js | rg "Scored rounds for|sdlc-wizard-module-rounds"
```

## AWL checklist

| Step | Gate       | Pass criteria                                                                                                    |
| ---- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | Generalize | Templated prompt + variable list; timeline shows Step 1 only (no classic rounds).                                |
| 2    | Evaluate   | Two+ revisions with scores; Continue blocked on score 0; pick revision before Separate.                          |
| 3    | Separate   | Each split option shows module **chunks** (title + prompt).                                                      |
| 4    | Optimize   | Gate lists **Scored rounds for «module»**; timeline shows Judge scored round N; separated summary stays visible. |
| Done | Passed     | Timeline includes Steps 1–4 and Passed.                                                                          |

## Automated dogfood (dev)

```bash
npx tsx .agents/scripts/dev/dogfoodPromptSdlcWizardVerification.ts
# fresh run: AWL_DOGFOOD_RESET=1 npx tsx ...
```

Resumes a non-terminal cycle in `AWL_DOGFOOD_INSTALL_DIR` (default `/opt/cursor/artifacts/awl-wizard-dogfood`). Writes `/opt/cursor/artifacts/prompt-optimizer-wizard-dogfood-result.md` when status is `passed`.

## Related

- [prompt-sdlc.md](prompt-sdlc.md)
- `.agents/scripts/dev/promptSdlcWizardVerificationDogfood.constants.ts`

## Last reviewed

2026-09-29
