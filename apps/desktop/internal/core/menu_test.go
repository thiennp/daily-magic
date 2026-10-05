package core

import "testing"

func TestDeriveMenuNotInstalled(t *testing.T) {
	model := DeriveMenu(StateNotInstalled, "", false)
	if model.StatusTitle != "Not installed" {
		t.Fatalf("status: %s", model.StatusTitle)
	}
	if model.InstallHint != InstallHintCurl {
		t.Fatalf("hint: %s", model.InstallHint)
	}
	assertHasAction(t, model, ActionOpenConnect)
	assertNoAction(t, model, ActionStart)
}

func TestDeriveMenuStopped(t *testing.T) {
	model := DeriveMenu(StateStopped, "", true)
	assertHasAction(t, model, ActionStart)
	assertHasAction(t, model, ActionOpenStatus)
	assertHasAction(t, model, ActionViewLogs)
	assertNoAction(t, model, ActionStop)
	found := false
	for _, item := range model.Items {
		if item.Action == ActionToggleLogin {
			found = true
			if !item.Checked {
				t.Fatal("login should be checked")
			}
		}
	}
	if !found {
		t.Fatal("missing launch at login")
	}
}

func TestDeriveMenuRunning(t *testing.T) {
	model := DeriveMenu(StateRunning, "", false)
	assertHasAction(t, model, ActionStop)
	assertHasAction(t, model, ActionOpenStatus)
	assertNoAction(t, model, ActionStart)
}

func TestDeriveMenuStartingDisablesStop(t *testing.T) {
	model := DeriveMenu(StateStarting, "", false)
	for _, item := range model.Items {
		if item.Action == ActionStop && item.Enabled {
			t.Fatal("stop should be disabled while starting")
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
