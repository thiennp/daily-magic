/** Single quotes: nothing inside is expanded ($(...), backticks, $VAR), only ' needs closing. */
const quoteBashSingle = (value: string): string =>
  `'${value.replace(/'/g, "'\\''")}'`;

export const buildAgentWitchInstallScriptPresetBlock = (input: {
  readonly presetPairingToken?: string;
  readonly presetProfileEmail?: string;
}): string => {
  const presetPairingToken = input.presetPairingToken?.trim() ?? "";
  const presetProfileEmail =
    input.presetProfileEmail?.trim().toLowerCase() ?? "";

  if (presetPairingToken.length === 0 && presetProfileEmail.length === 0) {
    return "";
  }

  return `PRESET_PAIRING_TOKEN=${quoteBashSingle(presetPairingToken)}
PRESET_PROFILE_EMAIL=${quoteBashSingle(presetProfileEmail)}
`;
};
