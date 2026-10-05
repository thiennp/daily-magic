package core

import "testing"

func TestDeriveMenuNotInstalled(t *testing.T) {
	model := DeriveMenu(StateNotInstalled, "")
	if model.StatusTitle != "Not installed" {
		t.Fatalf("status: %s", model.StatusTitle)
	}
	if model.InstallHint != InstallHintCurl {
		t.Fatalf("hint: %s", model.InstallHint)
	}
	assertHasAction(t, model, ActionOpenConnect)
	assertNoAction(t, model, ActionStart)
	assertHasAction(t, model, ActionQuit)
}

func TestDeriveMenuStopped(t *testing.T) {
	model := DeriveMenu(StateStopped, "")
	assertHasAction(t, model, ActionStart)
	assertHasAction(t, model, ActionOpenStatus)
	assertHasAction(t, model, ActionViewLogs)
	assertNoAction(t, model, ActionStop)
	assertHasAction(t, model, ActionQuit)
}

func TestDeriveMenuRunning(t *testing.T) {
	model := DeriveMenu(StateRunning, "")
	assertHasAction(t, model, ActionStop)
	assertHasAction(t, model, ActionOpenStatus)
	assertNoAction(t, model, ActionStart)
}

func TestDeriveMenuStartingDisablesStop(t *testing.T) {
	model := DeriveMenu(StateStarting, "")
	for _, item := range model.Items {
		if item.Action == ActionStop && item.Enabled {
			t.Fatal("stop should be disabled while starting")
		}
	}
}

func TestDeriveMenuErrorOffersStartStopAndLogs(t *testing.T) {
	model := DeriveMenu(StateError, "Start timed out")
	if model.StatusTitle != "Start timed out" {
		t.Fatalf("status: %s", model.StatusTitle)
	}
	assertHasAction(t, model, ActionStart)
	assertHasAction(t, model, ActionStop)
	assertHasAction(t, model, ActionViewLogs)
}

func TestDeriveMenuHasNoLaunchAtLogin(t *testing.T) {
	model := DeriveMenu(StateRunning, "")
	for _, item := range model.Items {
		if item.Title == "Launch at login" {
			t.Fatal("launch at login toggle must not appear; start/stop own persistence")
		}
	}
}

func assertHasAction(t *testing.T, model MenuModel, action MenuAction) {
	t.Helper()
	for _, item := range model.Items {
		if item.Action == action {
			return
		}
	}
	t.Fatalf("missing action %s", action)
}

func assertNoAction(t *testing.T, model MenuModel, action MenuAction) {
	t.Helper()
	for _, item := range model.Items {
		if item.Action == action {
			t.Fatalf("unexpected action %s", action)
		}
	}
}
