package core

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

// IsStateTransitionAllowed reports whether to is an allowed next state from from.
func IsStateTransitionAllowed(from, to RuntimeState) bool {
	switch from {
	case StateNotInstalled:
		return to == StateNotInstalled || to == StateStopped || to == StateRunning || to == StateError
	case StateStopped:
		return to == StateStarting || to == StateStopped || to == StateRunning || to == StateNotInstalled || to == StateError
	case StateStarting:
		return to == StateRunning || to == StateStopped || to == StateError || to == StateStarting
	case StateRunning:
		return to == StateStopping || to == StateRunning || to == StateStopped || to == StateError
	case StateStopping:
		return to == StateStopped || to == StateError || to == StateStopping
	case StateError:
		return to == StateStarting || to == StateStopped || to == StateNotInstalled || to == StateRunning || to == StateError
	default:
		return false
	}
}

// ApplyStateTransition returns to when allowed, otherwise false.
func ApplyStateTransition(from, to RuntimeState) (RuntimeState, bool) {
	if !IsStateTransitionAllowed(from, to) {
		return from, false
	}
	return to, true
}

// DeriveRuntimeState maps install + health into a seed state.
func DeriveRuntimeState(installed, healthy bool) RuntimeState {
	if !installed {
		return StateNotInstalled
	}
	if healthy {
		return StateRunning
	}
	return StateStopped
}

// PollHealthTransition maps a health probe into the next installed state.
func PollHealthTransition(current RuntimeState, healthy bool) (RuntimeState, bool) {
	switch current {
	case StateNotInstalled:
		return current, true
	case StateStarting:
		if healthy {
			return ApplyStateTransition(current, StateRunning)
		}
		return current, true
	case StateStopping:
		if !healthy {
			return ApplyStateTransition(current, StateStopped)
		}
		return current, true
	case StateStopped, StateRunning, StateError:
		target := StateStopped
		if healthy {
			target = StateRunning
		}
		return ApplyStateTransition(current, target)
	default:
		return current, false
	}
}
