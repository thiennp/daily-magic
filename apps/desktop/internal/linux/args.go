package linux

import "github.com/thiennp/daily-magic/apps/desktop/internal/core"

// Pure argv builders (untagged) so unit tests run on any GOOS.
// Start/Stop also control login persistence: enable --now / disable --now.

func SystemctlEnableNowArgs() (string, []string) {
	return "systemctl", []string{"--user", "enable", "--now", core.SystemdUnitName}
}

func SystemctlDisableNowArgs() (string, []string) {
	return "systemctl", []string{"--user", "disable", "--now", core.SystemdUnitName}
}

// SystemctlIsActiveArgs checks the unit; exit 0 means active.
func SystemctlIsActiveArgs() (string, []string) {
	return "systemctl", []string{"--user", "is-active", "--quiet", core.SystemdUnitName}
}

func XdgOpenArgs(target string) (string, []string) {
	return "xdg-open", []string{target}
}
