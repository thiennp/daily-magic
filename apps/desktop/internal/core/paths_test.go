package core

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestInstallPaths(t *testing.T) {
	if InstallDir("/home/u") != "/home/u/.agent-witch" {
		t.Fatal(InstallDir("/home/u"))
	}
	if SystemdUnitPath("/home/u") != "/home/u/.config/systemd/user/agent-witch.service" {
		t.Fatal(SystemdUnitPath("/home/u"))
	}
}

func TestIsInstalled(t *testing.T) {
	exists := map[string]bool{
		"/home/u/.agent-witch":                             true,
		"/home/u/.config/systemd/user/agent-witch.service": true,
	}
	check := func(p string) bool { return exists[p] }
	if !IsInstalled("/home/u", check) {
		t.Fatal("expected installed")
	}
	exists["/home/u/.config/systemd/user/agent-witch.service"] = false
	if IsInstalled("/home/u", check) {
		t.Fatal("expected not installed without unit")
	}
}

func TestResolveNewestMainLogPathPrefersNewestProfile(t *testing.T) {
	root := t.TempDir()
	older := filepath.Join(root, "profiles", "a@x", "logs")
	newer := filepath.Join(root, "profiles", "b@x", "logs")
	if err := os.MkdirAll(older, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(newer, 0o755); err != nil {
		t.Fatal(err)
	}
	olderLog := filepath.Join(older, MainLogFileName)
	newerLog := filepath.Join(newer, MainLogFileName)
	if err := os.WriteFile(olderLog, []byte("old"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(newerLog, []byte("new"), 0o644); err != nil {
		t.Fatal(err)
	}
	oldTime := time.Unix(1000, 0)
	newTime := time.Unix(2000, 0)
	_ = os.Chtimes(olderLog, oldTime, oldTime)
	_ = os.Chtimes(newerLog, newTime, newTime)

	got := ResolveNewestMainLogPath(root, nil, nil)
	if got != newerLog {
		t.Fatalf("got %s want %s", got, newerLog)
	}
}

func TestResolveNewestMainLogPathLegacyFallback(t *testing.T) {
	root := t.TempDir()
	legacyDir := filepath.Join(root, LogsDirName)
	if err := os.MkdirAll(legacyDir, 0o755); err != nil {
		t.Fatal(err)
	}
	legacyLog := filepath.Join(legacyDir, MainLogFileName)
	if err := os.WriteFile(legacyLog, []byte("legacy"), 0o644); err != nil {
		t.Fatal(err)
	}
	got := ResolveNewestMainLogPath(root, nil, nil)
	if got != legacyLog {
		t.Fatalf("got %s want %s", got, legacyLog)
	}
}

func TestResolveNewestMainLogPathNone(t *testing.T) {
	root := t.TempDir()
	if got := ResolveNewestMainLogPath(root, nil, nil); got != "" {
		t.Fatalf("expected empty, got %s", got)
	}
}
