package windows

import (
	"reflect"
	"strings"
	"testing"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

func TestWslBashLcArgs(t *testing.T) {
	tests := []struct {
		name   string
		distro string
		script string
		want   []string
	}{
		{
			name:   "default distro",
			distro: "",
			script: "echo hi",
			want:   []string{"-e", "bash", "-lc", "echo hi"},
		},
		{
			name:   "named distro",
			distro: "Ubuntu",
			script: "systemctl --user status x",
			want:   []string{"-d", "Ubuntu", "-e", "bash", "-lc", "systemctl --user status x"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			exe, args := WslBashLcArgs(tt.distro, tt.script)
			if exe != WslExe {
				t.Fatalf("exe %s", exe)
			}
			if !reflect.DeepEqual(args, tt.want) {
				t.Fatalf("args %v want %v", args, tt.want)
			}
		})
	}
}

func TestWslListAndSystemctlScripts(t *testing.T) {
	exe, args := WslListVerboseArgs()
	if exe != WslExe || !reflect.DeepEqual(args, []string{"-l", "-v"}) {
		t.Fatalf("%s %v", exe, args)
	}
	if !strings.Contains(InstallCheckScript(), core.InstallDirName) {
		t.Fatal(InstallCheckScript())
	}
	if !strings.Contains(SystemctlEnableNowScript(), "enable --now "+core.SystemdUnitName) {
		t.Fatal(SystemctlEnableNowScript())
	}
	if !strings.Contains(SystemctlDisableNowScript(), "disable --now "+core.SystemdUnitName) {
		t.Fatal(SystemctlDisableNowScript())
	}
	if !strings.Contains(SystemctlIsActiveScript(), "is-active --quiet "+core.SystemdUnitName) {
		t.Fatal(SystemctlIsActiveScript())
	}
	if !strings.Contains(NewestLogWindowsPathScript(), "wslpath -w") {
		t.Fatal(NewestLogWindowsPathScript())
	}
}

func TestCmdStartAndRegArgs(t *testing.T) {
	exe, args := CmdStartArgs("http://example")
	if exe != CmdExe || !reflect.DeepEqual(args, []string{"/c", "start", "", "http://example"}) {
		t.Fatalf("%s %v", exe, args)
	}
	exe, args = RegAddAutostartArgs(`C:\AgentWitchLocal.exe`)
	if exe != RegExe || args[0] != "add" || args[1] != AutostartRunKey || args[3] != AutostartRunValue {
		t.Fatalf("%s %v", exe, args)
	}
	if args[len(args)-3] != "/d" || args[len(args)-2] != `C:\AgentWitchLocal.exe` || args[len(args)-1] != "/f" {
		t.Fatalf("add args %v", args)
	}
	exe, args = RegDeleteAutostartArgs()
	if exe != RegExe || args[0] != "delete" || args[3] != AutostartRunValue {
		t.Fatalf("%s %v", exe, args)
	}
	exe, args = RegQueryAutostartArgs()
	if exe != RegExe || args[0] != "query" {
		t.Fatalf("%s %v", exe, args)
	}
}

func TestPowerShellNotifyArgs(t *testing.T) {
	exe, args := PowerShellNotifyArgs("Title's tip", "Body text")
	if exe != Powershell {
		t.Fatal(exe)
	}
	if len(args) != 4 || args[0] != "-NoProfile" {
		t.Fatalf("%v", args)
	}
	script := args[3]
	if !strings.Contains(script, "Title''s tip") {
		t.Fatalf("escape: %s", script)
	}
	if !strings.Contains(script, "ShowBalloonTip") {
		t.Fatalf("missing balloon: %s", script)
	}
}
