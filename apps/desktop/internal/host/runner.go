package host

import (
	"bytes"
	"context"
	"os/exec"
	"time"
)

// RunResult is the outcome of an external command.
type RunResult struct {
	ExitCode int
	Stdout   string
	Stderr   string
	Err      error
}

// Runner runs external commands with a timeout (injectable for tests).
type Runner interface {
	Run(ctx context.Context, name string, args ...string) RunResult
}

// ExecRunner runs real processes via os/exec.
type ExecRunner struct {
	Timeout time.Duration
}

// Run implements Runner.
func (r ExecRunner) Run(ctx context.Context, name string, args ...string) RunResult {
	timeout := r.Timeout
	if timeout <= 0 {
		timeout = 15 * time.Second
	}
	runCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	cmd := exec.CommandContext(runCtx, name, args...)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	exitCode := 0
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			exitCode = exitErr.ExitCode()
		} else {
			exitCode = -1
		}
	}
	return RunResult{
		ExitCode: exitCode,
		Stdout:   stdout.String(),
		Stderr:   stderr.String(),
		Err:      err,
	}
}

// FakeRunner is a test double that records calls and returns scripted results.
type FakeRunner struct {
	Results []RunResult
	Calls   [][]string
	Index   int
}

// Run implements Runner.
func (f *FakeRunner) Run(_ context.Context, name string, args ...string) RunResult {
	call := append([]string{name}, args...)
	f.Calls = append(f.Calls, call)
	if f.Index >= len(f.Results) {
		return RunResult{ExitCode: 0}
	}
	result := f.Results[f.Index]
	f.Index++
	return result
}
