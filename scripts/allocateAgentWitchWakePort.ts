import net from "node:net";

export const allocateAgentWitchWakePort = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (address === null || typeof address === "string") {
        server.close(() => {
          reject(new Error("Failed to allocate wake port."));
        });
        return;
      }

      const port = address.port;
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
          return;
        }

        resolve(port);
      });
    });

    server.on("error", reject);
  });
