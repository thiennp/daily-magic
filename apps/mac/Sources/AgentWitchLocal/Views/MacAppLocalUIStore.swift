import Foundation
import Combine

/// Local-only UI preferences and v1 History stubs (S5 local store not on this base).
/// Stub rows are clearly labeled; nothing here invents cloud history.
@MainActor
final class MacAppLocalUIStore: ObservableObject {
    static let shared = MacAppLocalUIStore()

    private let defaults: UserDefaults
    private enum Key {
        static let computerName = "awl.ui.computerName"
        static let historyEnabled = "awl.ui.historyEnabled"
        static let historyKeepDays = "awl.ui.historyKeepDays"
        static let autoUpdate = "awl.ui.autoUpdate"
        static let cliPrefix = "awl.ui.cli.addToProject."
        static let historyStubSeeded = "awl.ui.historyStubSeeded"
        static let historyJSON = "awl.ui.historyStubJSON"
        static let isOwner = "awl.ui.isOwner"
        static let hasConnectedProject = "awl.ui.hasConnectedProject"
    }

    @Published var computerName: String {
        didSet { defaults.set(computerName, forKey: Key.computerName) }
    }
    @Published var historyEnabled: Bool {
        didSet { defaults.set(historyEnabled, forKey: Key.historyEnabled) }
    }
    @Published var historyKeepDays: Int {
        didSet { defaults.set(historyKeepDays, forKey: Key.historyKeepDays) }
    }
    @Published var autoUpdate: Bool {
        didSet { defaults.set(autoUpdate, forKey: Key.autoUpdate) }
    }
    /// Product default: Add-to-project switches are OFF until the owner turns them on.
    @Published var cliAddToProject: [AgentCliKind: Bool] {
        didSet {
            for (kind, on) in cliAddToProject {
                defaults.set(on, forKey: Key.cliPrefix + kind.rawValue)
            }
        }
    }
    @Published var isOwner: Bool {
        didSet { defaults.set(isOwner, forKey: Key.isOwner) }
    }
    @Published var hasConnectedProject: Bool {
        didSet { defaults.set(hasConnectedProject, forKey: Key.hasConnectedProject) }
    }
    @Published var historyItems: [LocalHistoryStubItem] {
        didSet { persistHistory() }
    }

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        let host = Host.current().localizedName ?? "This Mac"
        self.computerName = defaults.string(forKey: Key.computerName) ?? host
        self.historyEnabled = defaults.object(forKey: Key.historyEnabled) as? Bool ?? true
        self.historyKeepDays = defaults.object(forKey: Key.historyKeepDays) as? Int ?? 30
        self.autoUpdate = defaults.object(forKey: Key.autoUpdate) as? Bool ?? true
        self.isOwner = defaults.object(forKey: Key.isOwner) as? Bool ?? true
        self.hasConnectedProject = defaults.object(forKey: Key.hasConnectedProject) as? Bool ?? true
        var toggles: [AgentCliKind: Bool] = [:]
        for kind in AgentCliKind.allCases {
            // HARD default OFF — do not treat missing key as on.
            toggles[kind] = defaults.object(forKey: Key.cliPrefix + kind.rawValue) as? Bool ?? false
        }
        self.cliAddToProject = toggles
        if let data = defaults.data(forKey: Key.historyJSON),
           let decoded = try? JSONDecoder().decode([LocalHistoryStubItem].self, from: data) {
            self.historyItems = decoded
        } else {
            self.historyItems = LocalHistoryStubItem.seedStubs()
            defaults.set(true, forKey: Key.historyStubSeeded)
            persistHistory()
        }
    }

    func setCliAddToProject(_ kind: AgentCliKind, enabled: Bool) {
        guard canEditCliToggles else { return }
        var next = cliAddToProject
        next[kind] = enabled
        cliAddToProject = next
    }

    var canEditCliToggles: Bool {
        isOwner && hasConnectedProject
    }

    var cliToggleDisabledReason: String? {
        if !hasConnectedProject {
            return "Connect this computer to a project to let its bots work here."
        }
        if !isOwner {
            return "Only the project owner can change this."
        }
        return nil
    }

    /// Rough local stub for space-used display (not real disk metering).
    var historySpaceUsedLabel: String {
        let bytes = max(1, historyItems.count) * 128_000
        if bytes < 1_000_000 { return String(format: "%.0f KB (stub)", Double(bytes) / 1000) }
        return String(format: "%.1f MB (stub)", Double(bytes) / 1_000_000)
    }

    private func persistHistory() {
        if let data = try? JSONEncoder().encode(historyItems) {
            defaults.set(data, forKey: Key.historyJSON)
        }
    }
}

enum AgentCliKind: String, CaseIterable, Identifiable, Codable {
    case claude
    case cursor
    case codex
    case gemini

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .claude: return "Claude Code"
        case .cursor: return "Cursor CLI"
        case .codex: return "Codex"
        case .gemini: return "Gemini CLI"
        }
    }

    var systemImage: String {
        switch self {
        case .claude: return "terminal"
        case .cursor: return "chevron.left.forwardslash.chevron.right"
        case .codex: return "doc.text"
        case .gemini: return "sparkles"
        }
    }
}

struct LocalHistoryStubItem: Identifiable, Codable, Equatable {
    var id: String
    var title: String
    var bot: String
    var project: String
    var summary: String
    var status: String
    var whenLabel: String
    /// Clear label so stubs are never mistaken for cloud history.
    var isStub: Bool

    static func seedStubs() -> [LocalHistoryStubItem] {
        [
            .init(
                id: "stub-1",
                title: "Review pull request #482",
                bot: "PR reviewer",
                project: "infusion",
                summary: "Left 6 comments. No blocking issues found.",
                status: "done",
                whenLabel: "Today",
                isStub: true
            ),
            .init(
                id: "stub-2",
                title: "Morning brief for the team",
                bot: "Morning brief",
                project: "infusion",
                summary: "Collected calendar, mail and open tasks into one page.",
                status: "done",
                whenLabel: "Yesterday",
                isStub: true
            ),
            .init(
                id: "stub-3",
                title: "Check broken links",
                bot: "Docs updater",
                project: "Grey - Study",
                summary: "Could not finish checking links. The tool lost its sign-in.",
                status: "failed",
                whenLabel: "2 days ago",
                isStub: true
            ),
        ]
    }
}
