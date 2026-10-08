import { isDeleteOnlyGitPush } from "./isDeleteOnlyGitPush";

const stdin = await new Promise<string>((resolve, reject) => {
  const chunks: Buffer[] = [];
  process.stdin.on("data", (chunk: Buffer) => chunks.push(chunk));
  process.stdin.on("end", () =>
    resolve(Buffer.concat(chunks).toString("utf8")),
  );
  process.stdin.on("error", reject);
});

if (isDeleteOnlyGitPush(stdin.split("\n"))) {
  process.exit(0);
}
process.exit(1);
