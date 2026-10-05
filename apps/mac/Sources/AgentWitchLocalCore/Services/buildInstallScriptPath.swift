import Foundation

/// PATH for the install script. A Finder-launched app only has
/// `/usr/bin:/bin:/usr/sbin:/sbin`, so `command -v node` fails in the script.
/// Order: login-shell node dir, Homebrew (Apple Silicon, Intel), `~/.local/bin`,
/// the inherited PATH, then the system defaults. Empty entries and duplicates are dropped.
public func buildInstallScriptPath(
    inheritedPath: String?,
    homeDirectory: String,
    loginShellNodeDirectory: String?
) -> String {
    let preferred: [String] = [
        loginShellNodeDirectory ?? "",
        "/opt/homebrew/bin",
        "/usr/local/bin",
        (homeDirectory as NSString).appendingPathComponent(".local/bin"),
    ]
    let inherited = (inheritedPath ?? "").split(separator: ":").map(String.init)
    let systemDefaults = ["/usr/bin", "/bin", "/usr/sbin", "/sbin"]

    var seen = Set<String>()
    var entries: [String] = []
    for entry in preferred + inherited + systemDefaults where !entry.isEmpty {
        if seen.insert(entry).inserted {
            entries.append(entry)
        }
    }
    return entries.joined(separator: ":")
}
