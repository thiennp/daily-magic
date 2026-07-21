/** Separates hostname from macOS username in install device_label. */
export const AGENT_WITCH_INSTALL_DEVICE_LABEL_SEPARATOR = "#";

export const buildAgentWitchInstallDeviceLabel = (
  hostname: string,
  macOsUsername: string,
): string => {
  const host = hostname.trim();
  const user = macOsUsername.trim().toLowerCase();
  if (host.length === 0) {
    return "";
  }
  if (user.length === 0) {
    return host;
  }

  const parsed = parseAgentWitchInstallDeviceLabel(host);
  if (parsed.macOsUsername !== null) {
    return `${parsed.hostname}${AGENT_WITCH_INSTALL_DEVICE_LABEL_SEPARATOR}${user}`;
  }

  return `${host}${AGENT_WITCH_INSTALL_DEVICE_LABEL_SEPARATOR}${user}`;
};

export const parseAgentWitchInstallDeviceLabel = (
  deviceLabel: string,
): {
  readonly hostname: string;
  readonly macOsUsername: string | null;
} => {
  const trimmed = deviceLabel.trim();
  if (trimmed.length === 0) {
    return { hostname: "", macOsUsername: null };
  }

  const separatorIndex = trimmed.lastIndexOf(
    AGENT_WITCH_INSTALL_DEVICE_LABEL_SEPARATOR,
  );
  if (separatorIndex <= 0 || separatorIndex >= trimmed.length - 1) {
    return { hostname: trimmed, macOsUsername: null };
  }

  const hostname = trimmed.slice(0, separatorIndex).trim();
  const macOsUsername = trimmed
    .slice(separatorIndex + 1)
    .trim()
    .toLowerCase();
  if (hostname.length === 0 || macOsUsername.length === 0) {
    return { hostname: trimmed, macOsUsername: null };
  }

  return { hostname, macOsUsername };
};

export const isCompositeAgentWitchInstallDeviceLabel = (
  deviceLabel: string,
): boolean =>
  parseAgentWitchInstallDeviceLabel(deviceLabel).macOsUsername !== null;
