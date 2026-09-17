const shouldCaptureRunOutputForProjectKnowledge = (input: {
  readonly exitCode: number | null | undefined;
  readonly output: string;
}): boolean => {
  if (
    input.exitCode !== undefined &&
    input.exitCode !== null &&
    input.exitCode !== 0
  ) {
    return false;
  }

  return input.output.trim().length > 0;
};

export default shouldCaptureRunOutputForProjectKnowledge;
