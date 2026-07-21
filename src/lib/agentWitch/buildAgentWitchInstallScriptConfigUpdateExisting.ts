export const buildAgentWitchInstallScriptConfigUpdateExisting = (input: {
  readonly wsUrl: string;
}): string => `
"\${NODE_BIN}" - "\${CONFIG_PATH}" "\${PROFILE_EMAIL}" "${input.wsUrl}" "\${PAIRING_TOKEN}" <<'NODE'
const fs = require("node:fs");
const configPath = process.argv[2];
const profileEmail = (process.argv[3] ?? "").trim().toLowerCase();
const wsUrl = process.argv[4] ?? "";
const pairingToken = process.argv[5] ?? "";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const existingEmail =
  typeof config.email === "string" ? config.email.trim().toLowerCase() : "";
if (
  existingEmail.length > 0 &&
  profileEmail.length > 0 &&
  existingEmail !== profileEmail
) {
  console.error(
    "Refusing to overwrite pairing token for " +
      existingEmail +
      " with account " +
      profileEmail +
      ".",
  );
  process.exit(1);
}
if (wsUrl.length > 0) {
  config.wsUrl = wsUrl;
}
if (pairingToken.length > 0) {
  config.pairingToken = pairingToken;
}
const defaults = {
  claudeCommand: "claude",
  codexCommand: "codex",
  cursorCommand: "cursor",
  antigravityCommand: "agy",
};
if (profileEmail.length > 0) {
  config.email = profileEmail;
}
for (const [key, value] of Object.entries(defaults)) {
  if (typeof config[key] !== "string" || config[key].length === 0) {
    config[key] = value;
  }
}
fs.writeFileSync(configPath, \`\${JSON.stringify(config, null, 2)}\\n\`);
NODE
`;
