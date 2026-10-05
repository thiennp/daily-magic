package windows

import (
	"fmt"
	"strings"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

// Pure argv builders (untagged) so unit tests run on any GOOS.
// The Windows tray drives AWL inside the user's WSL distro via wsl.exe.

const (
	WslExe     = "wsl.exe"
	CmdExe     = "cmd.exe"
	RegExe     = "reg.exe"
	Powershell = "powershell.exe"

	// AutostartRunValue is the HKCU Run key value name for the tray binary.
	AutostartRunValue = "AgentWitchLocal"
	// AutostartRunKey is the per-user Run registry key (simplest documented
	// tray autostart; no Startup-folder .lnk/COM required).
	AutostartRunKey = `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
)

// WslListVerboseArgs lists distros (default marked with *). Output is often UTF-16LE.
func WslListVerboseArgs() (string, []string) {
	return WslExe, []string{"-l", "-v"}
}

// WslBashLcArgs runs a bash -lc script in WSL. Empty distro uses the default.
func WslBashLcArgs(distro, script string) (string, []string) {
	args := make([]string, 0, 6)
	if distro != "" {
		args = append(args, "-d", distro)
	}
	args = append(args, "-e", "bash", "-lc", script)
	return WslExe, args
}

// InstallCheckScript exits 0 when ~/.agent-witch and the systemd unit exist.
func InstallCheckScript() string {
	return fmt.Sprintf(
		`test -d "$HOME/%s" && test -f "$HOME/%s/%s"`,
		core.InstallDirName, core.SystemdUserDir, core.SystemdUnitName,
	)
}

// SystemctlEnableNowScript starts AWL inside WSL (persists across WSL reboot).
func SystemctlEnableNowScript() string {
	return fmt.Sprintf("systemctl --user enable --now %s", core.SystemdUnitName)
}

// SystemctlDisableNowScript stops AWL and clears login persistence inside WSL.
func SystemctlDisableNowScript() string {
	return fmt.Sprintf("systemctl --user disable --now %s", core.SystemdUnitName)
}

// SystemctlIsActiveScript exits 0 when the unit is active.
func SystemctlIsActiveScript() string {
	return fmt.Sprintf("systemctl --user is-active --quiet %s", core.SystemdUnitName)
}

// NewestLogWindowsPathScript prints the newest agent-witch.log as a Windows path
// (via wslpath -w), or prints nothing if no log exists.
func NewestLogWindowsPathScript() string {
	return strings.Join([]string{
		`set -e`,
		`newest=""`,
		`if [ -d "$HOME/.agent-witch/profiles" ]; then`,
		`  newest=$(find "$HOME/.agent-witch/profiles" -type f -name agent-witch.log 2>/dev/null | xargs ls -t 2>/dev/null | head -n 1 || true)`,
		`fi`,
		`if [ -z "$newest" ] && [ -f "$HOME/.agent-witch/logs/agent-witch.log" ]; then`,
		`  newest="$HOME/.agent-witch/logs/agent-witch.log"`,
		`fi`,
		`if [ -n "$newest" ]; then wslpath -w "$newest"; fi`,
	}, "\n")
}

// CmdStartArgs opens a URL or file with the Windows file association
// (`start` treats the first quoted arg as the window title).
func CmdStartArgs(target string) (string, []string) {
	return CmdExe, []string{"/c", "start", "", target}
}

// RegAddAutostartArgs writes the per-user Run key so the tray starts at login.
func RegAddAutostartArgs(exePath string) (string, []string) {
	return RegExe, []string{
		"add", AutostartRunKey,
		"/v", AutostartRunValue,
		"/t", "REG_SZ",
		"/d", exePath,
		"/f",
	}
}

// RegDeleteAutostartArgs removes the per-user Run key value.
func RegDeleteAutostartArgs() (string, []string) {
	return RegExe, []string{
		"delete", AutostartRunKey,
		"/v", AutostartRunValue,
		"/f",
	}
}

// RegQueryAutostartArgs checks whether the Run key value exists.
func RegQueryAutostartArgs() (string, []string) {
	return RegExe, []string{
		"query", AutostartRunKey,
		"/v", AutostartRunValue,
	}
}

// PowerShellNotifyArgs shows a short balloon tip (no extra Go dependencies).
func PowerShellNotifyArgs(title, body string) (string, []string) {
	// Escape single quotes for PowerShell single-quoted strings.
	esc := func(s string) string {
		return strings.ReplaceAll(s, "'", "''")
	}
	script := fmt.Sprintf(
		"Add-Type -AssemblyName System.Windows.Forms; "+
			"Add-Type -AssemblyName System.Drawing; "+
			"$n = New-Object System.Windows.Forms.NotifyIcon; "+
			"$n.Icon = [System.Drawing.SystemIcons]::Information; "+
			"$n.BalloonTipTitle = '%s'; $n.BalloonTipText = '%s'; "+
			"$n.Visible = $true; $n.ShowBalloonTip(3000); "+
			"Start-Sleep -Milliseconds 3200; $n.Dispose()",
		esc(title), esc(body),
	)
	return Powershell, []string{"-NoProfile", "-NonInteractive", "-Command", script}
}
