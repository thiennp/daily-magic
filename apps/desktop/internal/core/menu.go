package core

// MenuAction identifies a tray menu item the UI can show.
type MenuAction string

const (
	ActionOpenConnect MenuAction = "openConnect"
	ActionStart       MenuAction = "start"
	ActionStop        MenuAction = "stop"
	ActionOpenStatus  MenuAction = "openStatus"
	ActionViewLogs    MenuAction = "viewLogs"
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
	StatusTitle string
	Items       []MenuItem
	InstallHint string
}

// DeriveMenu builds menu items from installed/health state (pure).
// Start/Stop already control login persistence via enable/disable --now,
// so there is no separate "Launch at login" toggle.
func DeriveMenu(state RuntimeState, errorMessage string) MenuModel {
	model := MenuModel{
		StatusTitle: StatusLabel(state, errorMessage),
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
	case StateStopped:
		model.Items = append(model.Items,
			MenuItem{Action: ActionStart, Title: "Start Agent Witch", Enabled: true},
			MenuItem{Action: ActionOpenStatus, Title: "Open AgentWitch Local", Enabled: true},
			MenuItem{Action: ActionViewLogs, Title: "View logs", Enabled: true},
		)
	case StateError:
		// Error exits: Start again, or Stop (e.g. after a Stop timeout); the next
		// healthy probe also moves to Running.
		model.Items = append(model.Items,
			MenuItem{Action: ActionStart, Title: "Start Agent Witch", Enabled: true},
			MenuItem{Action: ActionStop, Title: "Stop Agent Witch", Enabled: true},
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
			MenuItem{Action: ActionViewLogs, Title: "View logs", Enabled: true},
		)
	}

	model.Items = append(model.Items,
		MenuItem{Action: ActionQuit, Title: "Quit", Enabled: true},
	)
	return model
}
