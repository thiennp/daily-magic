import Foundation

/// `launchctl kickstart -k gui/$UID/com.agent-witch`.
public func buildLaunchctlKickstartArguments(
    domain: String,
    label: String = MacAppConstants.launchAgentLabel
) -> [String] {
    ["kickstart", "-k", "\(domain)/\(label)"]
}
