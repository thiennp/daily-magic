package core

import "time"

// EventKind identifies what happened to the tray state machine.
type EventKind int

const (
	// EventStartRequested: user clicked Start (before systemctl enable --now runs).
	EventStartRequested EventKind = iota
	// EventStopRequested: user clicked Stop (before systemctl disable --now runs).
	EventStopRequested
	// EventCommandFailed: the Start/Stop command launched at Generation failed.
	EventCommandFailed
	// EventProbed: an install/health(/is-active) probe launched at Generation finished.
	EventProbed
)

func (k EventKind) String() string {
	switch k {
	case EventStartRequested:
		return "startRequested"
	case EventStopRequested:
		return "stopRequested"
	case EventCommandFailed:
		return "commandFailed"
	case EventProbed:
		return "probed"
	default:
		return "unknown"
	}
}

// Event is the input to ApplyStateTransition.
type Event struct {
	Kind EventKind
	// At is the (injected) clock time the event is applied; drives deadlines.
	At time.Time
	// Generation is Machine.Generation captured when the async work started.
	// Required for EventCommandFailed and EventProbed; ignored for user requests.
	Generation uint64
	// Message is the failure reason for EventCommandFailed.
	Message string
	// Probe results (EventProbed only).
	Installed bool
	Healthy   bool
	// Active is `systemctl --user is-active`; only consulted while Stopping.
	Active bool
}

// StartRequested builds a user Start event.
func StartRequested(at time.Time) Event { return Event{Kind: EventStartRequested, At: at} }

// StopRequested builds a user Stop event.
func StopRequested(at time.Time) Event { return Event{Kind: EventStopRequested, At: at} }

// CommandFailed builds a Start/Stop failure for work launched at generation.
func CommandFailed(at time.Time, generation uint64, message string) Event {
	return Event{Kind: EventCommandFailed, At: at, Generation: generation, Message: message}
}

// Probed builds a probe result for a probe launched at generation.
func Probed(at time.Time, generation uint64, installed, healthy, active bool) Event {
	return Event{Kind: EventProbed, At: at, Generation: generation, Installed: installed, Healthy: healthy, Active: active}
}
