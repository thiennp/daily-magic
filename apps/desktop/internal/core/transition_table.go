package core

// IsStateTransitionAllowed is the single allowed-edge table (from -> to).
// ApplyStateTransition validates every computed target against it. Self edges
// are for probe results only; Start/Stop requests must change state.
//
//	notInstalled -> notInstalled | stopped | running                     (probe)
//	stopped      -> starting (Start) | stopped | running | notInstalled  (probe)
//	starting     -> starting | running | notInstalled                    (probe)
//	             -> error  (Start failed, or deadline passed while not healthy)
//	running      -> stopping (Stop) | running | stopped | notInstalled   (probe)
//	stopping     -> stopping | stopped | notInstalled                    (probe)
//	             -> error  (Stop failed, or deadline passed while still active)
//	error        -> starting (Start) | stopping (Stop)                   (exits)
//	             -> running | notInstalled (probe exits) | error (probe, still down)
func IsStateTransitionAllowed(from, to RuntimeState) bool {
	switch from {
	case StateNotInstalled:
		return to == StateNotInstalled || to == StateStopped || to == StateRunning
	case StateStopped:
		return to == StateStarting || to == StateStopped || to == StateRunning || to == StateNotInstalled
	case StateStarting:
		return to == StateStarting || to == StateRunning || to == StateNotInstalled || to == StateError
	case StateRunning:
		return to == StateStopping || to == StateRunning || to == StateStopped || to == StateNotInstalled
	case StateStopping:
		return to == StateStopping || to == StateStopped || to == StateNotInstalled || to == StateError
	case StateError:
		return to == StateStarting || to == StateStopping || to == StateRunning || to == StateNotInstalled || to == StateError
	default:
		return false
	}
}
