export const dedupeConsecutiveLogLines = (text: string): string => {
  if (text.length === 0) {
    return text;
  }

  const lines = text.split(/\r?\n/);
  const deduped = lines.reduce<readonly string[]>((acc, line) => {
    if (acc.length === 0 || acc[acc.length - 1] !== line) {
      return [...acc, line];
    }
    return acc;
  }, []);

  return deduped.join("\n");
};
