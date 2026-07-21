export const buildAgentWitchInstallScriptConfigWarnOtherProfiles =
  (): string => `
"\${NODE_BIN}" -e "
const fs = require('node:fs');
const path = require('node:path');
const installDir = process.argv[1];
const profileEmail = (process.argv[2] || '').trim().toLowerCase();
const profilesDir = path.join(installDir, 'profiles');
const other = [];
if (fs.existsSync(profilesDir)) {
  for (const entry of fs.readdirSync(profilesDir)) {
    const full = path.join(profilesDir, entry);
    if (!fs.statSync(full).isDirectory()) continue;
    if (profileEmail.length > 0 && entry.toLowerCase() === profileEmail) continue;
    other.push(entry);
  }
}
if (fs.existsSync(path.join(installDir, 'config.json')) && profileEmail.length > 0) {
  other.push('(legacy install)');
}
if (other.length > 0) {
  console.error('Note: other Agent Witch account(s) already on this Mac: ' + other.join(', ') + '.');
  console.error('Your account is added as a separate profile and will not replace theirs.');
}
" "\${INSTALL_DIR}" "\${PROFILE_EMAIL}" || true
`;
