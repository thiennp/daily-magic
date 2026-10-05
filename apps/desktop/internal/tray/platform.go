package tray

import "context"

// Platform is the OS-specific start/stop/open surface.
type Platform interface {
	IsInstalled() bool
	IsActive(ctx context.Context) (bool, error)
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
	OpenStatus(ctx context.Context) error
	OpenConnect(ctx context.Context) error
	OpenURL(ctx context.Context, rawURL string) error
	OpenLogs(ctx context.Context) (message string, err error)
}
