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
// Start = enable --now (survives re-login). Stop = disable --now (does not).
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

// Start enables and starts the user unit (persists across login).
func (b Backend) Start(ctx context.Context) error {
	name, args := SystemctlEnableNowArgs()
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("start", result)
	}
	return nil
}

// Stop disables and stops the user unit so it does not return after re-login.
func (b Backend) Stop(ctx context.Context) error {
	name, args := SystemctlDisableNowArgs()
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("stop", result)
	}
	return nil
}

// IsActive reports `systemctl --user is-active` for the unit (used while Stopping).
// A non-zero exit means inactive; failing to run systemctl at all is an error.
func (b Backend) IsActive(ctx context.Context) (bool, error) {
	name, args := SystemctlIsActiveArgs()
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode == 0 {
		return true, nil
	}
	if result.ExitCode < 0 {
		return false, commandError("is-active", result)
	}
	return false, nil
}

// OpenStatus opens the local status page.
func (b Backend) OpenStatus(ctx context.Context) error {
	return b.open(ctx, core.StatusURL())
}

// OpenConnect opens the cloud Connect page.
func (b Backend) OpenConnect(ctx context.Context) error {
	return b.open(ctx, core.ConnectURL())
}

// OpenURL opens an arbitrary URL (e.g. a GitHub release page).
func (b Backend) OpenURL(ctx context.Context, rawURL string) error {
	return b.open(ctx, rawURL)
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
