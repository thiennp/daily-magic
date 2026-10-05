package windows

import (
	"reflect"
	"strings"
	"testing"
	"unicode/utf16"
)

func TestParseDefaultDistro(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want string
		ok   bool
	}{
		{
			name: "star ubuntu",
			in: "  NAME            STATE           VERSION\n" +
				"* Ubuntu          Running         2\n" +
				"  Debian          Stopped         2\n",
			want: "Ubuntu",
			ok:   true,
		},
		{
			name: "no default",
			in: "  NAME            STATE           VERSION\n" +
				"  Ubuntu          Running         2\n",
			want: "",
			ok:   false,
		},
		{
			name: "crlf",
			in:   "* Ubuntu-22.04\tRunning\t2\r\n",
			want: "Ubuntu-22.04",
			ok:   true,
		},
		{
			name: "empty",
			in:   "",
			want: "",
			ok:   false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, ok := ParseDefaultDistro(tt.in)
			if ok != tt.ok || got != tt.want {
				t.Fatalf("got (%q,%v) want (%q,%v)", got, ok, tt.want, tt.ok)
			}
		})
	}
}

func TestParseDefaultDistroUTF16LE(t *testing.T) {
	plain := "  NAME  STATE  VERSION\n* Ubuntu  Running  2\n"
	u16 := utf16.Encode([]rune(plain))
	raw := make([]byte, 2+len(u16)*2)
	raw[0], raw[1] = 0xFF, 0xFE
	for i, v := range u16 {
		raw[2+2*i] = byte(v)
		raw[2+2*i+1] = byte(v >> 8)
	}
	got, ok := ParseDefaultDistro(string(raw))
	if !ok || got != "Ubuntu" {
		t.Fatalf("got (%q,%v)", got, ok)
	}
}

func TestParseDistroNames(t *testing.T) {
	in := "  NAME            STATE           VERSION\n" +
		"* Ubuntu          Running         2\n" +
		"  Debian          Stopped         2\n"
	got := ParseDistroNames(in)
	want := []string{"Ubuntu", "Debian"}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("%v", got)
	}
}

func TestIsWSLNotInstalledOutput(t *testing.T) {
	if !IsWSLNotInstalledOutput("", "Windows Subsystem for Linux has no installed distributions.") {
		t.Fatal("expected missing")
	}
	if IsWSLNotInstalledOutput("  NAME\n* Ubuntu  Running  2\n", "") {
		t.Fatal("expected installed")
	}
}

func TestFormatWSLMissing(t *testing.T) {
	err := FormatWSLMissing("")
	if !strings.Contains(err.Error(), "WSL is not available") {
		t.Fatal(err)
	}
	if !strings.Contains(err.Error(), "install/agent-witch.sh") {
		t.Fatal(err)
	}
	err = FormatWSLMissing("no distros")
	if !strings.Contains(err.Error(), "no distros") {
		t.Fatal(err)
	}
}

func TestTrimAndJoin(t *testing.T) {
	if TrimCommandOutput("  C:\\log.txt\r\n") != `C:\log.txt` {
		t.Fatal(TrimCommandOutput("  C:\\log.txt\r\n"))
	}
	if JoinWSLDetail("", "  fail   now  ") != "fail now" {
		t.Fatal(JoinWSLDetail("", "  fail   now  "))
	}
}
