//go:build linux

package linux

import (
	"context"
	"path/filepath"
	"testing"
	"time"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
	"github.com/thiennp/daily-magic/apps/desktop/internal/host"
)

func TestBackendIsInstalled(t *testing.T) {
	home := "/tmp/home-test"
	exists := map[string]bool{
		filepath.Join(home, ".agent-witch"):                             true,
		filepath.Join(home, ".config/systemd/user/agent-witch.service"): true,
	}
	b := Backend{
		Home: home,
		Exists: func(p string) bool {
			return exists[p]
		},
	}
	if !b.IsInstalled() {
		t.Fatal("expected installed")
	}
	exists[filepath.Join(home, ".config/systemd/user/agent-witch.service")] = false
	if b.IsInstalled() {
		t.Fatal("expected not installed")
	}
}

func TestBackendStartStopUsesEnableDisableNow(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{ExitCode: 0}, {ExitCode: 0}}}
	b := Backend{Home: "/tmp/h", Runner: fake, Exists: func(string) bool { return true }}
	if err := b.Start(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := b.Stop(context.Background()); err != nil {
		t.Fatal(err)
	}
	if len(fake.Calls) != 2 {
		t.Fatalf("calls %v", fake.Calls)
	}
	if fake.Calls[0][0] != "systemctl" || fake.Calls[0][2] != "enable" || fake.Calls[0][3] != "--now" {
		t.Fatalf("start call %v", fake.Calls[0])
	}
	if fake.Calls[1][2] != "disable" || fake.Calls[1][3] != "--now" {
		t.Fatalf("stop must be disable --now, got %v", fake.Calls[1])
	}
}

func TestBackendOpenLogsNoLog(t *testing.T) {
	fake := &host.FakeRunner{}
	b := Backend{
		Home:   "/tmp/h",
		Runner: fake,
		Exists: func(string) bool { return false },
		ListLogs: func(string) []core.FileInfo {
			return nil
		},
	}
	msg, err := b.OpenLogs(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if msg != core.NoLogFoundMessage {
		t.Fatalf("got %q", msg)
	}
	if len(fake.Calls) != 0 {
		t.Fatalf("unexpected open: %v", fake.Calls)
	}
}

func TestBackendOpenLogsOpensNewest(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{ExitCode: 0}}}
	logPath := "/tmp/h/.agent-witch/profiles/a/logs/agent-witch.log"
	b := Backend{
		Home:   "/tmp/h",
		Runner: fake,
		Exists: func(string) bool { return true },
		ListLogs: func(string) []core.FileInfo {
			return []core.FileInfo{{Path: logPath, ModTime: time.Unix(100, 0)}}
		},
	}
	msg, err := b.OpenLogs(context.Background())
	if err != nil || msg != "" {
		t.Fatalf("msg=%q err=%v", msg, err)
	}
	if len(fake.Calls) != 1 || fake.Calls[0][0] != "xdg-open" || fake.Calls[0][1] != logPath {
		t.Fatalf("calls %v", fake.Calls)
	}
}

func TestBackendOpenStatusAndConnect(t *testing.T) {
	fake := &host.FakeRunner{Results: []host.RunResult{{ExitCode: 0}, {ExitCode: 0}}}
	b := Backend{Home: "/tmp/h", Runner: fake}
	if err := b.OpenStatus(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := b.OpenConnect(context.Background()); err != nil {
		t.Fatal(err)
	}
	if fake.Calls[0][1] != core.StatusURL() || fake.Calls[1][1] != core.ConnectURL() {
		t.Fatalf("calls %v", fake.Calls)
	}
}
