package core

import (
	"fmt"
	"strconv"
	"strings"
)

const (
	// ReleasesAPIURL lists GitHub releases for thiennp/daily-magic.
	// Do not use /releases/latest — that endpoint is shared across tag families.
	ReleasesAPIURL = "https://api.github.com/repos/thiennp/daily-magic/releases"

	TagPrefixLinux   = "awl-linux-v"
	TagPrefixMac     = "awl-mac-v"
	TagPrefixWindows = "awl-windows-v"

	// UpdateCheckIntervalSeconds is how often the tray re-checks after launch.
	UpdateCheckIntervalSeconds = 24 * 60 * 60

	updateUserAgent = "AgentWitchLocal/" + Version
)

// UpdateOffer is a newer desktop release the tray may surface.
type UpdateOffer struct {
	Version string // semver without tag prefix, e.g. "0.2.0"
	URL     string // release page (html_url) or download URL
}

// ReleaseEntry is the subset of a GitHub release used for update checks.
type ReleaseEntry struct {
	TagName    string
	HTMLURL    string
	Draft      bool
	Prerelease bool
}

// ParseVersionFromTag strips prefix (e.g. "awl-linux-v") and returns the semver body.
func ParseVersionFromTag(tag, prefix string) (string, bool) {
	if prefix == "" || !strings.HasPrefix(tag, prefix) {
		return "", false
	}
	ver := strings.TrimPrefix(tag, prefix)
	if ver == "" || !isPlainSemver(ver) {
		return "", false
	}
	return ver, true
}

// CompareSemver compares two plain "major.minor.patch" versions.
// Returns -1, 0, or 1 when both parse; ok is false if either is invalid.
func CompareSemver(a, b string) (int, bool) {
	ap, okA := parseSemverParts(a)
	bp, okB := parseSemverParts(b)
	if !okA || !okB {
		return 0, false
	}
	for i := 0; i < 3; i++ {
		if ap[i] < bp[i] {
			return -1, true
		}
		if ap[i] > bp[i] {
			return 1, true
		}
	}
	return 0, true
}

// IsNewerSemver reports whether candidate is a valid semver strictly greater than current.
func IsNewerSemver(candidate, current string) bool {
	cmp, ok := CompareSemver(candidate, current)
	return ok && cmp > 0
}

// SelectNewestUpdate returns the newest non-draft, non-prerelease release for prefix
// that is newer than currentVersion. Nil when none match.
func SelectNewestUpdate(releases []ReleaseEntry, prefix, currentVersion string) *UpdateOffer {
	var best *UpdateOffer
	for _, rel := range releases {
		if rel.Draft || rel.Prerelease {
			continue
		}
		ver, ok := ParseVersionFromTag(rel.TagName, prefix)
		if !ok || !IsNewerSemver(ver, currentVersion) {
			continue
		}
		if rel.HTMLURL == "" {
			continue
		}
		if best == nil || IsNewerSemver(ver, best.Version) {
			offer := UpdateOffer{Version: ver, URL: rel.HTMLURL}
			best = &offer
		}
	}
	return best
}

// UpdateAvailableTitle is the tray/menu label for an available update.
func UpdateAvailableTitle(version string) string {
	return fmt.Sprintf("Update available (v%s)", version)
}

func isPlainSemver(ver string) bool {
	_, ok := parseSemverParts(ver)
	return ok
}

func parseSemverParts(ver string) ([3]int, bool) {
	var out [3]int
	parts := strings.Split(ver, ".")
	if len(parts) != 3 {
		return out, false
	}
	for i, p := range parts {
		if p == "" || strings.HasPrefix(p, "-") || strings.ContainsAny(p, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+_") {
			return out, false
		}
		n, err := strconv.Atoi(p)
		if err != nil || n < 0 {
			return out, false
		}
		out[i] = n
	}
	return out, true
}
