import Foundation

/// Plain-English setup failure kinds (never raw exit codes / 113).
public enum MacAppSetupFailureKind: Equatable, Sendable {
    case generic
    case offline
    case disk
    case permission

    /// Design headline — always this string on failure chrome.
    public static let couldNotFinishTitle = "Could not finish setup on this computer."

    public var detailLines: (String, String?) {
        switch self {
        case .generic:
            return (
                "Setup stopped partway. Nothing on this computer was changed.",
                nil
            )
        case .offline:
            return (
                "This computer is not connected to the internet. Connect, then try again.",
                nil
            )
        case .disk:
            return (
                "There is not enough free space on this computer.",
                "Free up space in System Settings → General → Storage, then try again."
            )
        case .permission:
            return (
                "AgentWitch Local needs permission to install on this computer.",
                "Allow it in System Settings → Privacy & Security, then try again."
            )
        }
    }

    public var userFacingDetail: String {
        let (a, b) = detailLines
        if let b { return a + "\n" + b }
        return a
    }
}
