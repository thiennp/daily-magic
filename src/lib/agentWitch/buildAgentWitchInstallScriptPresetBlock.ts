const escapeBashDoubleQuoted = (value: string): string =>
  value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

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

  return `PRESET_PAIRING_TOKEN="${escapeBashDoubleQuoted(presetPairingToken)}"
PRESET_PROFILE_EMAIL="${escapeBashDoubleQuoted(presetProfileEmail)}"
`;
};
