package core

import "testing"

func TestParseHealthStatusCode(t *testing.T) {
	if !ParseHealthStatusCode(200) || !ParseHealthStatusCode(204) {
		t.Fatal("expected 2xx healthy")
	}
	if ParseHealthStatusCode(404) || ParseHealthStatusCode(500) {
		t.Fatal("expected non-2xx unhealthy")
	}
}

func TestDeriveRuntimeState(t *testing.T) {
	if got := DeriveRuntimeState(false, true); got != StateNotInstalled {
		t.Fatalf("got %v", got)
	}
	if got := DeriveRuntimeState(true, true); got != StateRunning {
		t.Fatalf("got %v", got)
	}
	if got := DeriveRuntimeState(true, false); got != StateStopped {
		t.Fatalf("got %v", got)
	}
}

func TestStateTransitions(t *testing.T) {
	if !IsStateTransitionAllowed(StateStopped, StateStarting) {
		t.Fatal("stopped -> starting")
	}
	if IsStateTransitionAllowed(StateNotInstalled, StateStarting) {
		t.Fatal("notInstalled -> starting should be disallowed")
	}
	if IsStateTransitionAllowed(StateRunning, StateStarting) {
		t.Fatal("running -> starting should be disallowed")
	}
	next, ok := ApplyStateTransition(StateNotInstalled, StateStarting)
	if ok || next != StateNotInstalled {
		t.Fatal("disallowed apply should fail")
	}
}

func TestPollHealthTransition(t *testing.T) {
	next, ok := PollHealthTransition(StateStopped, true)
	if !ok || next != StateRunning {
		t.Fatalf("stopped+healthy => running, got %v ok=%v", next, ok)
	}
	next, ok = PollHealthTransition(StateRunning, false)
	if !ok || next != StateStopped {
		t.Fatalf("running+unhealthy => stopped, got %v ok=%v", next, ok)
	}
	next, ok = PollHealthTransition(StateNotInstalled, true)
	if !ok || next != StateNotInstalled {
		t.Fatalf("notInstalled stays, got %v ok=%v", next, ok)
	}
}

func TestStatusLabel(t *testing.T) {
	if StatusLabel(StateRunning, "") != "Running" {
		t.Fatal(StatusLabel(StateRunning, ""))
	}
	if StatusLabel(StateError, "boom") != "boom" {
		t.Fatal(StatusLabel(StateError, "boom"))
	}
}

func TestURLs(t *testing.T) {
	if HealthURL() != "http://127.0.0.1:43347/health" {
		t.Fatal(HealthURL())
	}
	if StatusURL() != "http://127.0.0.1:43347/status" {
		t.Fatal(StatusURL())
	}
	if ConnectURL() != "https://www.agentwitch.com" {
		t.Fatal(ConnectURL())
	}
}
