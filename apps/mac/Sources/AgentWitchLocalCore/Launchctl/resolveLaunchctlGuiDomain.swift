import Foundation

/// Builds `gui/<uid>` for the current user (or injected uid in tests).
public func resolveLaunchctlGuiDomain(userId: uid_t) -> String {
    "gui/\(userId)"
}
