package core

import "time"

// RuntimeState is the explicit tray companion state (mirrors the Mac app).
type RuntimeState int

const (
	StateNotInstalled RuntimeState = iota
	StateStopped
	StateStarting
	StateRunning
	StateStopping
	StateError
)

// AllRuntimeStates lists every state (used by exhaustive transition tests).
var AllRuntimeStates = []RuntimeState{
	StateNotInstalled, StateStopped, StateStarting, StateRunning, StateStopping, StateError,
}

func (s RuntimeState) String() string {
	switch s {
	case StateNotInstalled:
		return "notInstalled"
	case StateStopped:
		return "stopped"
	case StateStarting:
		return "starting"
	case StateRunning:
		return "running"
	case StateStopping:
		return "stopping"
	case StateError:
		return "error"
	default:
		return "unknown"
	}
}

// Machine is the full tray state snapshot. Only ApplyStateTransition produces new values.
type Machine struct {
	State        RuntimeState
	ErrorMessage string
	// Generation increases by one every time State changes; async results
	// (probes, command failures) captured at an older generation are stale.
	Generation uint64
	// Deadline is when Starting/Stopping times out to Error (zero otherwise).
	Deadline time.Time
}

// StatusLabel returns the menu status title for a state.
func StatusLabel(state RuntimeState, errorMessage string) string {
	switch state {
	case StateNotInstalled:
		return "Not installed"
	case StateStopped:
		return "Stopped"
	case StateStarting:
		return "Starting…"
	case StateRunning:
		return "Running"
	case StateStopping:
		return "Stopping…"
	case StateError:
		if errorMessage == "" {
			return "Error"
		}
		return errorMessage
	default:
		return "Unknown"
	}
}

// DeriveRuntimeState maps install + health into a settled state.
func DeriveRuntimeState(installed, healthy bool) RuntimeState {
	if !installed {
		return StateNotInstalled
	}
	if healthy {
		return StateRunning
	}
	return StateStopped
}
