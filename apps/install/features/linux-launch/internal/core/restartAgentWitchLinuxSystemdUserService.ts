import { spawn } from "node:child_process";

import { AGENT_WITCH_SYSTEMD_USER_UNIT_NAME } from "../../public-api/types";

export const restartAgentWitchLinuxSystemdUserService = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (process.platform !== "linux") {
      resolve();
      return;
    }

    const child = spawn(
      "systemctl",
      ["--user", "restart", AGENT_WITCH_SYSTEMD_USER_UNIT_NAME],
      { stdio: "ignore" },
    );

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(
        new Error(
          `systemctl --user restart ${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME} exited ${code ?? "unknown"}`,
        ),
      );
    });
  });
