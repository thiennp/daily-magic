import fs from "node:fs";
import net from "node:net";
import path from "node:path";

import { AWI_INSTALL_ROOT_FILES } from "../../../public-api/types";
import { readAgentWitchWakePortFromFile } from "../resolveAgentWitchRuntimeWakePort";

import { resolveAgentWitchAccountProfileDir } from "./resolveAgentWitchWakePortDir";

const MAX_ALLOCATION_ATTEMPTS = 5;

const allocateFreeLoopbackPort = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port =
        address !== null && typeof address === "object" ? address.port : null;
      server.close(() => {
        if (port === null) {
          reject(new Error("Could not allocate a wake port."));
          return;
        }
        resolve(port);
      });
    });
  });

const allocateAvoiding = async (
  allocatePort: () => Promise<number>,
  avoidPorts: readonly number[],
  attempt: number,
): Promise<number> => {
  const port = await allocatePort();
  if (!avoidPorts.includes(port) || attempt >= MAX_ALLOCATION_ATTEMPTS) {
    return port;
  }
  return allocateAvoiding(allocatePort, avoidPorts, attempt + 1);
};

/** Account wake port in `profiles/<email>/wake-port.json`: reuse when valid, else allocate a free one. */
export const ensureAgentWitchAccountWakePort = async (input: {
  readonly installDir: string;
  readonly email: string;
  readonly avoidPorts?: readonly number[];
  readonly allocatePort?: () => Promise<number>;
}): Promise<number> => {
  const profileDir = resolveAgentWitchAccountProfileDir(
    input.installDir,
    input.email,
  );
  const existing = readAgentWitchWakePortFromFile(profileDir);
  if (existing !== null) {
    return existing;
  }
  const port = await allocateAvoiding(
    input.allocatePort ?? allocateFreeLoopbackPort,
    input.avoidPorts ?? [],
    1,
  );
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(
    path.join(profileDir, AWI_INSTALL_ROOT_FILES.wakePort),
    `${JSON.stringify({ wakePort: port }, null, 2)}\n`,
    "utf8",
  );
  return port;
};
