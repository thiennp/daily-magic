package core

import (
	"errors"
	"fmt"
	"time"
)

// ErrStaleEvent means an async result was captured before a newer transition; drop it.
var ErrStaleEvent = errors.New("stale event: state changed since it was captured")

// TransitionError reports an event that has no legal edge from the current state.
type TransitionError struct {
	From  RuntimeState
	To    RuntimeState
	Event EventKind
}

func (e *TransitionError) Error() string {
	return fmt.Sprintf("illegal transition %s -[%s]-> %s", e.From, e.Event, e.To)
}

// TransitionTimeout is how long Starting/Stopping may last before Error.
const TransitionTimeout = time.Duration(TransitionTimeoutSeconds) * time.Second

// ApplyStateTransition is the only producer of Machine values (pure).
// It returns current unchanged plus an error when the event is stale or illegal.
func ApplyStateTransition(current Machine, event Event) (Machine, error) {
	if isAsyncEvent(event.Kind) && event.Generation != current.Generation {
		return current, ErrStaleEvent
	}
	to, message, err := nextState(current, event)
	if err != nil {
		return current, err
	}
	// User requests must move the machine (a second Start while Starting is illegal);
	// self edges in the table exist for probes only.
	if !IsStateTransitionAllowed(current.State, to) || (isRequestEvent(event.Kind) && to == current.State) {
		return current, &TransitionError{From: current.State, To: to, Event: event.Kind}
	}
	if to == current.State {
		next := current
		if to == StateError && message != "" {
			next.ErrorMessage = message
		}
		return next, nil
	}
	next := Machine{State: to, ErrorMessage: message, Generation: current.Generation + 1}
	if to == StateStarting || to == StateStopping {
		next.Deadline = event.At.Add(TransitionTimeout)
	}
	return next, nil
}

func isRequestEvent(kind EventKind) bool {
	return kind == EventStartRequested || kind == EventStopRequested
}

func isAsyncEvent(kind EventKind) bool {
	return kind == EventCommandFailed || kind == EventProbed
}

// nextState computes the target for (current, event) before table validation.
func nextState(current Machine, event Event) (RuntimeState, string, error) {
	switch event.Kind {
	case EventStartRequested:
		return StateStarting, "", nil
	case EventStopRequested:
		return StateStopping, "", nil
	case EventCommandFailed:
		return StateError, event.Message, nil
	case EventProbed:
		to, message := nextStateFromProbe(current, event)
		return to, message, nil
	default:
		return current.State, "", fmt.Errorf("unknown event kind %d", event.Kind)
	}
}

func nextStateFromProbe(current Machine, event Event) (RuntimeState, string) {
	if !event.Installed {
		return StateNotInstalled, ""
	}
	deadlinePassed := !current.Deadline.IsZero() && !event.At.Before(current.Deadline)
	switch current.State {
	case StateStarting:
		if event.Healthy {
			return StateRunning, ""
		}
		if deadlinePassed {
			return StateError, fmt.Sprintf("Start timed out: not healthy after %ds", TransitionTimeoutSeconds)
		}
		return StateStarting, ""
	case StateStopping:
		if !event.Active {
			return StateStopped, ""
		}
		if deadlinePassed {
			return StateError, fmt.Sprintf("Stop timed out: still active after %ds", TransitionTimeoutSeconds)
		}
		return StateStopping, ""
	case StateError:
		if event.Healthy {
			return StateRunning, ""
		}
		return StateError, current.ErrorMessage
	default:
		return DeriveRuntimeState(true, event.Healthy), ""
	}
}
