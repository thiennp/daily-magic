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
	name, args = SystemctlDisableNowArgs()
	if name != "systemctl" || !reflect.DeepEqual(args, []string{"--user", "disable", "--now", core.SystemdUnitName}) {
		t.Fatalf("%s %v", name, args)
	}
	name, args = XdgOpenArgs("http://example")
	if name != "xdg-open" || !reflect.DeepEqual(args, []string{"http://example"}) {
		t.Fatalf("%s %v", name, args)
	}
}
