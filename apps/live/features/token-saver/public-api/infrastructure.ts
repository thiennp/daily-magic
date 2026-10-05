/**
 * AWL slice `token-saver` — local pitfall registry cache (SQLite).
 * Not wired into the AWL entrypoint yet (step 1 only).
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
