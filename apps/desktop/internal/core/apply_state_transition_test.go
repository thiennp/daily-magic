package core

import (
	"errors"
	"testing"
	"time"
)

var t0 = time.Date(2026, 10, 5, 12, 0, 0, 0, time.UTC)

func machineIn(state RuntimeState) Machine {
	m := Machine{State: state, Generation: 7}
	if state == StateStarting || state == StateStopping {
		m.Deadline = t0.Add(TransitionTimeout)
	}
	if state == StateError {
		m.ErrorMessage = "earlier failure"
	}
	return m
}

func probe(m Machine, at time.Time, installed, healthy, active bool) Event {
	return Probed(at, m.Generation, installed, healthy, active)
}

// Every legal edge: (from, event) -> to.
func TestApplyStateTransitionLegalEdges(t *testing.T) {
	beforeDeadline := t0.Add(TransitionTimeout - time.Second)
	atDeadline := t0.Add(TransitionTimeout)
	cases := []struct {
		name  string
		from  RuntimeState
		event func(Machine) Event
		to    RuntimeState
	}{
		{"notInstalled probe missing", StateNotInstalled, func(m Machine) Event { return probe(m, t0, false, false, false) }, StateNotInstalled},
		{"notInstalled probe down", StateNotInstalled, func(m Machine) Event { return probe(m, t0, true, false, false) }, StateStopped},
		{"notInstalled probe healthy", StateNotInstalled, func(m Machine) Event { return probe(m, t0, true, true, true) }, StateRunning},

		{"stopped start", StateStopped, func(Machine) Event { return StartRequested(t0) }, StateStarting},
		{"stopped probe down", StateStopped, func(m Machine) Event { return probe(m, t0, true, false, false) }, StateStopped},
		{"stopped probe healthy", StateStopped, func(m Machine) Event { return probe(m, t0, true, true, true) }, StateRunning},
		{"stopped uninstalled", StateStopped, func(m Machine) Event { return probe(m, t0, false, false, false) }, StateNotInstalled},

		{"starting healthy", StateStarting, func(m Machine) Event { return probe(m, beforeDeadline, true, true, true) }, StateRunning},
		{"starting still down", StateStarting, func(m Machine) Event { return probe(m, beforeDeadline, true, false, true) }, StateStarting},
		{"starting deadline", StateStarting, func(m Machine) Event { return probe(m, atDeadline, true, false, true) }, StateError},
		{"starting command failed", StateStarting, func(m Machine) Event { return CommandFailed(t0, m.Generation, "start failed: x") }, StateError},
		{"starting uninstalled", StateStarting, func(m Machine) Event { return probe(m, t0, false, false, false) }, StateNotInstalled},

		{"running stop", StateRunning, func(Machine) Event { return StopRequested(t0) }, StateStopping},
		{"running healthy", StateRunning, func(m Machine) Event { return probe(m, t0, true, true, true) }, StateRunning},
		{"running down", StateRunning, func(m Machine) Event { return probe(m, t0, true, false, false) }, StateStopped},
		{"running uninstalled", StateRunning, func(m Machine) Event { return probe(m, t0, false, false, false) }, StateNotInstalled},

		{"stopping inactive", StateStopping, func(m Machine) Event { return probe(m, beforeDeadline, true, false, false) }, StateStopped},
		{"stopping still active", StateStopping, func(m Machine) Event { return probe(m, beforeDeadline, true, true, true) }, StateStopping},
		{"stopping deadline", StateStopping, func(m Machine) Event { return probe(m, atDeadline, true, true, true) }, StateError},
		{"stopping command failed", StateStopping, func(m Machine) Event { return CommandFailed(t0, m.Generation, "stop failed: x") }, StateError},
		{"stopping uninstalled", StateStopping, func(m Machine) Event { return probe(m, t0, false, false, false) }, StateNotInstalled},

		{"error start", StateError, func(Machine) Event { return StartRequested(t0) }, StateStarting},
		{"error stop", StateError, func(Machine) Event { return StopRequested(t0) }, StateStopping},
		{"error healthy", StateError, func(m Machine) Event { return probe(m, t0, true, true, true) }, StateRunning},
		{"error still down", StateError, func(m Machine) Event { return probe(m, t0, true, false, false) }, StateError},
		{"error uninstalled", StateError, func(m Machine) Event { return probe(m, t0, false, false, false) }, StateNotInstalled},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			from := machineIn(tc.from)
			next, err := ApplyStateTransition(from, tc.event(from))
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if next.State != tc.to {
				t.Fatalf("%s: got %s want %s", tc.name, next.State, tc.to)
			}
			if !IsStateTransitionAllowed(tc.from, tc.to) {
				t.Fatalf("table disagrees with apply for %s -> %s", tc.from, tc.to)
			}
			changed := tc.from != tc.to
			if changed && next.Generation != from.Generation+1 {
				t.Fatalf("generation should bump on change: %d -> %d", from.Generation, next.Generation)
			}
			if !changed && next.Generation != from.Generation {
				t.Fatalf("generation must not bump on self edge")
			}
		})
	}
}

func TestApplyStateTransitionIllegalEdges(t *testing.T) {
	cases := []struct {
		name  string
		from  RuntimeState
		event func(Machine) Event
	}{
		{"notInstalled start", StateNotInstalled, func(Machine) Event { return StartRequested(t0) }},
		{"notInstalled stop", StateNotInstalled, func(Machine) Event { return StopRequested(t0) }},
		{"stopped stop", StateStopped, func(Machine) Event { return StopRequested(t0) }},
		{"starting start again", StateStarting, func(Machine) Event { return StartRequested(t0) }},
		{"starting stop", StateStarting, func(Machine) Event { return StopRequested(t0) }},
		{"running start", StateRunning, func(Machine) Event { return StartRequested(t0) }},
		{"running command failed", StateRunning, func(m Machine) Event { return CommandFailed(t0, m.Generation, "x") }},
		{"stopping start", StateStopping, func(Machine) Event { return StartRequested(t0) }},
		{"stopping stop again", StateStopping, func(Machine) Event { return StopRequested(t0) }},
		{"stopped command failed", StateStopped, func(m Machine) Event { return CommandFailed(t0, m.Generation, "x") }},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			from := machineIn(tc.from)
			next, err := ApplyStateTransition(from, tc.event(from))
			var terr *TransitionError
			if !errors.As(err, &terr) {
				t.Fatalf("expected TransitionError, got %v", err)
			}
			if next != from {
				t.Fatalf("illegal event must leave machine unchanged")
			}
		})
	}
}

func TestTransitionTableRejectsKeyEdges(t *testing.T) {
	illegal := [][2]RuntimeState{
		{StateNotInstalled, StateStarting},
		{StateNotInstalled, StateError},
		{StateRunning, StateStarting},
		{StateRunning, StateError},
		{StateStopped, StateStopping},
		{StateStopped, StateError},
		{StateStarting, StateStopping},
		{StateStopping, StateStarting},
		{StateStopping, StateRunning},
	}
	for _, edge := range illegal {
		if IsStateTransitionAllowed(edge[0], edge[1]) {
			t.Fatalf("%s -> %s must be illegal", edge[0], edge[1])
		}
	}
	// Every non-terminal state, including Error, has a way out.
	for _, from := range AllRuntimeStates {
		exits := 0
		for _, to := range AllRuntimeStates {
			if to != from && IsStateTransitionAllowed(from, to) {
				exits++
			}
		}
		if exits == 0 {
			t.Fatalf("%s has no exit", from)
		}
	}
}

func TestStartDeadlineMovesToErrorWithReason(t *testing.T) {
	m, err := ApplyStateTransition(machineIn(StateStopped), StartRequested(t0))
	if err != nil {
		t.Fatal(err)
	}
	if !m.Deadline.Equal(t0.Add(TransitionTimeout)) {
		t.Fatalf("deadline %v", m.Deadline)
	}
	m, err = ApplyStateTransition(m, probe(m, t0.Add(TransitionTimeout-time.Nanosecond), true, false, true))
	if err != nil || m.State != StateStarting {
		t.Fatalf("before deadline stays starting: %v %v", m.State, err)
	}
	m, err = ApplyStateTransition(m, probe(m, t0.Add(TransitionTimeout), true, false, true))
	if err != nil || m.State != StateError {
		t.Fatalf("at deadline -> error: %v %v", m.State, err)
	}
	if m.ErrorMessage != "Start timed out: not healthy after 30s" {
		t.Fatalf("reason %q", m.ErrorMessage)
	}
	if !m.Deadline.IsZero() {
		t.Fatal("error must clear deadline")
	}
	// Error keeps its reason while down, and Start is a legal way out.
	m, err = ApplyStateTransition(m, probe(m, t0.Add(time.Hour), true, false, false))
	if err != nil || m.State != StateError || m.ErrorMessage == "" {
		t.Fatalf("error should persist with reason: %+v %v", m, err)
	}
	m, err = ApplyStateTransition(m, StartRequested(t0.Add(time.Hour)))
	if err != nil || m.State != StateStarting {
		t.Fatalf("error -> starting: %v %v", m.State, err)
	}
}

func TestStopDeadlineMovesToErrorWithReason(t *testing.T) {
	m, _ := ApplyStateTransition(machineIn(StateRunning), StopRequested(t0))
	m, err := ApplyStateTransition(m, probe(m, t0.Add(TransitionTimeout+time.Second), true, false, true))
	if err != nil || m.State != StateError || m.ErrorMessage != "Stop timed out: still active after 30s" {
		t.Fatalf("got %+v %v", m, err)
	}
}

func TestStalePollIsDropped(t *testing.T) {
	running := machineIn(StateRunning)
	// Poll launched while Running captures the generation...
	captured := running.Generation
	// ...user hits Stop before it returns.
	stopping, err := ApplyStateTransition(running, StopRequested(t0))
	if err != nil {
		t.Fatal(err)
	}
	// Late poll result (still healthy) must not be applied.
	next, err := ApplyStateTransition(stopping, Probed(t0, captured, true, true, true))
	if !errors.Is(err, ErrStaleEvent) {
		t.Fatalf("expected ErrStaleEvent, got %v", err)
	}
	if next != stopping {
		t.Fatalf("stale poll changed machine: %+v", next)
	}
	// A poll captured at the current generation applies.
	next, err = ApplyStateTransition(stopping, Probed(t0, stopping.Generation, true, false, false))
	if err != nil || next.State != StateStopped {
		t.Fatalf("fresh poll: %v %v", next.State, err)
	}
}

func TestStaleCommandFailureIsDropped(t *testing.T) {
	starting, _ := ApplyStateTransition(machineIn(StateStopped), StartRequested(t0))
	captured := starting.Generation
	running, _ := ApplyStateTransition(starting, Probed(t0, captured, true, true, true))
	next, err := ApplyStateTransition(running, CommandFailed(t0, captured, "late"))
	if !errors.Is(err, ErrStaleEvent) || next != running {
		t.Fatalf("late failure must be dropped: %+v %v", next, err)
	}
}
