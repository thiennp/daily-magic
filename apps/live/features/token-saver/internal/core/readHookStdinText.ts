/** Claude hook timeout is 3s (Stop: longer); never wait on an open TTY / stuck pipe past this. */
const STDIN_TIMEOUT_MS = 1500;

const readStdinText = (
  stdin: NodeJS.ReadableStream & { destroy?: () => void },
  timeoutMs: number,
): Promise<string> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let settled = false;
    const finish = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      stdin.removeAllListeners("data");
      stdin.removeAllListeners("end");
      stdin.removeAllListeners("error");
      stdin.pause();
      resolve(Buffer.concat(chunks).toString("utf8"));
    };
    const timer = setTimeout(finish, timeoutMs);
    stdin.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, "utf8"));
    });
    stdin.on("end", finish);
    stdin.on("error", finish);
  });

export const readHookStdinText = (
  stdin: NodeJS.ReadableStream & { destroy?: () => void },
): Promise<string> => readStdinText(stdin, STDIN_TIMEOUT_MS);
