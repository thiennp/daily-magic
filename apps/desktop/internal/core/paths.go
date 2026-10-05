package core

import (
	"os"
	"path/filepath"
	"sort"
	"time"
)

// InstallDir returns ~/.agent-witch for the given home.
func InstallDir(home string) string {
	return filepath.Join(home, InstallDirName)
}

// SystemdUnitPath returns ~/.config/systemd/user/agent-witch.service.
func SystemdUnitPath(home string) string {
	return filepath.Join(home, SystemdUserDir, SystemdUnitName)
}

// IsInstalled reports whether the install dir and systemd unit both exist.
func IsInstalled(home string, exists func(path string) bool) bool {
	if exists == nil {
		exists = pathExists
	}
	return exists(InstallDir(home)) && exists(SystemdUnitPath(home))
}

func pathExists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

// FileInfo is a minimal injectable filesystem entry for log discovery.
type FileInfo struct {
	Path    string
	ModTime time.Time
}

// ResolveNewestMainLogPath picks the newest profiles/*/logs/agent-witch.log,
// falling back to <install>/logs/agent-witch.log.
func ResolveNewestMainLogPath(
	installDir string,
	listProfileLogCandidates func(installDir string) []FileInfo,
	exists func(path string) bool,
) string {
	if listProfileLogCandidates == nil {
		listProfileLogCandidates = listProfileLogsFromDisk
	}
	if exists == nil {
		exists = pathExists
	}
	candidates := listProfileLogCandidates(installDir)
	if len(candidates) > 0 {
		sort.Slice(candidates, func(i, j int) bool {
			return candidates[i].ModTime.After(candidates[j].ModTime)
		})
		return candidates[0].Path
	}
	legacy := filepath.Join(installDir, LogsDirName, MainLogFileName)
	if exists(legacy) {
		return legacy
	}
	return ""
}

func listProfileLogsFromDisk(installDir string) []FileInfo {
	profilesDir := filepath.Join(installDir, ProfilesDirName)
	entries, err := os.ReadDir(profilesDir)
	if err != nil {
		return nil
	}
	var out []FileInfo
	for _, entry := range entries {
		if !entry.IsDir() {
			continue
		}
		logPath := filepath.Join(profilesDir, entry.Name(), LogsDirName, MainLogFileName)
		info, err := os.Stat(logPath)
		if err != nil {
			continue
		}
		out = append(out, FileInfo{Path: logPath, ModTime: info.ModTime()})
	}
	return out
}
