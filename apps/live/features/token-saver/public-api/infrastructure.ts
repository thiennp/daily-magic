/**
 * AWL slice `token-saver` — local pitfall registry + check_context tool handler.
 * MCP JSON-RPC transport lives in `@agent-witch/live-mcp`.
 */
export { createPitfallRegistry } from "../internal/core/createPitfallRegistry";
export type { PitfallRegistry } from "../internal/core/createPitfallRegistry";
export { resolveTokenSaverDbPath } from "../internal/core/resolveTokenSaverDbPath";
export { matchPitfallsByKeywords } from "../internal/core/matchPitfallsByKeywords";
export { shadowPitfalls } from "../internal/core/shadowPitfalls";
export { listBundledSeedPitfalls } from "../internal/core/pitfallSeedRows";
export { checkContext } from "../internal/core/checkContext";
export type {
  CheckContextDeps,
  CheckContextRegistry,
} from "../internal/core/checkContext";
export { AWL_CHECK_CONTEXT_TOOL } from "../internal/core/awlCheckContextTool.constant";
export { createCheckContextRunner } from "../internal/core/createCheckContextRunner";
export type { CheckContextRunnerDeps } from "../internal/core/createCheckContextRunner";
export { tryHandleTokenSaverLocalRequest } from "../internal/core/tryHandleTokenSaverLocalRequest";
