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
