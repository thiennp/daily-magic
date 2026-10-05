package core

import (
	"context"
	"net/http"
	"time"
)

// HTTPDoer is the injectable HTTP client surface for health probes.
type HTTPDoer interface {
	Do(req *http.Request) (*http.Response, error)
}

// ProbeHealth GETs baseURL+HealthPath (or an absolute healthURL) and treats 2xx as healthy.
func ProbeHealth(ctx context.Context, client HTTPDoer, healthURL string) bool {
	if client == nil {
		client = http.DefaultClient
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, healthURL, nil)
	if err != nil {
		return false
	}
	resp, err := client.Do(req)
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	return ParseHealthStatusCode(resp.StatusCode)
}

// ParseHealthStatusCode treats HTTP 2xx as healthy.
func ParseHealthStatusCode(statusCode int) bool {
	return statusCode >= 200 && statusCode < 300
}

// NewHealthContext returns a context with the standard health timeout.
func NewHealthContext(parent context.Context) (context.Context, context.CancelFunc) {
	if parent == nil {
		parent = context.Background()
	}
	return context.WithTimeout(parent, time.Duration(HealthTimeoutSeconds)*time.Second)
}
