//go:build linux

package main

import (
	"github.com/thiennp/daily-magic/apps/desktop/assets"
	"github.com/thiennp/daily-magic/apps/desktop/internal/linux"
	"github.com/thiennp/daily-magic/apps/desktop/internal/tray"
)

func init() {
	iconPNG = assets.IconPNG
}

func newPlatform() (tray.Platform, error) {
	return linux.Backend{}, nil
}
