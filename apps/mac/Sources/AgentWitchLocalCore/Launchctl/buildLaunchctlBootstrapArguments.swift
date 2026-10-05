import Foundation

/// `launchctl bootstrap gui/$UID <plist>`.
public func buildLaunchctlBootstrapArguments(
    domain: String,
    plistPath: URL
) -> [String] {
    ["bootstrap", domain, plistPath.path]
}
