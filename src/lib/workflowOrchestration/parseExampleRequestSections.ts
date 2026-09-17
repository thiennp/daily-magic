export const parseExampleRequestSections = (
  exampleRequest: string,
): readonly string[] => {
  const trimmed = exampleRequest.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const parts = trimmed.split(/\n(?=##\s)/);
  if (parts.length <= 1) {
    return [trimmed];
  }

  return parts.map((part) => part.trim()).filter((part) => part.length > 0);
};

export default parseExampleRequestSections;
