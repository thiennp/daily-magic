export const readClipboardText = async (): Promise<string | null> => {
  if (!navigator.clipboard?.readText) {
    return null;
  }

  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
};
