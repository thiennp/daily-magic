//go:build !linux

package main

import (
	"fmt"

	"github.com/thiennp/daily-magic/apps/desktop/internal/tray"
)

func newPlatform() (tray.Platform, error) {
	return nil, fmt.Errorf("this build only supports Linux (use the Linux package)")
}
