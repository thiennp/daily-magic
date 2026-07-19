import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import { submitArchiveWorkflow } from "@/features/workflows/submitArchiveWorkflow";

/** Archives a library picker row and reports whether local state should drop it. */
export const deleteSendTaskComposerLibraryItem = async (
  item: SendTaskComposerPickerItem,
): Promise<boolean> => {
  if (item.kind !== "library") {
    return false;
  }

  const result = await submitArchiveWorkflow(item.id);
  return result.ok;
};
