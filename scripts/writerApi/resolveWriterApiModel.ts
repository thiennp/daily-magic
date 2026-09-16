import { DEFAULT_WRITER_API_MODELS } from "./WriterApiProvider.constant";
import type { WriterApiProvider } from "./WriterApiProvider.constant";
import { WRITER_API_MODEL_AUTO } from "./writerApiModelOptions.constant";

export const normalizeWriterApiModelForStorage = (
  modelInput: string | undefined,
): string | undefined => {
  const model = modelInput?.trim() ?? "";
  if (model.length === 0 || model === WRITER_API_MODEL_AUTO) {
    return undefined;
  }
  return model;
};

export const resolveWriterApiModel = (
  provider: WriterApiProvider,
  storedModel?: string,
): string => {
  const normalized = normalizeWriterApiModelForStorage(storedModel);
  if (normalized === undefined) {
    return DEFAULT_WRITER_API_MODELS[provider];
  }
  return normalized;
};

export const resolveWriterApiModelSelectValue = (
  storedModel?: string,
): string => {
  const normalized = normalizeWriterApiModelForStorage(storedModel);
  if (normalized === undefined) {
    return WRITER_API_MODEL_AUTO;
  }
  return normalized;
};
