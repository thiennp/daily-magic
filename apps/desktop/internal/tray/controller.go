package tray

import (
	"context"
	"net/http"
	"sync"
	"time"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

// Controller owns the tray state. Every state write goes through dispatch,
// which calls the pure core.ApplyStateTransition under the mutex. Side effects
// (systemctl, health probes, menu updates) happen outside the pure function.
type Controller struct {
	Platform Platform
	Client   core.HTTPDoer
	Now      func() time.Time
	OnChange func()

	mu             sync.Mutex
	machine        core.Machine
	statusOverride string
}

// Snapshot returns the current machine and transient status message.
func (c *Controller) Snapshot() (core.Machine, string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.machine, c.statusOverride
}

// ShowMessage sets a transient status line (does not change state).
func (c *Controller) ShowMessage(message string) {
	c.mu.Lock()
	c.statusOverride = message
	c.mu.Unlock()
	c.notify()
}

// Poll probes install/health (and is-active while Stopping) and applies the
// result only if no transition happened since the poll started.
func (c *Controller) Poll(ctx context.Context) {
	started, _ := c.Snapshot()
	installed := c.Platform.IsInstalled()
	healthy := installed && c.probeHealth(ctx)
	active := false
	if installed && started.State == core.StateStopping {
		var err error
		if active, err = c.Platform.IsActive(ctx); err != nil {
			active = true // unknown: keep waiting; the deadline moves to Error
		}
	}
	_, _ = c.dispatch(core.Probed(c.now(), started.Generation, installed, healthy, active))
}

// Start runs Starting -> systemctl --user enable --now -> poll.
func (c *Controller) Start(ctx context.Context) {
	c.runCommand(ctx, core.StartRequested(c.now()), c.Platform.Start)
}

// Stop runs Stopping -> systemctl --user disable --now -> poll.
func (c *Controller) Stop(ctx context.Context) {
	c.runCommand(ctx, core.StopRequested(c.now()), c.Platform.Stop)
}

func (c *Controller) runCommand(ctx context.Context, request core.Event, command func(context.Context) error) {
	requested, err := c.dispatch(request)
	if err != nil {
		return
	}
	if err := command(ctx); err != nil {
		_, _ = c.dispatch(core.CommandFailed(c.now(), requested.Generation, err.Error()))
		return
	}
	c.Poll(ctx)
}

// dispatch is the only place the controller's machine is written.
func (c *Controller) dispatch(event core.Event) (core.Machine, error) {
	c.mu.Lock()
	next, err := core.ApplyStateTransition(c.machine, event)
	if err == nil {
		c.machine = next
		c.statusOverride = ""
	}
	c.mu.Unlock()
	if err == nil {
		c.notify()
	}
	return next, err
}

func (c *Controller) notify() {
	if c.OnChange != nil {
		c.OnChange()
	}
}

func (c *Controller) now() time.Time {
	if c.Now != nil {
		return c.Now()
	}
	return time.Now()
}

func (c *Controller) probeHealth(parent context.Context) bool {
	ctx, cancel := core.NewHealthContext(parent)
	defer cancel()
	client := c.Client
	if client == nil {
		client = &http.Client{Timeout: time.Duration(core.HealthTimeoutSeconds) * time.Second}
	}
	return core.ProbeHealth(ctx, client, core.HealthURL())
}
