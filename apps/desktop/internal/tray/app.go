package tray

import (
	"context"
	"net/http"
	"sync"
	"time"

	"fyne.io/systray"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

// Platform is the OS-specific start/stop/open surface.
type Platform interface {
	IsInstalled() bool
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
	OpenStatus(ctx context.Context) error
	OpenConnect(ctx context.Context) error
	OpenLogs(ctx context.Context) (message string, err error)
}

// App is the systray companion controller.
type App struct {
	Platform Platform
	Client   core.HTTPDoer
	IconPNG  []byte

	mu             sync.Mutex
	state          core.RuntimeState
	errorMessage   string
	statusOverride string

	statusItem  *systray.MenuItem
	openConnect *systray.MenuItem
	installHint *systray.MenuItem
	startItem   *systray.MenuItem
	openStatus  *systray.MenuItem
	stopItem    *systray.MenuItem
	viewLogs    *systray.MenuItem
	quitItem    *systray.MenuItem
}

// Run blocks on the system tray event loop.
func (a *App) Run() {
	systray.Run(a.onReady, func() {})
}

func (a *App) onReady() {
	systray.SetTitle("Agent Witch Local")
	systray.SetTooltip("Agent Witch Local " + core.Version)
	if len(a.IconPNG) > 0 {
		systray.SetIcon(a.IconPNG)
	}

	a.statusItem = systray.AddMenuItem("…", "Status")
	a.statusItem.Disable()
	systray.AddSeparator()

	a.openConnect = systray.AddMenuItem("Open Connect this Mac…", "Open Connect this Mac")
	a.installHint = systray.AddMenuItem("Install hint", "Install via terminal")
	a.installHint.Disable()
	a.startItem = systray.AddMenuItem("Start Agent Witch", "Start Agent Witch")
	a.openStatus = systray.AddMenuItem("Open AgentWitch Local", "Open AgentWitch Local")
	a.stopItem = systray.AddMenuItem("Stop Agent Witch", "Stop Agent Witch")
	a.viewLogs = systray.AddMenuItem("View logs", "View logs")
	systray.AddSeparator()
	a.quitItem = systray.AddMenuItem("Quit", "Quit")

	a.refreshInstallAndHealth()
	a.applyMenu()

	go a.watchClicks()
	go a.pollLoop()
}

func (a *App) client() core.HTTPDoer {
	if a.Client != nil {
		return a.Client
	}
	return &http.Client{Timeout: time.Duration(core.HealthTimeoutSeconds) * time.Second}
}

func (a *App) pollLoop() {
	ticker := time.NewTicker(time.Duration(core.HealthPollIntervalSeconds) * time.Second)
	defer ticker.Stop()
	for range ticker.C {
		a.pollHealthOnce()
		a.applyMenu()
	}
}

func (a *App) refreshInstallAndHealth() {
	installed := a.Platform.IsInstalled()
	healthy := a.probeHealth()
	next := core.DeriveRuntimeState(installed, healthy)
	a.mu.Lock()
	a.state = next
	a.errorMessage = ""
	a.statusOverride = ""
	a.mu.Unlock()
}

func (a *App) pollHealthOnce() {
	a.mu.Lock()
	current := a.state
	a.mu.Unlock()

	if !a.Platform.IsInstalled() {
		a.mu.Lock()
		a.state = core.StateNotInstalled
		a.mu.Unlock()
		return
	}

	healthy := a.probeHealth()
	next, ok := core.PollHealthTransition(current, healthy)
	if !ok {
		return
	}
	a.mu.Lock()
	a.state = next
	if next != core.StateError {
		a.errorMessage = ""
	}
	a.statusOverride = ""
	a.mu.Unlock()
}

func (a *App) probeHealth() bool {
	ctx, cancel := core.NewHealthContext(context.Background())
	defer cancel()
	return core.ProbeHealth(ctx, a.client(), core.HealthURL())
}

func (a *App) snapshot() (core.RuntimeState, string, string) {
	a.mu.Lock()
	defer a.mu.Unlock()
	return a.state, a.errorMessage, a.statusOverride
}

func (a *App) setState(state core.RuntimeState, errMsg string) {
	a.mu.Lock()
	a.state = state
	a.errorMessage = errMsg
	a.statusOverride = ""
	a.mu.Unlock()
}

func (a *App) applyMenu() {
	state, errMsg, override := a.snapshot()
	model := core.DeriveMenu(state, errMsg)
	title := model.StatusTitle
	if override != "" {
		title = override
	}
	a.statusItem.SetTitle(title)

	for _, item := range []*systray.MenuItem{a.openConnect, a.installHint, a.startItem, a.openStatus, a.stopItem, a.viewLogs} {
		item.Hide()
	}

	show := func(item *systray.MenuItem, action core.MenuAction) {
		for _, row := range model.Items {
			if row.Action != action {
				continue
			}
			item.SetTitle(row.Title)
			item.Show()
			if row.Enabled {
				item.Enable()
			} else {
				item.Disable()
			}
			return
		}
	}

	show(a.openConnect, core.ActionOpenConnect)
	show(a.installHint, core.ActionInstallHint)
	show(a.startItem, core.ActionStart)
	show(a.openStatus, core.ActionOpenStatus)
	show(a.stopItem, core.ActionStop)
	show(a.viewLogs, core.ActionViewLogs)
}

func (a *App) watchClicks() {
	for {
		select {
		case <-a.openConnect.ClickedCh:
			a.withTimeout(func(ctx context.Context) { _ = a.Platform.OpenConnect(ctx) })
		case <-a.startItem.ClickedCh:
			a.runStart()
		case <-a.openStatus.ClickedCh:
			a.withTimeout(func(ctx context.Context) { _ = a.Platform.OpenStatus(ctx) })
		case <-a.stopItem.ClickedCh:
			a.runStop()
		case <-a.viewLogs.ClickedCh:
			a.runViewLogs()
		case <-a.quitItem.ClickedCh:
			systray.Quit()
			return
		}
	}
}

func (a *App) withTimeout(fn func(ctx context.Context)) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(core.CommandTimeoutSeconds)*time.Second)
	defer cancel()
	fn(ctx)
}

func (a *App) runStart() {
	a.setState(core.StateStarting, "")
	a.applyMenu()
	a.withTimeout(func(ctx context.Context) {
		if err := a.Platform.Start(ctx); err != nil {
			a.setState(core.StateError, err.Error())
			a.applyMenu()
			return
		}
		a.pollHealthOnce()
		a.applyMenu()
	})
}

func (a *App) runStop() {
	a.setState(core.StateStopping, "")
	a.applyMenu()
	a.withTimeout(func(ctx context.Context) {
		if err := a.Platform.Stop(ctx); err != nil {
			a.setState(core.StateError, err.Error())
			a.applyMenu()
			return
		}
		a.pollHealthOnce()
		a.applyMenu()
	})
}

func (a *App) runViewLogs() {
	a.withTimeout(func(ctx context.Context) {
		msg, err := a.Platform.OpenLogs(ctx)
		if err != nil {
			a.setState(core.StateError, err.Error())
			a.applyMenu()
			return
		}
		if msg != "" {
			a.mu.Lock()
			a.statusOverride = msg
			a.mu.Unlock()
			a.applyMenu()
		}
	})
}
