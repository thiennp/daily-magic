export const AGENT_WITCH_COMPONENTS_DIR_NAME = "components";

export const AGENT_WITCH_COMPONENT_STORE_DIR_NAME = "store";

export const AGENT_WITCH_COMPONENT_VERSIONS_DIR_NAME = "versions";

export const AGENT_WITCH_COMPONENT_INSTALLED_FILE_NAME = "installed.json";

export const AGENT_WITCH_COMPONENT_VERSION_MANIFEST_VERSION = 1;

export const harnessSetComponentId = (setSlug: string): string =>
  `harness-set:${setSlug.trim()}`;
