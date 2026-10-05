package windows

import (
	"fmt"
	"net/url"
	"strings"
)

// OpenURL targets are update-notice release pages: the GitHub release
// html_url, e.g. https://github.com/thiennp/daily-magic/releases/tag/awl-windows-v0.1.0.
// open() hands the URL to `cmd /c start`, so it must never carry anything
// cmd.exe would interpret; we reject instead of trying to escape.
const (
	openURLScheme = "https"
	openURLHost   = "github.com"
	// cmdMetaChars are characters cmd.exe treats specially on a command line.
	cmdMetaChars = "&|^<>%\""
)

// validateOpenURL allows only https://github.com/... URLs made of printable,
// non-space ASCII with no cmd.exe metacharacters.
func validateOpenURL(rawURL string) error {
	if rawURL == "" {
		return fmt.Errorf("open url: empty URL")
	}
	for _, r := range rawURL {
		if r <= ' ' || r > '~' {
			return fmt.Errorf("open url: whitespace, control or non-ASCII character %q not allowed", r)
		}
	}
	if i := strings.IndexAny(rawURL, cmdMetaChars); i >= 0 {
		return fmt.Errorf("open url: character %q not allowed", rawURL[i])
	}
	parsed, err := url.Parse(rawURL)
	if err != nil {
		return fmt.Errorf("open url: invalid URL: %w", err)
	}
	if parsed.Scheme != openURLScheme {
		return fmt.Errorf("open url: scheme %q not allowed (want %s)", parsed.Scheme, openURLScheme)
	}
	if parsed.User != nil || parsed.Host != openURLHost {
		return fmt.Errorf("open url: host %q not allowed (want %s)", parsed.Host, openURLHost)
	}
	return nil
}
