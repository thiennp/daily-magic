package core

import (
	"context"
	"io"
	"net/http"
	"strings"
	"testing"
)

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) Do(req *http.Request) (*http.Response, error) {
	return f(req)
}

func TestProbeHealthHealthy(t *testing.T) {
	client := roundTripFunc(func(req *http.Request) (*http.Response, error) {
		if req.URL.String() != "http://127.0.0.1:43347/health" {
			t.Fatalf("url %s", req.URL.String())
		}
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(strings.NewReader("ok")),
			Header:     make(http.Header),
		}, nil
	})
	if !ProbeHealth(context.Background(), client, HealthURL()) {
		t.Fatal("expected healthy")
	}
}

func TestProbeHealthUnhealthy(t *testing.T) {
	client := roundTripFunc(func(*http.Request) (*http.Response, error) {
		return &http.Response{
			StatusCode: 503,
			Body:       io.NopCloser(strings.NewReader("no")),
			Header:     make(http.Header),
		}, nil
	})
	if ProbeHealth(context.Background(), client, HealthURL()) {
		t.Fatal("expected unhealthy")
	}
}
