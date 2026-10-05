package core

const (
	Version = "0.1.0"

	InstallDirName  = ".agent-witch"
	SystemdUserDir  = ".config/systemd/user"
	SystemdUnitName = "agent-witch.service"
	ProfilesDirName = "profiles"
	LogsDirName     = "logs"
	MainLogFileName = "agent-witch.log"

	LocalAppHost = "127.0.0.1"
	LocalAppPort = 43347
	HealthPath   = "/health"
	StatusPath   = "/status"

	CloudOrigin     = "https://www.agentwitch.com"
	InstallHintCurl = "curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash"

	HealthPollIntervalSeconds = 3
	CommandTimeoutSeconds     = 15
	HealthTimeoutSeconds      = 2
	// TransitionTimeoutSeconds bounds Starting/Stopping; past it the machine moves to Error.
	TransitionTimeoutSeconds = 30

	NoLogFoundMessage = "No agent-witch.log found yet."
)
