/**
 * AWI slice `bundled-deps` — node-pty archive build and install extract.
 */
export { buildAgentWitchBundledDepsArchive } from "../internal/core/buildAgentWitchBundledDepsArchive";

export { ensureNodePtySpawnHelpersExecutable } from "../internal/core/ensureNodePtySpawnHelpersExecutable";

export {
  extractAgentWitchBundledDepsArchive,
  removeLegacyAgentWitchNpmInstallArtifacts,
  resolveAgentWitchBundledDepsArchivePath,
  resolveAgentWitchBundledDepsDir,
} from "../internal/core/extractAgentWitchBundledDepsArchive";
