import { AGENT_ACCESS_BODY_MAX_BYTES } from "@/lib/agentAccess/agentAccess.constant";

const readChunks = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  chunks: Uint8Array[],
  total: number,
): Promise<number | "too_large"> => {
  const { done, value } = await reader.read();

  if (done) {
    return total;
  }

  const next = total + value.byteLength;

  if (next > AGENT_ACCESS_BODY_MAX_BYTES) {
    await reader.cancel();
    return "too_large";
  }

  chunks.push(value);

  return readChunks(reader, chunks, next);
};

export const readBoundedAgentAccessBody = async (
  request: Request,
): Promise<unknown | "too_large"> => {
  const declared = request.headers.get("content-length");

  if (declared !== null && Number(declared) > AGENT_ACCESS_BODY_MAX_BYTES) {
    return "too_large";
  }

  if (request.body === null) {
    return null;
  }

  const chunks: Uint8Array[] = [];
  const read = await readChunks(request.body.getReader(), chunks, 0);

  if (read === "too_large") {
    return "too_large";
  }

  const text = new TextDecoder().decode(
    Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))),
  );

  if (text.trim().length === 0) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
};
