import { assertProjectSyncDeviceAccess } from "@/lib/projects/acl/sync/assertProjectSyncDeviceAccess";
import { normalizeProjectSyncPath } from "@/lib/projects/acl/sync/normalizeProjectSyncPath";
import {
  PROJECT_SYNC_MAX_FILE_BYTES,
  type ProjectSyncKind,
} from "@/lib/projects/acl/sync/projectSync.constants";
import { scanProjectSyncContentForSecrets } from "@/lib/projects/acl/sync/scanProjectSyncContentForSecrets";

export type ValidateProjectSyncOfferResult =
  | {
      readonly ok: true;
      readonly path: string;
      readonly kind: ProjectSyncKind;
      readonly size: number;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_enabled"
        | "not_member"
        | "invalid"
        | "too_large"
        | "secret_suspect"
        | "invalid_path"
        | "kind_not_allowed";
    };

export const validateProjectSyncOffer = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly path: string;
  readonly bodyUtf8: string;
}): Promise<ValidateProjectSyncOfferResult> => {
  const access = await assertProjectSyncDeviceAccess({
    projectId: input.projectId,
    deviceId: input.deviceId,
  });
  if (!access.ok) {
    return {
      ok: false,
      code:
        access.code === "folder_ref_required" ? "not_enabled" : access.code,
    };
  }
  const normalized = normalizeProjectSyncPath(input.path);
  if (!normalized.ok) {
    return { ok: false, code: normalized.code };
  }
  const size = Buffer.byteLength(input.bodyUtf8, "utf8");
  if (size > PROJECT_SYNC_MAX_FILE_BYTES) {
    return { ok: false, code: "too_large" };
  }
  const secret = scanProjectSyncContentForSecrets(input.bodyUtf8);
  if (!secret.ok) {
    return { ok: false, code: "secret_suspect" };
  }
  return {
    ok: true,
    path: normalized.path,
    kind: normalized.kind,
    size,
  };
};
