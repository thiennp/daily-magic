//go:build windows

package main

import (
	"context"
	"fmt"
	"time"

	"github.com/thiennp/daily-magic/apps/desktop/assets"
	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
	"github.com/thiennp/daily-magic/apps/desktop/internal/host"
	"github.com/thiennp/daily-magic/apps/desktop/internal/tray"
	"github.com/thiennp/daily-magic/apps/desktop/internal/windows"
)

func init() {
	iconPNG = assets.IconPNG
}

func newPlatform() (tray.Platform, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(core.CommandTimeoutSeconds)*time.Second)
	defer cancel()

	runner := host.ExecRunner{Timeout: time.Duration(core.CommandTimeoutSeconds) * time.Second}
	backend, err := windows.NewBackend(ctx, runner)
	if err != nil {
		return nil, err
	}

	// Best-effort tray autostart via HKCU Run (simplest documented option).
	// Failures are non-fatal: the user can still use the tray this session.
	if err := backend.EnableAutostart(ctx); err != nil {
		_ = backend.Notify(ctx, "Agent Witch Local", fmt.Sprintf("Could not enable login autostart: %v", err))
	}

	return backend, nil
}
