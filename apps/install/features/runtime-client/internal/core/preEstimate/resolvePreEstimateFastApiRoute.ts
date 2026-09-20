import type { WriterApiProvider } from "../writerApi/WriterApiProvider.constant";
import { readWriterApiProviderSecret } from "../writerApi/readWriterApiSecrets";

import {
  PRE_ESTIMATE_FAST_API_MODELS,
  PRE_ESTIMATE_FAST_API_PROVIDER_ORDER,
} from "./preEstimateFastApiModels.constant";

export interface PreEstimateFastApiRoute {
  readonly provider: WriterApiProvider;
  readonly model: string;
}

export const resolvePreEstimateFastApiRoute = (
  profileDir: string,
): PreEstimateFastApiRoute | null => {
  for (const provider of PRE_ESTIMATE_FAST_API_PROVIDER_ORDER) {
    const secret = readWriterApiProviderSecret(profileDir, provider);
    if (secret !== null && secret.apiKey.length > 0) {
      return {
        provider,
        model: PRE_ESTIMATE_FAST_API_MODELS[provider],
      };
    }
  }
  return null;
};
