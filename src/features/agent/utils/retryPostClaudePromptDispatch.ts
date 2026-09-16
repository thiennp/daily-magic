import { isRetryableWriterDispatchRaw } from "@/features/agent/utils/isRetryableWriterDispatchRaw";

const WRITER_DISPATCH_RETRY_ATTEMPTS = 3;
const WRITER_DISPATCH_RETRY_BASE_MS = 1_500;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const retryPostClaudePromptDispatch = async (
  dispatchOnce: () => Promise<string>,
): Promise<string> => {
  const attemptIndices = Array.from(
    { length: WRITER_DISPATCH_RETRY_ATTEMPTS },
    (_, index) => index,
  );

  const firstRaw = await dispatchOnce();
  return attemptIndices
    .slice(1)
    .reduce<Promise<string>>(async (rawPromise, attemptIndex) => {
      const raw = await rawPromise;
      if (!isRetryableWriterDispatchRaw(raw)) {
        return raw;
      }

      await sleep(WRITER_DISPATCH_RETRY_BASE_MS * attemptIndex);
      return dispatchOnce();
    }, Promise.resolve(firstRaw));
};
