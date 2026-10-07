import Foundation

/// Ordered self-heal / first-setup steps. Titles match Product Mac UX copy exactly.
public enum MacAppSetupProgressStep: Int, Equatable, Sendable, CaseIterable {
    case checkingThisComputer = 0
    case downloadingTheConnection = 1
    case installingAssistantTools = 2
    case checkingEverythingWorks = 3

    /// Exact UI title (design: Setting up this computer steps list).
    public var title: String {
        switch self {
        case .checkingThisComputer:
            return "Checking this computer"
        case .downloadingTheConnection:
            return "Downloading the connection"
        case .installingAssistantTools:
            return "Installing support for assistant tools"
        case .checkingEverythingWorks:
            return "Checking everything works"
        }
    }

    /// Approximate progress floor for this step (0…100), design rails.
    public var progressFloorPercent: Int {
        switch self {
        case .checkingThisComputer: return 0
        case .downloadingTheConnection: return 15
        case .installingAssistantTools: return 55
        case .checkingEverythingWorks: return 86
        }
    }
}
