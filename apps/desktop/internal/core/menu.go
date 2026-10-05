package core

// MenuAction identifies a tray menu item the UI can show.
type MenuAction string

const (
	ActionOpenConnect MenuAction = "openConnect"
	ActionStart       MenuAction = "start"
	ActionStop        MenuAction = "stop"
	ActionOpenStatus  MenuAction = "openStatus"
	ActionViewLogs    MenuAction = "viewLogs"
	ActionToggleLogin MenuAction = "toggleLaunchAtLogin"
	ActionQuit        MenuAction = "quit"
	ActionInstallHint MenuAction = "installHint"
)

// MenuItem is one derived tray row.
type MenuItem struct {
	Action   MenuAction
	Title    string
	Enabled  bool
	Checked  bool
	IsStatus bool
}

// MenuModel is the full derived menu for the current runtime snapshot.
type MenuModel struct {
	StatusTitle     string
	Items           []MenuItem
	LaunchesAtLogin bool
	InstallHint     string
}

// DeriveMenu builds menu items from installed/health/login state (pure).
func DeriveMenu(state RuntimeState, errorMessage string, launchesAtLogin bool) MenuModel {
	model := MenuModel{
		StatusTitle:     StatusLabel(state, errorMessage),
		LaunchesAtLogin: launchesAtLogin,
	}
	model.Items = append(model.Items, MenuItem{
		Action:   "",
		Title:    model.StatusTitle,
		Enabled:  false,
		IsStatus: true,
	})

	switch state {
	case StateNotInstalled:
		model.InstallHint = InstallHintCurl
		model.Items = append(model.Items,
			MenuItem{Action: ActionOpenConnect, Title: "Open Connect this Mac…", Enabled: true},
			MenuItem{Action: ActionInstallHint, Title: "Install: " + InstallHintCurl, Enabled: false},
		)
	case StateStopped, StateError:
		model.Items = append(model.Items,
			MenuItem{Action: ActionStart, Title: "Start Agent Witch", Enabled: true},
			MenuItem{Action: ActionOpenStatus, Title: "Open AgentWitch Local", Enabled: true},
			MenuItem{Action: ActionViewLogs, Title: "View logs", Enabled: true},
		)
	case StateStarting, StateRunning:
		model.Items = append(model.Items,
			MenuItem{Action: ActionOpenStatus, Title: "Open AgentWitch Local", Enabled: true},
			MenuItem{Action: ActionStop, Title: "Stop Agent Witch", Enabled: state != StateStarting},
			MenuItem{Action: ActionViewLogs, Title: "View logs", Enabled: true},
		)
	case StateStopping:
		model.Items = append(model.Items,
			MenuItem{Action: ActionStop, Title: "Stopping…", Enabled: false},
		)
	}

	model.Items = append(model.Items,
		MenuItem{
			Action:  ActionToggleLogin,
			Title:   "Launch at login",
			Enabled: true,
			Checked: launchesAtLogin,
		},
		MenuItem{Action: ActionQuit, Title: "Quit", Enabled: true},
	)
	return model
}
