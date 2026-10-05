package linux

import "github.com/thiennp/daily-magic/apps/desktop/internal/core"

// These argv builders are pure and untagged so unit tests run on any GOOS.

func SystemctlEnableNowArgs() (string, []string) {
	return "systemctl", []string{"--user", "enable", "--now", core.SystemdUnitName}
}

func SystemctlStopArgs() (string, []string) {
	return "systemctl", []string{"--user", "stop", core.SystemdUnitName}
}

func SystemctlEnableArgs() (string, []string) {
	return "systemctl", []string{"--user", "enable", core.SystemdUnitName}
}

func SystemctlDisableArgs() (string, []string) {
	return "systemctl", []string{"--user", "disable", core.SystemdUnitName}
}

func SystemctlIsEnabledArgs() (string, []string) {
	return "systemctl", []string{"--user", "is-enabled", core.SystemdUnitName}
}

func XdgOpenArgs(target string) (string, []string) {
	return "xdg-open", []string{target}
}
