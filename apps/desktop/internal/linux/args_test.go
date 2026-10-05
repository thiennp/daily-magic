package linux

import (
	"reflect"
	"testing"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

func TestSystemctlArgs(t *testing.T) {
	name, args := SystemctlEnableNowArgs()
	if name != "systemctl" || !reflect.DeepEqual(args, []string{"--user", "enable", "--now", core.SystemdUnitName}) {
		t.Fatalf("%s %v", name, args)
	}
	name, args = SystemctlStopArgs()
	if name != "systemctl" || !reflect.DeepEqual(args, []string{"--user", "stop", core.SystemdUnitName}) {
		t.Fatalf("%s %v", name, args)
	}
	name, args = SystemctlIsEnabledArgs()
	if name != "systemctl" || !reflect.DeepEqual(args, []string{"--user", "is-enabled", core.SystemdUnitName}) {
		t.Fatalf("%s %v", name, args)
	}
	name, args = XdgOpenArgs("http://example")
	if name != "xdg-open" || !reflect.DeepEqual(args, []string{"http://example"}) {
		t.Fatalf("%s %v", name, args)
	}
}
