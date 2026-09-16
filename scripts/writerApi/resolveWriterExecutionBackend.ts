export type WriterExecutionBackend = "cli" | "api";

export const resolveWriterExecutionBackend = (
  configValue: unknown,
): WriterExecutionBackend => (configValue === "api" ? "api" : "cli");
