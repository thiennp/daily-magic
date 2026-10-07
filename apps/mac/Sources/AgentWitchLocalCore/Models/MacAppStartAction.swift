import Foundation

/// What Start / Start setup should do given install + `/health` ownership.
public enum MacAppStartAction: Equatable, Sendable {
    /// Healthy and already running — no-op.
    case none
    /// Core present and ownership is not "needs update"; use launchctl kickstart.
    case kickstart
    /// Missing install, or old core without `osUid` (`.unverified`) — run self-heal installer.
    case selfHeal
    /// Another user/install owns the shared port — do not overwrite; surface foreign reason.
    case blockedForeign
}
