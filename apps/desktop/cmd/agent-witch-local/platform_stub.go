//go:build !linux && !windows

package main

import (
	"fmt"
	"runtime"

	"github.com/thiennp/daily-magic/apps/desktop/internal/tray"
)

func newPlatform() (tray.Platform, error) {
	return nil, fmt.Errorf("this build only supports Linux and Windows (got %s)", runtime.GOOS)
}
