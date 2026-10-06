package tray

import (
	"context"
	"time"

	"fyne.io/systray"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

// App is the systray UI; state lives in Controller.
type App struct {
	Platform Platform
	Client   core.HTTPDoer
	IconPNG  []byte
	// TagPrefix defaults to core.TagPrefixLinux when empty.
	TagPrefix string

	ctrl *Controller

	statusItem  *systray.MenuItem
	openConnect *systray.MenuItem
	installHint *systray.MenuItem
	startItem   *systray.MenuItem
	openStatus  *systray.MenuItem
	stopItem    *systray.MenuItem
	viewLogs    *systray.MenuItem
	updateItem  *systray.MenuItem
	quitItem    *systray.MenuItem
}

// Run blocks on the system tray event loop.
func (a *App) Run() {
	systray.Run(a.onReady, func() {})
}

func (a *App) onReady() {
	systray.SetTitle("AgentWitch Local")
	systray.SetTooltip("AgentWitch Local " + core.Version)
	if len(a.IconPNG) > 0 {
		systray.SetIcon(a.IconPNG)
	}

	a.statusItem = systray.AddMenuItem("…", "Status")
	a.statusItem.Disable()
	systray.AddSeparator()

	a.openConnect = systray.AddMenuItem("Open Connect this computer…", "Open Connect this computer")
	a.installHint = systray.AddMenuItem("Install hint", "Install via terminal")
	a.installHint.Disable()
	a.startItem = systray.AddMenuItem("Start AgentWitch", "Start AgentWitch")
	a.openStatus = systray.AddMenuItem("Open AgentWitch Local", "Open AgentWitch Local")
	a.stopItem = systray.AddMenuItem("Stop AgentWitch", "Stop AgentWitch")
	a.viewLogs = systray.AddMenuItem("View logs", "View logs")
	a.updateItem = systray.AddMenuItem("Update available", "Open release page")
	a.updateItem.Hide()
	systray.AddSeparator()
	a.quitItem = systray.AddMenuItem("Quit", "Quit")

	prefix := a.TagPrefix
	if prefix == "" {
		prefix = core.TagPrefixLinux
	}
	a.ctrl = &Controller{
		Platform:  a.Platform,
		Client:    a.Client,
		TagPrefix: prefix,
		OnChange:  a.applyMenu,
	}
	a.withTimeout(a.ctrl.Poll)
	a.withTimeout(a.ctrl.MaybeCheckUpdate)
	a.applyMenu()

	go a.watchClicks()
	go a.pollLoop()
}

func (a *App) pollLoop() {
	ticker := time.NewTicker(time.Duration(core.HealthPollIntervalSeconds) * time.Second)
	defer ticker.Stop()
	for range ticker.C {
		a.withTimeout(a.ctrl.Poll)
		a.withTimeout(a.ctrl.MaybeCheckUpdate)
	}
}

func (a *App) applyMenu() {
	machine, override := a.ctrl.Snapshot()
	model := core.DeriveMenu(machine.State, machine.ErrorMessage)
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

	if offer := a.ctrl.UpdateOffer(); offer != nil {
		a.updateItem.SetTitle(core.UpdateAvailableTitle(offer.Version))
		a.updateItem.Show()
		a.updateItem.Enable()
	} else {
		a.updateItem.Hide()
	}
}

func (a *App) watchClicks() {
	for {
		select {
		case <-a.openConnect.ClickedCh:
			a.withTimeout(func(ctx context.Context) { a.reportOpenError(a.Platform.OpenConnect(ctx)) })
		case <-a.startItem.ClickedCh:
			a.withTimeout(a.ctrl.Start)
		case <-a.openStatus.ClickedCh:
			a.withTimeout(func(ctx context.Context) { a.reportOpenError(a.Platform.OpenStatus(ctx)) })
		case <-a.stopItem.ClickedCh:
			a.withTimeout(a.ctrl.Stop)
		case <-a.viewLogs.ClickedCh:
			a.withTimeout(a.runViewLogs)
		case <-a.updateItem.ClickedCh:
			a.withTimeout(a.openUpdate)
		case <-a.quitItem.ClickedCh:
			systray.Quit()
			return
		}
	}
}

func (a *App) openUpdate(ctx context.Context) {
	offer := a.ctrl.UpdateOffer()
	if offer == nil || offer.URL == "" {
		return
	}
	a.reportOpenError(a.Platform.OpenURL(ctx, offer.URL))
}

func (a *App) withTimeout(fn func(ctx context.Context)) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(core.CommandTimeoutSeconds)*time.Second)
	defer cancel()
	fn(ctx)
}

// Opening a URL/log is not a service state change: show failures as a message.
func (a *App) reportOpenError(err error) {
	if err != nil {
		a.ctrl.ShowMessage(err.Error())
	}
}

func (a *App) runViewLogs(ctx context.Context) {
	msg, err := a.Platform.OpenLogs(ctx)
	if err != nil {
		a.reportOpenError(err)
		return
	}
	if msg != "" {
		a.ctrl.ShowMessage(msg)
	}
}
