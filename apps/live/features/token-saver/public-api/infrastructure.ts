/**
 * AWL slice `token-saver` — local pitfall registry + check_context MCP.
 */
export { createPitfallRegistry } from "../internal/core/createPitfallRegistry";
export type { PitfallRegistry } from "../internal/core/createPitfallRegistry";
export { resolveTokenSaverDbPath } from "../internal/core/resolveTokenSaverDbPath";
export { matchPitfallsByKeywords } from "../internal/core/matchPitfallsByKeywords";
export { shadowPitfalls } from "../internal/core/shadowPitfalls";
export {
  capPitfallsForBot,
  formatPitfallBotLine,
} from "../internal/core/formatPitfallsForBot";
export { listBundledSeedPitfalls } from "../internal/core/pitfallSeedRows";
export { checkContext } from "../internal/core/checkContext";
export type {
  CheckContextDeps,
  CheckContextRegistry,
} from "../internal/core/checkContext";
export { resolveProjectIdFromCwd } from "../internal/core/resolveProjectIdFromCwd";
export {
  AWL_CHECK_CONTEXT_TOOL,
  AWL_MCP_TOOLS,
} from "../internal/core/awlCheckContextTool.constant";
export { handleAwlMcpRequest } from "../internal/core/handleAwlMcpRequest";
export { createCheckContextRunner } from "../internal/core/createCheckContextRunner";
export { tryHandleTokenSaverLocalRequest } from "../internal/core/tryHandleTokenSaverLocalRequest";
export { runAwlMcpStdio } from "../internal/core/runAwlMcpStdio";
