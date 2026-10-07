/**
 * Copy text that is still loading (e.g. fetched on click). Prefers
 * ClipboardItem with a pending Blob so Safari keeps the click's user
 * activation; falls back to writeText after the load. null text = no copy.
 */
export const copyTextFromLoader = async (
  load: Promise<string | null>,
): Promise<boolean> => {
  const clipboard =
    typeof navigator === "undefined" ? undefined : navigator.clipboard;
  if (clipboard === undefined) return false;
  if (
    typeof ClipboardItem !== "undefined" &&
    typeof clipboard.write === "function"
  ) {
    try {
      const blob = load.then((text) => {
        if (text === null) throw new Error("no_text");
        return new Blob([text], { type: "text/plain" });
      });
      await clipboard.write([new ClipboardItem({ "text/plain": blob })]);
      return true;
    } catch {
      // Unsupported promise items or nothing to copy: try plain text below.
    }
  }
  const text = await load.catch(() => null);
  if (text === null || typeof clipboard.writeText !== "function") return false;
  try {
    await clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
