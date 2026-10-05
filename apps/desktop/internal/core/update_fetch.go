package core

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"time"
)

// githubReleaseJSON matches the GitHub Releases API fields we need.
type githubReleaseJSON struct {
	TagName    string `json:"tag_name"`
	HTMLURL    string `json:"html_url"`
	Draft      bool   `json:"draft"`
	Prerelease bool   `json:"prerelease"`
}

// UpdateCheckResult is the outcome of a releases API check.
// OK is false on network/HTTP/parse failure (callers stay silent).
// When OK, Offer is nil if the app is up to date.
type UpdateCheckResult struct {
	OK    bool
	Offer *UpdateOffer
}

// CheckForUpdate GETs the releases list (not /latest), filters by tag prefix,
// and compares against currentVersion. Failures return OK=false with no panic.
func CheckForUpdate(ctx context.Context, client HTTPDoer, prefix, currentVersion string) UpdateCheckResult {
	if client == nil {
		client = &http.Client{Timeout: 15 * time.Second}
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, ReleasesAPIURL+"?per_page=100", nil)
	if err != nil {
		return UpdateCheckResult{}
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("User-Agent", updateUserAgent)

	resp, err := client.Do(req)
	if err != nil {
		return UpdateCheckResult{}
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		_, _ = io.Copy(io.Discard, resp.Body)
		return UpdateCheckResult{}
	}
	body, err := io.ReadAll(io.LimitReader(resp.Body, 2<<20))
	if err != nil {
		return UpdateCheckResult{}
	}
	entries, ok := ParseReleasesJSON(body)
	if !ok {
		return UpdateCheckResult{}
	}
	return UpdateCheckResult{
		OK:    true,
		Offer: SelectNewestUpdate(entries, prefix, currentVersion),
	}
}

// ParseReleasesJSON decodes a GitHub releases list payload into ReleaseEntry values.
func ParseReleasesJSON(body []byte) ([]ReleaseEntry, bool) {
	var raw []githubReleaseJSON
	if err := json.Unmarshal(body, &raw); err != nil {
		return nil, false
	}
	out := make([]ReleaseEntry, 0, len(raw))
	for _, r := range raw {
		out = append(out, ReleaseEntry{
			TagName:    r.TagName,
			HTMLURL:    r.HTMLURL,
			Draft:      r.Draft,
			Prerelease: r.Prerelease,
		})
	}
	return out, true
}
