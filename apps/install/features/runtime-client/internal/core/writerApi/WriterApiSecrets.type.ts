import type { WriterApiProvider } from "./WriterApiProvider.constant";

export interface WriterApiProviderSecret {
  readonly apiKey: string;
  readonly model?: string;
}

export type WriterApiSecretsFile = Partial<
  Record<WriterApiProvider, WriterApiProviderSecret>
>;
