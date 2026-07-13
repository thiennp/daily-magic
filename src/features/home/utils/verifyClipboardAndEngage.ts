import { doesClipboardMatchCommand } from "@/features/home/utils/doesClipboardMatchCommand";
import { readClipboardText } from "@/features/home/utils/readClipboardText";

const verifyClipboardAndEngage = async (
  command: string,
  onEngaged?: () => void,
): Promise<boolean> => {
  const clipboardText = await readClipboardText();

  if (!doesClipboardMatchCommand(command, clipboardText)) {
    return false;
  }

  onEngaged?.();
  return true;
};

export default verifyClipboardAndEngage;
