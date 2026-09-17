const distillProjectKnowledgeLesson = (input: {
  readonly prompt: string;
  readonly output: string;
}): string => {
  const promptLine = input.prompt.trim().split("\n")[0]?.trim() ?? "";
  const outputLine = input.output.trim().split("\n")[0]?.trim() ?? "";
  const combined =
    outputLine.length > 0
      ? outputLine
      : promptLine.length > 0
        ? promptLine
        : "Lesson from completed run";

  if (combined.length <= 280) {
    return combined;
  }

  return `${combined.slice(0, 277)}…`;
};

export default distillProjectKnowledgeLesson;
