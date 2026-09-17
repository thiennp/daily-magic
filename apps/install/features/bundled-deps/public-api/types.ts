import {
  AWI_SHIPPED_APP_DIR_NAME,
  AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME,
} from "@agent-witch/install-bundle/types";

export { AWI_SHIPPED_APP_DIR_NAME, AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME };

/** Extracted native deps directory under `app/`. */
export const AWI_BUNDLED_DEPS_DIR_NAME = "deps";

export const AWI_BUNDLED_DEPS_ARCHIVE_RELATIVE_PATH = `${AWI_SHIPPED_APP_DIR_NAME}/${AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME}`;
