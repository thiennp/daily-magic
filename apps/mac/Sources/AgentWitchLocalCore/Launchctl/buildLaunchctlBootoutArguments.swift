import Foundation

/// `launchctl bootout gui/$UID/com.agent-witch`.
public func buildLaunchctlBootoutArguments(
    domain: String,
    label: String = MacAppConstants.launchAgentLabel
) -> [String] {
    ["bootout", "\(domain)/\(label)"]
}
