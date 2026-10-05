package tray

import (
	"context"
	"errors"
	"io"
	"net/http"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/thiennp/daily-magic/apps/desktop/internal/core"
)

type fakePlatform struct {
	mu        sync.Mutex
	installed bool
	active    bool
	startErr  error
	stopErr   error
}

func (f *fakePlatform) IsInstalled() bool { f.mu.Lock(); defer f.mu.Unlock(); return f.installed }
func (f *fakePlatform) IsActive(context.Context) (bool, error) {
	f.mu.Lock()
	defer f.mu.Unlock()
	return f.active, nil
}
func (f *fakePlatform) Start(context.Context) error              { return f.startErr }
func (f *fakePlatform) Stop(context.Context) error               { return f.stopErr }
func (f *fakePlatform) OpenStatus(context.Context) error         { return nil }
func (f *fakePlatform) OpenConnect(context.Context) error        { return nil }
func (f *fakePlatform) OpenURL(context.Context, string) error    { return nil }
func (f *fakePlatform) OpenLogs(context.Context) (string, error) { return "", nil }

// healthClient answers health probes; the optional hook runs before answering.
type healthClient struct {
	mu      sync.Mutex
	healthy bool
	hook    func()
}

func (h *healthClient) set(healthy bool) { h.mu.Lock(); h.healthy = healthy; h.mu.Unlock() }

func (h *healthClient) Do(*http.Request) (*http.Response, error) {
	h.mu.Lock()
	hook := h.hook
	h.hook = nil
	healthy := h.healthy
	h.mu.Unlock()
	if hook != nil {
		hook()
	}
	code := 503
	if healthy {
		code = 200
	}
	return &http.Response{StatusCode: code, Body: io.NopCloser(strings.NewReader("")), Header: make(http.Header)}, nil
}

type fakeClock struct{ now time.Time }

func (c *fakeClock) Now() time.Time          { return c.now }
func (c *fakeClock) Advance(d time.Duration) { c.now = c.now.Add(d) }

func newController(p *fakePlatform, h *healthClient, clock *fakeClock) *Controller {
	return &Controller{Platform: p, Client: h, Now: clock.Now}
}

func TestControllerStartTimesOutToError(t *testing.T) {
	clock := &fakeClock{now: time.Date(2026, 10, 5, 12, 0, 0, 0, time.UTC)}
	p := &fakePlatform{installed: true}
	h := &healthClient{}
	c := newController(p, h, clock)
	ctx := context.Background()

	c.Poll(ctx)
	if m, _ := c.Snapshot(); m.State != core.StateStopped {
		t.Fatalf("seed: %s", m.State)
	}
	c.Start(ctx)
	if m, _ := c.Snapshot(); m.State != core.StateStarting {
		t.Fatalf("after start: %s", m.State)
	}
	clock.Advance(core.TransitionTimeout - time.Second)
	c.Poll(ctx)
	if m, _ := c.Snapshot(); m.State != core.StateStarting {
		t.Fatalf("before deadline: %s", m.State)
	}
	clock.Advance(time.Second)
	c.Poll(ctx)
	m, _ := c.Snapshot()
	if m.State != core.StateError || !strings.Contains(m.ErrorMessage, "timed out") {
		t.Fatalf("deadline: %+v", m)
	}
	// Way out: Start again, service comes up.
	h.set(true)
	c.Start(ctx)
	if m, _ := c.Snapshot(); m.State != core.StateRunning {
		t.Fatalf("retry: %s", m.State)
	}
}

func TestControllerStartFailureIsError(t *testing.T) {
	clock := &fakeClock{now: time.Unix(0, 0)}
	p := &fakePlatform{installed: true, startErr: errors.New("start failed: boom")}
	c := newController(p, &healthClient{}, clock)
	c.Poll(context.Background())
	c.Start(context.Background())
	m, _ := c.Snapshot()
	if m.State != core.StateError || m.ErrorMessage != "start failed: boom" {
		t.Fatalf("%+v", m)
	}
}

func TestControllerStopUsesIsActive(t *testing.T) {
	clock := &fakeClock{now: time.Unix(0, 0)}
	p := &fakePlatform{installed: true, active: true}
	h := &healthClient{healthy: true}
	c := newController(p, h, clock)
	c.Poll(context.Background())
	p.mu.Lock()
	p.active = false
	p.mu.Unlock()
	// Health still answers (e.g. slow shutdown) but the unit is inactive.
	c.Stop(context.Background())
	if m, _ := c.Snapshot(); m.State != core.StateStopped {
		t.Fatalf("got %s", m.State)
	}
}

// A poll launched while Running that returns after the user hit Stop is dropped.
func TestControllerDropsStalePoll(t *testing.T) {
	clock := &fakeClock{now: time.Unix(0, 0)}
	p := &fakePlatform{installed: true, active: true}
	h := &healthClient{healthy: true}
	c := newController(p, h, clock)
	ctx := context.Background()
	c.Poll(ctx)
	if m, _ := c.Snapshot(); m.State != core.StateRunning {
		t.Fatalf("seed: %s", m.State)
	}

	entered := make(chan struct{})
	release := make(chan struct{})
	h.mu.Lock()
	h.hook = func() { close(entered); <-release }
	h.mu.Unlock()

	done := make(chan struct{})
	go func() { c.Poll(ctx); close(done) }() // in flight, will report healthy
	<-entered

	p.mu.Lock()
	p.active = false
	p.mu.Unlock()
	h.set(false)
	c.Stop(ctx) // Running -> Stopping -> (is-active=false) Stopped
	if m, _ := c.Snapshot(); m.State != core.StateStopped {
		t.Fatalf("after stop: %s", m.State)
	}

	h.set(true) // the stale poll's answer would say Running
	close(release)
	<-done
	if m, _ := c.Snapshot(); m.State != core.StateStopped {
		t.Fatalf("stale poll was applied: %s", m.State)
	}
}

func TestControllerUninstalledMidStart(t *testing.T) {
	clock := &fakeClock{now: time.Unix(0, 0)}
	p := &fakePlatform{installed: true}
	c := newController(p, &healthClient{}, clock)
	c.Poll(context.Background())
	c.Start(context.Background())
	p.mu.Lock()
	p.installed = false
	p.mu.Unlock()
	c.Poll(context.Background())
	if m, _ := c.Snapshot(); m.State != core.StateNotInstalled {
		t.Fatalf("got %s", m.State)
	}
}

func TestControllerMaybeCheckUpdateAtLaunchAndDaily(t *testing.T) {
	clock := &fakeClock{now: time.Date(2026, 10, 5, 12, 0, 0, 0, time.UTC)}
	p := &fakePlatform{installed: true}
	calls := 0
	body := `[{"tag_name":"awl-linux-v0.2.0","html_url":"https://example/r","draft":false,"prerelease":false}]`
	client := roundTripFunc(func(*http.Request) (*http.Response, error) {
		calls++
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(strings.NewReader(body)),
			Header:     make(http.Header),
		}, nil
	})
	c := &Controller{
		Platform:  p,
		Client:    client,
		Now:       clock.Now,
		TagPrefix: core.TagPrefixLinux,
	}
	ctx := context.Background()

	c.MaybeCheckUpdate(ctx)
	offer := c.UpdateOffer()
	if offer == nil || offer.Version != "0.2.0" || calls != 1 {
		t.Fatalf("launch check: offer=%+v calls=%d", offer, calls)
	}

	c.MaybeCheckUpdate(ctx)
	if calls != 1 {
		t.Fatalf("same day should not re-check: calls=%d", calls)
	}

	clock.Advance(time.Duration(core.UpdateCheckIntervalSeconds) * time.Second)
	body = `[{"tag_name":"awl-linux-v0.3.0","html_url":"https://example/r3","draft":false,"prerelease":false}]`
	c.MaybeCheckUpdate(ctx)
	offer = c.UpdateOffer()
	if offer == nil || offer.Version != "0.3.0" || calls != 2 {
		t.Fatalf("daily check: offer=%+v calls=%d", offer, calls)
	}
}

func TestControllerMaybeCheckUpdateFailureKeepsPriorOffer(t *testing.T) {
	clock := &fakeClock{now: time.Date(2026, 10, 5, 12, 0, 0, 0, time.UTC)}
	p := &fakePlatform{installed: true}
	okBody := `[{"tag_name":"awl-linux-v0.2.0","html_url":"https://example/r","draft":false,"prerelease":false}]`
	fail := false
	client := roundTripFunc(func(*http.Request) (*http.Response, error) {
		if fail {
			return nil, context.DeadlineExceeded
		}
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(strings.NewReader(okBody)),
			Header:     make(http.Header),
		}, nil
	})
	c := &Controller{Platform: p, Client: client, Now: clock.Now, TagPrefix: core.TagPrefixLinux}
	ctx := context.Background()
	c.MaybeCheckUpdate(ctx)
	if c.UpdateOffer() == nil {
		t.Fatal("expected offer after success")
	}
	fail = true
	clock.Advance(time.Duration(core.UpdateCheckIntervalSeconds) * time.Second)
	c.MaybeCheckUpdate(ctx)
	offer := c.UpdateOffer()
	if offer == nil || offer.Version != "0.2.0" {
		t.Fatalf("failure must keep prior offer: %+v", offer)
	}
}

// roundTripFunc is a tiny HTTPDoer for update-check tests.
type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) Do(req *http.Request) (*http.Response, error) { return f(req) }
