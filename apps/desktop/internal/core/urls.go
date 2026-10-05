package core

import "fmt"

// HealthURL returns the loopback AWL health URL.
func HealthURL() string {
	return fmt.Sprintf("http://%s:%d%s", LocalAppHost, LocalAppPort, HealthPath)
}

// StatusURL returns the loopback AWL status URL.
func StatusURL() string {
	return fmt.Sprintf("http://%s:%d%s", LocalAppHost, LocalAppPort, StatusPath)
}

// ConnectURL returns the cloud home URL (Connect this computer entry).
func ConnectURL() string {
	return CloudOrigin
}
