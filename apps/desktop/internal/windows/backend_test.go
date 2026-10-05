package windows

import (
	"context"
	"reflect"
	"strings"
	"testing"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
	"github.com/thiennp/daily-magic/apps/desktop/internal/host"
)

func TestDetectDefaultDistroOK(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{
		ExitCode: 0,
		Stdout: "  NAME            STATE           VERSION\n" +
			"* Ubuntu          Running         2\n",
	}}}
	distro, err := DetectDefaultDistro(context.Background(), fake)
	if err != nil || distro != "Ubuntu" {
		t.Fatalf("distro=%q err=%v", distro, err)
	}
	if fake.Calls[0][0] != WslExe || fake.Calls[0][1] != "-l" {
		t.Fatalf("calls %v", fake.Calls)
	}
}

func TestDetectDefaultDistroMissing(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{
		ExitCode: -1,
		Stderr:   "Windows Subsystem for Linux has no installed distributions.",
		Err:      context.DeadlineExceeded, // placeholder; ExitCode < 0 matters
	}}}
	_, err := DetectDefaultDistro(context.Background(), fake)
	if err == nil || !strings.Contains(err.Error(), "WSL is not available") {
		t.Fatalf("err=%v", err)
	}
}

func TestDetectDefaultDistroFallsBackToFirst(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{
		ExitCode: 0,
		Stdout: "  NAME            STATE           VERSION\n" +
			"  Debian          Running         2\n",
	}}}
	distro, err := DetectDefaultDistro(context.Background(), fake)
	if err != nil || distro != "Debian" {
		t.Fatalf("distro=%q err=%v", distro, err)
	}
}

func TestNewBackend(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{
		ExitCode: 0,
		Stdout:   "* Ubuntu  Running  2\n",
	}}}
	b, err := NewBackend(context.Background(), fake)
	if err != nil || b.Distro != "Ubuntu" {
		t.Fatalf("%+v %v", b, err)
	}
}

func TestBackendStartStopIsActive(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{
		{ExitCode: 0}, // start
		{ExitCode: 0}, // stop
		{ExitCode: 0}, // is-active active
		{ExitCode: 3}, // is-active inactive
		{ExitCode: -1, Stderr: "wsl broke"},
	}}
	b := Backend{Distro: "Ubuntu", Runner: fake}

	if err := b.Start(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := b.Stop(context.Background()); err != nil {
		t.Fatal(err)
	}
	if active, err := b.IsActive(context.Background()); err != nil || !active {
		t.Fatalf("active: %v %v", active, err)
	}
	if active, err := b.IsActive(context.Background()); err != nil || active {
		t.Fatalf("inactive: %v %v", active, err)
	}
	if _, err := b.IsActive(context.Background()); err == nil {
		t.Fatal("expected error")
	}

	// start used -d Ubuntu and enable --now
	if got := strings.Join(fake.Calls[0], " "); !strings.Contains(got, "-d Ubuntu") || !strings.Contains(got, "enable --now") {
		t.Fatalf("start call %v", fake.Calls[0])
	}
	if got := strings.Join(fake.Calls[1], " "); !strings.Contains(got, "disable --now") {
		t.Fatalf("stop call %v", fake.Calls[1])
	}
}

func TestBackendIsInstalled(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{ExitCode: 0}, {ExitCode: 1}}}
	b := Backend{Distro: "Ubuntu", Runner: fake}
	if !b.IsInstalled() {
		t.Fatal("expected installed")
	}
	if b.IsInstalled() {
		t.Fatal("expected not installed")
	}
	if !strings.Contains(strings.Join(fake.Calls[0], " "), InstallCheckScript()) {
		t.Fatalf("call %v", fake.Calls[0])
	}
}

func TestBackendOpenStatusConnectLogs(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{
		{ExitCode: 0}, // open status
		{ExitCode: 0}, // open connect
		{ExitCode: 0, Stdout: `\\wsl$\Ubuntu\home\u\.agent-witch\logs\agent-witch.log`}, // log path
		{ExitCode: 0},                 // open log
		{ExitCode: 0, Stdout: "  \n"}, // empty log path
	}}
	b := Backend{Distro: "Ubuntu", Runner: fake}

	if err := b.OpenStatus(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := b.OpenConnect(context.Background()); err != nil {
		t.Fatal(err)
	}
	if fake.Calls[0][0] != CmdExe || fake.Calls[0][len(fake.Calls[0])-1] != core.StatusURL() {
		t.Fatalf("status %v", fake.Calls[0])
	}
	if fake.Calls[1][len(fake.Calls[1])-1] != core.ConnectURL() {
		t.Fatalf("connect %v", fake.Calls[1])
	}

	msg, err := b.OpenLogs(context.Background())
	if err != nil || msg != "" {
		t.Fatalf("msg=%q err=%v", msg, err)
	}
	if fake.Calls[3][0] != CmdExe {
		t.Fatalf("open log %v", fake.Calls[3])
	}

	msg, err = b.OpenLogs(context.Background())
	if err != nil || msg != core.NoLogFoundMessage {
		t.Fatalf("msg=%q err=%v", msg, err)
	}
}

func TestBackendAutostartAndNotify(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{
		{ExitCode: 0}, // reg add
		{ExitCode: 0}, // reg query
		{ExitCode: 1, Stderr: "ERROR: The system was unable to find the specified registry key or value."}, // delete missing
		{ExitCode: 0}, // notify
	}}
	b := Backend{Distro: "Ubuntu", Runner: fake, ExePath: `C:\Tools\AgentWitchLocal.exe`}

	if err := b.EnableAutostart(context.Background()); err != nil {
		t.Fatal(err)
	}
	if !b.IsAutostartEnabled(context.Background()) {
		t.Fatal("expected enabled")
	}
	if err := b.DisableAutostart(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := b.Notify(context.Background(), "Agent Witch Local", "Started"); err != nil {
		t.Fatal(err)
	}
	if fake.Calls[0][0] != RegExe || fake.Calls[0][1] != "add" {
		t.Fatalf("add %v", fake.Calls[0])
	}
	if fake.Calls[3][0] != Powershell {
		t.Fatalf("notify %v", fake.Calls[3])
	}
}

func TestBackendStartError(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{ExitCode: 1, Stderr: "unit not found"}}}
	b := Backend{Distro: "Ubuntu", Runner: fake}
	err := b.Start(context.Background())
	if err == nil || !strings.Contains(err.Error(), "start failed") {
		t.Fatalf("err=%v", err)
	}
}

func TestBackendOpenURLValidReleasePage(t *testing.T) {
	const releaseURL = "https://github.com/thiennp/daily-magic/releases/tag/awl-windows-v0.2.0"
	fake := &host.FakeRunner{Results: []host.RunResult{{ExitCode: 0}}}
	b := Backend{Distro: "Ubuntu", Runner: fake}

	if err := b.OpenURL(context.Background(), releaseURL); err != nil {
		t.Fatal(err)
	}
	want := [][]string{{CmdExe, "/c", "start", "", releaseURL}}
	if !reflect.DeepEqual(fake.Calls, want) {
		t.Fatalf("calls %v want %v", fake.Calls, want)
	}
}

func TestBackendOpenURLRejectsUnsafe(t *testing.T) {
	tests := []struct {
		name    string
		rawURL  string
		wantErr string
	}{
		{"empty", "", "empty URL"},
		{"http scheme", "http://github.com/thiennp/daily-magic/releases", "scheme \"http\" not allowed"},
		{"non-github host", "https://evil.example/thiennp/daily-magic/releases", "host \"evil.example\" not allowed"},
		{"github lookalike host", "https://github.com.evil.example/releases", "host \"github.com.evil.example\" not allowed"},
		{"host with port", "https://github.com:443/thiennp/daily-magic", "host \"github.com:443\" not allowed"},
		{"userinfo", "https://user@github.com/thiennp/daily-magic", "host \"github.com\" not allowed"},
		{"ampersand", "https://github.com/thiennp/daily-magic/releases?a=1&calc.exe", "character '&' not allowed"},
		{"caret", "https://github.com/thiennp/daily-magic/releases^x", "character '^' not allowed"},
		{"percent", "https://github.com/thiennp/daily-magic/releases/%PATH%", "character '%' not allowed"},
		{"pipe", "https://github.com/thiennp|calc", "character '|' not allowed"},
		{"double quote", "https://github.com/thiennp\"x", "character '\"' not allowed"},
		{"space", "https://github.com/thiennp daily-magic", "whitespace, control or non-ASCII"},
		{"newline", "https://github.com/thiennp\ncalc", "whitespace, control or non-ASCII"},
		{"non-ascii", "https://github.com/thi\u00e9n", "whitespace, control or non-ASCII"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fake := &host.FakeRunner{}
			b := Backend{Distro: "Ubuntu", Runner: fake}

			err := b.OpenURL(context.Background(), tt.rawURL)
			if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
				t.Fatalf("err=%v want substring %q", err, tt.wantErr)
			}
			if len(fake.Calls) != 0 {
				t.Fatalf("runner called: %v", fake.Calls)
			}
		})
	}
}
