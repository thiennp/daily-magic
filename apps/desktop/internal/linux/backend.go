//go:build linux

package linux

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
	"github.com/thiennp/daily-magic/apps/desktop/internal/host"
)

// Backend drives AWI via systemd --user on Linux.
type Backend struct {
	Home     string
	Runner   host.Runner
	Exists   func(path string) bool
	ListLogs func(installDir string) []core.FileInfo
}

func (b Backend) home() string {
	if b.Home != "" {
		return b.Home
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	return home
}

func (b Backend) runner() host.Runner {
	if b.Runner != nil {
		return b.Runner
	}
	return host.ExecRunner{Timeout: time.Duration(core.CommandTimeoutSeconds) * time.Second}
}

func (b Backend) exists() func(string) bool {
	if b.Exists != nil {
		return b.Exists
	}
	return func(path string) bool {
		_, err := os.Stat(path)
		return err == nil
	}
}

// IsInstalled reports install dir + systemd unit present.
func (b Backend) IsInstalled() bool {
	return core.IsInstalled(b.home(), b.exists())
}

// Start enables and starts the user unit.
func (b Backend) Start(ctx context.Context) error {
	name, args := SystemctlEnableNowArgs()
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("start", result)
	}
	return nil
}

// Stop stops the user unit.
func (b Backend) Stop(ctx context.Context) error {
	name, args := SystemctlStopArgs()
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("stop", result)
	}
	return nil
}

// IsLaunchAtLoginEnabled reports systemctl --user is-enabled.
func (b Backend) IsLaunchAtLoginEnabled(ctx context.Context) bool {
	name, args := SystemctlIsEnabledArgs()
	result := b.runner().Run(ctx, name, args...)
	return result.ExitCode == 0 && strings.TrimSpace(result.Stdout) == "enabled"
}

// SetLaunchAtLogin enables or disables the user unit.
func (b Backend) SetLaunchAtLogin(ctx context.Context, enabled bool) error {
	var name string
	var args []string
	if enabled {
		name, args = SystemctlEnableArgs()
	} else {
		name, args = SystemctlDisableArgs()
	}
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("launch-at-login", result)
	}
	return nil
}

// OpenStatus opens the local status page.
func (b Backend) OpenStatus(ctx context.Context) error {
	return b.open(ctx, core.StatusURL())
}

// OpenConnect opens the cloud Connect page.
func (b Backend) OpenConnect(ctx context.Context) error {
	return b.open(ctx, core.ConnectURL())
}

// OpenLogs opens the newest agent-witch.log, or returns core.NoLogFoundMessage.
func (b Backend) OpenLogs(ctx context.Context) (string, error) {
	path := core.ResolveNewestMainLogPath(core.InstallDir(b.home()), b.ListLogs, b.exists())
	if path == "" {
		return core.NoLogFoundMessage, nil
	}
	if err := b.open(ctx, path); err != nil {
		return "", err
	}
	return "", nil
}

func (b Backend) open(ctx context.Context, target string) error {
	name, args := XdgOpenArgs(target)
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("open", result)
	}
	return nil
}

func commandError(op string, result host.RunResult) error {
	msg := strings.TrimSpace(result.Stderr)
	if msg == "" {
		msg = strings.TrimSpace(result.Stdout)
	}
	if msg == "" && result.Err != nil {
		msg = result.Err.Error()
	}
	if msg == "" {
		msg = fmt.Sprintf("exit %d", result.ExitCode)
	}
	return fmt.Errorf("%s failed: %s", op, msg)
}
