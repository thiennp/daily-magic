package windows

import (
	"bytes"
	"fmt"
	"strings"
	"unicode/utf16"
)

// FormatWSLMissing returns the user-facing error when WSL is absent or empty.
func FormatWSLMissing(detail string) error {
	base := "WSL is not available. Install Windows Subsystem for Linux (WSL2) " +
		"and a Linux distro, then install AgentWitch inside WSL:\n  " +
		"curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash"
	detail = strings.TrimSpace(detail)
	if detail == "" {
		return fmt.Errorf("%s", base)
	}
	return fmt.Errorf("%s\n(%s)", base, detail)
}

// DecodeWSLOutput normalizes wsl.exe stdout/stderr (often UTF-16LE with BOM).
func DecodeWSLOutput(raw string) string {
	b := []byte(raw)
	if len(b) >= 2 && b[0] == 0xFF && b[1] == 0xFE {
		return decodeUTF16LE(b[2:])
	}
	// Heuristic: many NUL bytes => UTF-16LE without BOM.
	if looksLikeUTF16LE(b) {
		return decodeUTF16LE(b)
	}
	return strings.ReplaceAll(raw, "\r\n", "\n")
}

func looksLikeUTF16LE(b []byte) bool {
	if len(b) < 4 || len(b)%2 != 0 {
		return false
	}
	nuls := 0
	for i := 1; i < len(b) && i < 64; i += 2 {
		if b[i] == 0 {
			nuls++
		}
	}
	return nuls >= 4
}

func decodeUTF16LE(b []byte) string {
	if len(b)%2 != 0 {
		b = b[:len(b)-1]
	}
	u16 := make([]uint16, len(b)/2)
	for i := 0; i < len(u16); i++ {
		u16[i] = uint16(b[2*i]) | uint16(b[2*i+1])<<8
	}
	return strings.ReplaceAll(string(utf16.Decode(u16)), "\r\n", "\n")
}

// ParseDefaultDistro returns the default WSL distro name from `wsl -l -v` text.
// Returns ("", false) when no default marker is found.
func ParseDefaultDistro(output string) (string, bool) {
	text := DecodeWSLOutput(output)
	for _, line := range strings.Split(text, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		// Default row: "* Ubuntu  Running  2" or "*Ubuntu Running 2"
		if !strings.HasPrefix(line, "*") {
			continue
		}
		rest := strings.TrimSpace(strings.TrimPrefix(line, "*"))
		fields := strings.Fields(rest)
		if len(fields) == 0 {
			continue
		}
		return fields[0], true
	}
	return "", false
}

// ParseDistroNames returns all distro names from `wsl -l -v` (skipping the header).
func ParseDistroNames(output string) []string {
	text := DecodeWSLOutput(output)
	var names []string
	for _, line := range strings.Split(text, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		lower := strings.ToLower(line)
		if strings.HasPrefix(lower, "name") && strings.Contains(lower, "state") {
			continue
		}
		line = strings.TrimSpace(strings.TrimPrefix(line, "*"))
		fields := strings.Fields(line)
		if len(fields) == 0 {
			continue
		}
		names = append(names, fields[0])
	}
	return names
}

// IsWSLNotInstalledOutput reports well-known wsl.exe "not installed" messages.
func IsWSLNotInstalledOutput(stdout, stderr string) bool {
	combined := strings.ToLower(DecodeWSLOutput(stdout) + "\n" + DecodeWSLOutput(stderr))
	needles := []string{
		"windows subsystem for linux has no installed distributions",
		"wsl_e_distro_not_found",
		"the system cannot find the path specified",
		"is not recognized as an internal or external command",
		"no installed distributions",
		"wsl2 is not supported",
		"please enable the windows subsystem for linux",
	}
	for _, n := range needles {
		if strings.Contains(combined, n) {
			return true
		}
	}
	return false
}

// TrimCommandOutput strips CR/BOM/space from a single-line command result.
func TrimCommandOutput(raw string) string {
	s := DecodeWSLOutput(raw)
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "\ufeff")
	return strings.TrimSpace(s)
}

// JoinWSLDetail builds a short parenthetical from stdout/stderr for errors.
func JoinWSLDetail(stdout, stderr string) string {
	msg := strings.TrimSpace(DecodeWSLOutput(stderr))
	if msg == "" {
		msg = strings.TrimSpace(DecodeWSLOutput(stdout))
	}
	msg = string(bytes.Join(bytes.Fields([]byte(msg)), []byte(" ")))
	if len(msg) > 200 {
		msg = msg[:200] + "…"
	}
	return msg
}
