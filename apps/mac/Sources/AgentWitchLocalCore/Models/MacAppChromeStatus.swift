import Foundation

/// Shared chrome status for menu bar (AWL-H1) and app window (AWL-H2).
/// Maps existing runtime / bootstrap enums — does not rename them.
/// Labels match Product Mac UX redo HTML (`status()`).
public enum MacAppChromeKind: String, Equatable, Sendable {
    case notSetUp
    case settingUp
    case signedOut
    case starting
    case running
    case stopped
    case problem
    case waitingForInternet
}

public struct MacAppChromeStatus: Equatable, Sendable {
    public var kind: MacAppChromeKind
    /// Short pill / header label (e.g. "Running", "Setting up…").
    public var pillLabel: String
    /// Longer body line for popover / pane chrome.
    public var detailTitle: String
    public var detailSubtitle: String

    public init(
        kind: MacAppChromeKind,
        pillLabel: String,
        detailTitle: String,
        detailSubtitle: String
    ) {
        self.kind = kind
        self.pillLabel = pillLabel
        self.detailTitle = detailTitle
        self.detailSubtitle = detailSubtitle
    }

    /// Derive chrome from existing controller fields + UI stubs.
    /// - Parameters:
    ///   - runtime: `MacAppMenuController.state`
    ///   - bootstrap: `MacAppMenuController.bootstrapState`
    ///   - signedIn: AWL-H3 placeholder until `signedInEmail` lands (nil/false = signed out)
    ///   - offline: UI stub for "Waiting for internet" (H8 will bind real reachability)
    ///   - updateReady: `controller.updateOffer != nil`
    public static func resolve(
        runtime: MacAppRuntimeState,
        bootstrap: MacAppBootstrapState?,
        signedIn: Bool,
        offline: Bool = false,
        updateReady: Bool = false
    ) -> MacAppChromeStatus {
        _ = updateReady // surfaced separately as Update ready strip; does not override pill

        if let bootstrap {
            switch bootstrap {
            case .checking, .signingIn, .installing, .settingUp:
                return MacAppChromeStatus(
                    kind: .settingUp,
                    pillLabel: "Setting up…",
                    detailTitle: "Setting up this computer",
                    detailSubtitle: "You can keep working. The window opens when setup is done."
                )
            case .connected:
                break
            case .error(let reason):
                let safe = sanitizeChromeMessage(reason)
                return MacAppChromeStatus(
                    kind: .problem,
                    pillLabel: "Problem",
                    detailTitle: "Could not finish setup on this computer.",
                    detailSubtitle: safe
                )
            }
        }

        if case .notInstalled = runtime {
            return MacAppChromeStatus(
                kind: .notSetUp,
                pillLabel: "Not set up",
                detailTitle: "This computer is not set up yet",
                detailSubtitle: "Setup takes about a minute."
            )
        }

        if offline {
            return MacAppChromeStatus(
                kind: .waitingForInternet,
                pillLabel: "Waiting for internet",
                detailTitle: "Waiting for internet",
                detailSubtitle: "AgentWitch Local reconnects by itself."
            )
        }

        if !signedIn {
            return MacAppChromeStatus(
                kind: .signedOut,
                pillLabel: "Signed out",
                detailTitle: "Signed out",
                detailSubtitle: "Sign in to let your assistants use this computer."
            )
        }

        switch runtime {
        case .notInstalled:
            return MacAppChromeStatus(
                kind: .notSetUp,
                pillLabel: "Not set up",
                detailTitle: "This computer is not set up yet",
                detailSubtitle: "Setup takes about a minute."
            )
        case .starting:
            return MacAppChromeStatus(
                kind: .starting,
                pillLabel: "Starting…",
                detailTitle: "Starting…",
                detailSubtitle: "Opening the connection"
            )
        case .running:
            return MacAppChromeStatus(
                kind: .running,
                pillLabel: "Running",
                detailTitle: "This computer is available",
                detailSubtitle: "Assistants can use it"
            )
        case .stopping:
            return MacAppChromeStatus(
                kind: .stopped,
                pillLabel: "Stopped",
                detailTitle: "This computer is stopped",
                detailSubtitle: "Assistants cannot use it"
            )
        case .stopped:
            return MacAppChromeStatus(
                kind: .stopped,
                pillLabel: "Stopped",
                detailTitle: "This computer is stopped",
                detailSubtitle: "Assistants cannot use it"
            )
        case .error(let message):
            let safe = sanitizeChromeMessage(message)
            return MacAppChromeStatus(
                kind: .problem,
                pillLabel: "Problem",
                detailTitle: "Problem",
                detailSubtitle: safe
            )
        }
    }
}

/// Never show bare status codes (esp. 113) in chrome.
public func sanitizeChromeMessage(_ message: String) -> String {
    var result = message
    let patterns = [
        #"(?i)\bstatus\s*113\b"#,
        #"(?i)\bexit(?:ed)?(?:\s+with)?(?:\s+status)?\s*113\b"#,
        #"(?i)\blaunchctl[^\n.]{0,40}\b113\b"#,
        #"\b113\b"#,
    ]
    for pattern in patterns {
        guard let regex = try? NSRegularExpression(pattern: pattern) else { continue }
        let range = NSRange(result.startIndex..<result.endIndex, in: result)
        result = regex.stringByReplacingMatches(in: result, range: range, withTemplate: "")
    }
    let collapsed = result
        .replacingOccurrences(of: #"\s{2,}"#, with: " ", options: .regularExpression)
        .trimmingCharacters(in: .whitespacesAndNewlines)
    if collapsed.isEmpty {
        return "Could not finish setup on this computer."
    }
    return collapsed
}
