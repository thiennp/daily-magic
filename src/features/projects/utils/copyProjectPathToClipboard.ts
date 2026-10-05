const copyProjectPathToClipboard = async (path: string): Promise<boolean> => {
  const value = path.trim();
  if (value.length === 0) {
    return false;
  }

  if (
    typeof navigator === "undefined" ||
    navigator.clipboard === undefined ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
};

export default copyProjectPathToClipboard;
