import Foundation

/// Who answered `GET http://127.0.0.1:43347/health`. The port is shared by every macOS
/// user on the machine, so a 2xx alone does not mean *this* user's AgentWitch is up.
public enum LocalHealthOwnership: Equatable, Sendable {
    /// 2xx and the identity matches this user (uid) and install root.
    case ours
    /// 2xx but the responder is another user's (or another install root's) AgentWitch.
    case foreign
    /// 2xx without identity fields (AWL bundle older than the identity change). Not trusted.
    case unverified
    /// No answer, non-2xx, or an unreadable body.
    case unhealthy

    /// Only a verified responder counts as healthy / Connected.
    public var isHealthy: Bool { self == .ours }
}
