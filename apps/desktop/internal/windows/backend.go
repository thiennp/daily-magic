package windows

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
	"github.com/thiennp/daily-magic/apps/desktop/internal/host"
)

// Backend drives AWL inside the user's WSL distro from a Windows tray binary.
// Health probes use the same localhost ports as Linux (WSL2 forwards localhost).
//
// No GOOS build tag: logic is unit-tested on Linux via an injectable Runner.
type Backend struct {
	// Distro is the WSL distro name (-d). Empty means the WSL default.
	Distro string
	// ExePath is the Windows tray path for autostart; empty uses os.Executable.
	ExePath string
	Runner  host.Runner
}

func (b Backend) runner() host.Runner {
	if b.Runner != nil {
		return b.Runner
	}
	return host.ExecRunner{Timeout: time.Duration(core.CommandTimeoutSeconds) * time.Second}
}

func (b Backend) wsl(ctx context.Context, script string) host.RunResult {
	name, args := WslBashLcArgs(b.Distro, script)
	return b.runner().Run(ctx, name, args...)
}

// DetectDefaultDistro runs `wsl -l -v` and returns the default distro name.
// Clear user-facing error when WSL is missing or has no distros.
func DetectDefaultDistro(ctx context.Context, runner host.Runner) (string, error) {
	if runner == nil {
		runner = host.ExecRunner{Timeout: time.Duration(core.CommandTimeoutSeconds) * time.Second}
	}
	name, args := WslListVerboseArgs()
	result := runner.Run(ctx, name, args...)
	out := DecodeWSLOutput(result.Stdout)
	errOut := DecodeWSLOutput(result.Stderr)

	if result.ExitCode < 0 || IsWSLNotInstalledOutput(result.Stdout, result.Stderr) {
		return "", FormatWSLMissing(JoinWSLDetail(result.Stdout, result.Stderr))
	}
	if result.ExitCode != 0 {
		detail := JoinWSLDetail(result.Stdout, result.Stderr)
		if detail == "" {
			detail = fmt.Sprintf("wsl.exe exit %d", result.ExitCode)
		}
		return "", FormatWSLMissing(detail)
	}

	if distro, ok := ParseDefaultDistro(out); ok {
		return distro, nil
	}
	names := ParseDistroNames(out)
	if len(names) == 0 {
		return "", FormatWSLMissing(strings.TrimSpace(out + "\n" + errOut))
	}
	// No "*" marker (unusual): use the first listed distro.
	return names[0], nil
}

// NewBackend detects the default WSL distro and returns a ready Backend.
func NewBackend(ctx context.Context, runner host.Runner) (Backend, error) {
	distro, err := DetectDefaultDistro(ctx, runner)
	if err != nil {
		return Backend{}, err
	}
	return Backend{Distro: distro, Runner: runner}, nil
}

// IsInstalled reports whether AWL + systemd unit exist inside WSL.
func (b Backend) IsInstalled() bool {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(core.CommandTimeoutSeconds)*time.Second)
	defer cancel()
	result := b.wsl(ctx, InstallCheckScript())
	return result.ExitCode == 0
}

// Start enables and starts the user unit inside WSL (persists across WSL restart).
func (b Backend) Start(ctx context.Context) error {
	result := b.wsl(ctx, SystemctlEnableNowScript())
	if result.ExitCode != 0 {
		return commandError("start", result)
	}
	return nil
}

// Stop disables and stops the user unit inside WSL.
func (b Backend) Stop(ctx context.Context) error {
	result := b.wsl(ctx, SystemctlDisableNowScript())
	if result.ExitCode != 0 {
		return commandError("stop", result)
	}
	return nil
}

// IsActive reports systemctl --user is-active inside WSL (used while Stopping).
func (b Backend) IsActive(ctx context.Context) (bool, error) {
	result := b.wsl(ctx, SystemctlIsActiveScript())
	if result.ExitCode == 0 {
		return true, nil
	}
	if result.ExitCode < 0 {
		return false, commandError("is-active", result)
	}
	return false, nil
}

// OpenStatus opens the local status page in the default Windows browser.
func (b Backend) OpenStatus(ctx context.Context) error {
	return b.open(ctx, core.StatusURL())
}

// OpenConnect opens the cloud Connect page in the default Windows browser.
func (b Backend) OpenConnect(ctx context.Context) error {
	return b.open(ctx, core.ConnectURL())
}

// OpenLogs opens the newest agent-witch.log via its Windows path, or returns
// core.NoLogFoundMessage when none exists.
func (b Backend) OpenLogs(ctx context.Context) (string, error) {
	result := b.wsl(ctx, NewestLogWindowsPathScript())
	if result.ExitCode < 0 {
		return "", commandError("logs", result)
	}
	path := TrimCommandOutput(result.Stdout)
	if path == "" {
		return core.NoLogFoundMessage, nil
	}
	if err := b.open(ctx, path); err != nil {
		return "", err
	}
	return "", nil
}

// Notify shows a short Windows balloon tip (best-effort; errors ignored by callers).
func (b Backend) Notify(ctx context.Context, title, body string) error {
	name, args := PowerShellNotifyArgs(title, body)
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("notify", result)
	}
	return nil
}

// EnableAutostart registers the tray exe in the per-user Run registry key.
func (b Backend) EnableAutostart(ctx context.Context) error {
	exe, err := b.exePath()
	if err != nil {
		return err
	}
	name, args := RegAddAutostartArgs(exe)
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("autostart-enable", result)
	}
	return nil
}

// DisableAutostart removes the per-user Run registry value.
func (b Backend) DisableAutostart(ctx context.Context) error {
	name, args := RegDeleteAutostartArgs()
	result := b.runner().Run(ctx, name, args...)
	// exit 1 often means value already absent — treat as success when stderr says so.
	if result.ExitCode == 0 {
		return nil
	}
	detail := strings.ToLower(JoinWSLDetail(result.Stdout, result.Stderr))
	if strings.Contains(detail, "unable to find") || strings.Contains(detail, "error: the system was unable to find") {
		return nil
	}
	return commandError("autostart-disable", result)
}

// IsAutostartEnabled reports whether the Run key value is present.
func (b Backend) IsAutostartEnabled(ctx context.Context) bool {
	name, args := RegQueryAutostartArgs()
	result := b.runner().Run(ctx, name, args...)
	return result.ExitCode == 0
}

func (b Backend) open(ctx context.Context, target string) error {
	name, args := CmdStartArgs(target)
	result := b.runner().Run(ctx, name, args...)
	if result.ExitCode != 0 {
		return commandError("open", result)
	}
	return nil
}

func (b Backend) exePath() (string, error) {
	if b.ExePath != "" {
		return b.ExePath, nil
	}
	exe, err := os.Executable()
	if err != nil {
		return "", fmt.Errorf("resolve executable: %w", err)
	}
	return exe, nil
}

func commandError(op string, result host.RunResult) error {
	msg := JoinWSLDetail(result.Stdout, result.Stderr)
	if msg == "" && result.Err != nil {
		msg = result.Err.Error()
	}
	if msg == "" {
		msg = fmt.Sprintf("exit %d", result.ExitCode)
	}
	return fmt.Errorf("%s failed: %s", op, msg)
}
