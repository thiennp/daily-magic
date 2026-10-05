package core

import (
	"testing"
)

func TestParseVersionFromTag(t *testing.T) {
	ver, ok := ParseVersionFromTag("awl-linux-v0.2.0", TagPrefixLinux)
	if !ok || ver != "0.2.0" {
		t.Fatalf("got %q ok=%v", ver, ok)
	}
	if _, ok := ParseVersionFromTag("awl-mac-v0.2.0", TagPrefixLinux); ok {
		t.Fatal("wrong prefix should fail")
	}
	if _, ok := ParseVersionFromTag("awl-linux-v0.2.0-rc1", TagPrefixLinux); ok {
		t.Fatal("prerelease suffix should fail plain semver parse")
	}
	if _, ok := ParseVersionFromTag("awl-linux-v", TagPrefixLinux); ok {
		t.Fatal("empty version should fail")
	}
}

func TestCompareSemver(t *testing.T) {
	cmp, ok := CompareSemver("0.2.0", "0.1.0")
	if !ok || cmp != 1 {
		t.Fatalf("0.2.0 vs 0.1.0: cmp=%d ok=%v", cmp, ok)
	}
	cmp, ok = CompareSemver("0.1.0", "0.1.0")
	if !ok || cmp != 0 {
		t.Fatalf("equal: cmp=%d ok=%v", cmp, ok)
	}
	cmp, ok = CompareSemver("0.1.0", "1.0.0")
	if !ok || cmp != -1 {
		t.Fatalf("older: cmp=%d ok=%v", cmp, ok)
	}
	if _, ok := CompareSemver("1.0", "1.0.0"); ok {
		t.Fatal("short form should be invalid")
	}
	if _, ok := CompareSemver("v1.0.0", "1.0.0"); ok {
		t.Fatal("leading v should be invalid (prefix already stripped)")
	}
}

func TestIsNewerSemver(t *testing.T) {
	if !IsNewerSemver("0.2.0", "0.1.0") {
		t.Fatal("expected newer")
	}
	if IsNewerSemver("0.1.0", "0.1.0") {
		t.Fatal("same is not newer")
	}
	if IsNewerSemver("0.0.9", "0.1.0") {
		t.Fatal("older is not newer")
	}
	if IsNewerSemver("bad", "0.1.0") {
		t.Fatal("invalid candidate")
	}
}

func TestSelectNewestUpdate(t *testing.T) {
	releases := []ReleaseEntry{
		{TagName: "awl-mac-v9.9.9", HTMLURL: "https://example/mac", Draft: false},
		{TagName: "awl-linux-v0.1.0", HTMLURL: "https://example/old"},
		{TagName: "awl-linux-v0.3.0", HTMLURL: "https://example/new"},
		{TagName: "awl-linux-v0.2.0", HTMLURL: "https://example/mid"},
		{TagName: "awl-linux-v0.4.0", HTMLURL: "https://example/draft", Draft: true},
		{TagName: "awl-linux-v0.5.0", HTMLURL: "https://example/pre", Prerelease: true},
		{TagName: "awl-linux-v0.2.5", HTMLURL: ""}, // missing URL skipped
	}
	offer := SelectNewestUpdate(releases, TagPrefixLinux, "0.1.0")
	if offer == nil || offer.Version != "0.3.0" || offer.URL != "https://example/new" {
		t.Fatalf("got %+v", offer)
	}
	if got := SelectNewestUpdate(releases, TagPrefixLinux, "0.3.0"); got != nil {
		t.Fatalf("up to date should be nil, got %+v", got)
	}
	if got := SelectNewestUpdate(releases, TagPrefixWindows, "0.0.1"); got != nil {
		t.Fatalf("no windows tags: %+v", got)
	}
}

func TestUpdateAvailableTitle(t *testing.T) {
	if got := UpdateAvailableTitle("0.2.0"); got != "Update available (v0.2.0)" {
		t.Fatalf("title: %q", got)
	}
}

func TestParseReleasesJSON(t *testing.T) {
	body := []byte(`[
	  {"tag_name":"awl-linux-v0.2.0","html_url":"https://example/r","draft":false,"prerelease":false},
	  {"tag_name":"other","html_url":"https://example/o","draft":true,"prerelease":false}
	]`)
	entries, ok := ParseReleasesJSON(body)
	if !ok || len(entries) != 2 {
		t.Fatalf("ok=%v len=%d", ok, len(entries))
	}
	if entries[0].TagName != "awl-linux-v0.2.0" || entries[1].Draft != true {
		t.Fatalf("entries: %+v", entries)
	}
	if _, ok := ParseReleasesJSON([]byte(`{`)); ok {
		t.Fatal("invalid json should fail")
	}
}
