# Install Known Issues

- **d5e39215**: Fixed `run.sh` hard-coding the `AGENT_WITCH_PROFILE` at install time, which caused per-account hosts to use the wrong profile directory. `run.sh` is now completely profile-agnostic. Upgrading repairs the script and safely restarts the host once. Migration checks are also deferred properly without side-effects until the launcher job executes them, leaving a persistent migration log. Legacy `com.agent-witch` stops short of erroneously restarting currently running account hosts. Stale host services migration locks are also proactively cleared on boot.
