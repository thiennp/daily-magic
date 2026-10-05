package core

import (
	"context"
	"io"
	"net/http"
	"strings"
	"testing"
)

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) Do(req *http.Request) (*http.Response, error) { return f(req) }

func TestCheckForUpdateSuccess(t *testing.T) {
	body := `[{"tag_name":"awl-linux-v0.2.0","html_url":"https://example/r","draft":false,"prerelease":false}]`
	client := roundTripFunc(func(req *http.Request) (*http.Response, error) {
		if req.URL.Path != "/repos/thiennp/daily-magic/releases" {
			t.Fatalf("path: %s", req.URL.Path)
		}
		if strings.Contains(req.URL.Path, "latest") {
			t.Fatal("must not use /releases/latest")
		}
		if req.Header.Get("User-Agent") == "" {
			t.Fatal("missing User-Agent")
		}
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(strings.NewReader(body)),
			Header:     make(http.Header),
		}, nil
	})
	result := CheckForUpdate(context.Background(), client, TagPrefixLinux, "0.1.0")
	if !result.OK || result.Offer == nil || result.Offer.Version != "0.2.0" {
		t.Fatalf("result: %+v", result)
	}
}

func TestCheckForUpdateNetworkFailureSilent(t *testing.T) {
	client := roundTripFunc(func(*http.Request) (*http.Response, error) {
		return nil, context.DeadlineExceeded
	})
	result := CheckForUpdate(context.Background(), client, TagPrefixLinux, "0.1.0")
	if result.OK || result.Offer != nil {
		t.Fatalf("failure must be silent: %+v", result)
	}
}

func TestCheckForUpdateHTTPErrorSilent(t *testing.T) {
	client := roundTripFunc(func(*http.Request) (*http.Response, error) {
		return &http.Response{
			StatusCode: 503,
			Body:       io.NopCloser(strings.NewReader("nope")),
			Header:     make(http.Header),
		}, nil
	})
	result := CheckForUpdate(context.Background(), client, TagPrefixLinux, "0.1.0")
	if result.OK || result.Offer != nil {
		t.Fatalf("http error must be silent: %+v", result)
	}
}

func TestCheckForUpdateUpToDate(t *testing.T) {
	body := `[{"tag_name":"awl-linux-v0.1.0","html_url":"https://example/r","draft":false,"prerelease":false}]`
	client := roundTripFunc(func(*http.Request) (*http.Response, error) {
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(strings.NewReader(body)),
			Header:     make(http.Header),
		}, nil
	})
	result := CheckForUpdate(context.Background(), client, TagPrefixLinux, "0.1.0")
	if !result.OK || result.Offer != nil {
		t.Fatalf("up to date: %+v", result)
	}
}
