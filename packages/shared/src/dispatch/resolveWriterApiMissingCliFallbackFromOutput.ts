import {
  isCliWriterApiKeyMissingExecutionBackend,
  parseAgentRunWriterExecutionHonestyFromOutput,
} from "./parseAgentRunWriterExecutionHonestyFromOutput";

export type WriterApiMissingCliFallbackHonesty = {
  readonly reasonCode: string | null;
};

export const resolveWriterApiMissingCliFallbackFromWriterExecutionOutput = (
  output: string,
): WriterApiMissingCliFallbackHonesty | null => {
  const writerExecution = parseAgentRunWriterExecutionHonestyFromOutput(output);
  if (
    writerExecution === null ||
    !isCliWriterApiKeyMissingExecutionBackend(writerExecution.backend)
  ) {
    return null;
  }
  return { reasonCode: writerExecution.reasonCode };
};
