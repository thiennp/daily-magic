import Foundation
import Combine

/// Local-only UI preferences and stub data for Claude Mac windows.
/// Product defaults: CLI Add-to-project OFF; History ON; no invented backend.
@MainActor
final class MacAppLocalUIStore: ObservableObject {
    static let shared = MacAppLocalUIStore()

    private let defaults: UserDefaults

    private enum Key {
        static let computerName = "awl.ui.computerName"
        static let historyEnabled = "awl.ui.historyEnabled"
        static let historyKeepDays = "awl.ui.historyKeepDays"
        static let autoUpdate = "awl.ui.autoUpdate"
        static let updateChannel = "awl.ui.updateChannel"
        static let cliPrefix = "awl.ui.cliAdd."
        static let cliInstalledPrefix = "awl.ui.cliInstalled."
        static let isOwner = "awl.ui.isOwner"
        static let hasConnectedProject = "awl.ui.hasConnectedProject"
        static let historyJSON = "awl.ui.historyJSON.v2"
        static let historyStubSeeded = "awl.ui.historyStubSeeded.v2"
        static let notifyDone = "awl.ui.notifyDone"
        static let notifyFail = "awl.ui.notifyFail"
        static let notifyAsk = "awl.ui.notifyAsk"
        static let askBeforeCommand = "awl.ui.askBeforeCommand"
        static let askBeforeOutsideFolder = "awl.ui.askBeforeOutsideFolder"
        static let showTrayIcon = "awl.ui.showTrayIcon"
        static let keepRunningClosed = "awl.ui.keepRunningClosed"
        static let autoStartCore = "awl.ui.autoStartCore"
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
    /// "stable" | "early"
    @Published var updateChannel: String {
        didSet { defaults.set(updateChannel, forKey: Key.updateChannel) }
    }
    /// Product default: Add-to-project switches are OFF until the owner turns them on.
    @Published var cliAddToProject: [AgentCliKind: Bool] {
        didSet {
            for (kind, on) in cliAddToProject {
                defaults.set(on, forKey: Key.cliPrefix + kind.rawValue)
            }
        }
    }
    /// UI-only install presence for Computer → Agent tools (stub scan).
    @Published var cliInstalled: [AgentCliKind: Bool] {
        didSet {
            for (kind, on) in cliInstalled {
                defaults.set(on, forKey: Key.cliInstalledPrefix + kind.rawValue)
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
    @Published var notifyDone: Bool {
        didSet { defaults.set(notifyDone, forKey: Key.notifyDone) }
    }
    @Published var notifyFail: Bool {
        didSet { defaults.set(notifyFail, forKey: Key.notifyFail) }
    }
    @Published var notifyAsk: Bool {
        didSet { defaults.set(notifyAsk, forKey: Key.notifyAsk) }
    }
    @Published var askBeforeCommand: Bool {
        didSet { defaults.set(askBeforeCommand, forKey: Key.askBeforeCommand) }
    }
    @Published var askBeforeOutsideFolder: Bool {
        didSet { defaults.set(askBeforeOutsideFolder, forKey: Key.askBeforeOutsideFolder) }
    }
    @Published var showTrayIcon: Bool {
        didSet { defaults.set(showTrayIcon, forKey: Key.showTrayIcon) }
    }
    @Published var keepRunningClosed: Bool {
        didSet { defaults.set(keepRunningClosed, forKey: Key.keepRunningClosed) }
    }
    @Published var autoStartCore: Bool {
        didSet { defaults.set(autoStartCore, forKey: Key.autoStartCore) }
    }
    /// UI stub bot rows for Computer → Assistants tab.
    @Published var botStubs: [LocalBotStubItem]

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        let host = Host.current().localizedName ?? "This computer"
        self.computerName = defaults.string(forKey: Key.computerName) ?? host
        self.historyEnabled = defaults.object(forKey: Key.historyEnabled) as? Bool ?? true
        self.historyKeepDays = defaults.object(forKey: Key.historyKeepDays) as? Int ?? 30
        self.autoUpdate = defaults.object(forKey: Key.autoUpdate) as? Bool ?? true
        self.updateChannel = defaults.string(forKey: Key.updateChannel) ?? "stable"
        self.isOwner = defaults.object(forKey: Key.isOwner) as? Bool ?? true
        self.hasConnectedProject = defaults.object(forKey: Key.hasConnectedProject) as? Bool ?? true
        self.notifyDone = defaults.object(forKey: Key.notifyDone) as? Bool ?? true
        self.notifyFail = defaults.object(forKey: Key.notifyFail) as? Bool ?? true
        self.notifyAsk = defaults.object(forKey: Key.notifyAsk) as? Bool ?? true
        self.askBeforeCommand = defaults.object(forKey: Key.askBeforeCommand) as? Bool ?? true
        self.askBeforeOutsideFolder = defaults.object(forKey: Key.askBeforeOutsideFolder) as? Bool ?? true
        self.showTrayIcon = defaults.object(forKey: Key.showTrayIcon) as? Bool ?? true
        self.keepRunningClosed = defaults.object(forKey: Key.keepRunningClosed) as? Bool ?? true
        self.autoStartCore = defaults.object(forKey: Key.autoStartCore) as? Bool ?? true
        var toggles: [AgentCliKind: Bool] = [:]
        var installed: [AgentCliKind: Bool] = [:]
        for kind in AgentCliKind.allCases {
            // HARD default OFF — do not treat missing key as on.
            toggles[kind] = defaults.object(forKey: Key.cliPrefix + kind.rawValue) as? Bool ?? false
            installed[kind] = false
        }
        self.cliAddToProject = toggles
        // Real scan of this computer (no demo defaults).
        let scanned = AgentCliDetection.scan()
        self.cliInstalled = installed.merging(scanned) { _, found in found }
        self.botStubs = LocalBotStubItem.seedStubs()
        if let data = defaults.data(forKey: Key.historyJSON),
           let decoded = try? JSONDecoder().decode([LocalHistoryStubItem].self, from: data) {
            self.historyItems = decoded
        } else {
            self.historyItems = LocalHistoryStubItem.seedStubs()
            defaults.set(true, forKey: Key.historyStubSeeded)
            persistHistory()
        }
        refreshCliScanIncludingLoginShell()
    }

    /// GUI apps get launchd's short PATH; re-check with the login-shell PATH too.
    private func refreshCliScanIncludingLoginShell() {
        AgentCliDetection.scanIncludingLoginShell { [weak self] found in
            guard let self else { return }
            self.cliInstalled = self.cliInstalled.merging(found) { _, new in new }
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
            return "Connect this computer to a project to let its assistants work here."
        }
        if !isOwner {
            return "Only the project owner can change this."
        }
        return nil
    }

    var toolsReadyCount: Int {
        AgentCliKind.allCases.filter { cliInstalled[$0] == true }.count
    }

    /// Rough local stub for space-used display (not real disk metering).
    var historySpaceUsedLabel: String {
        let bytes = max(1, historyItems.count) * 128_000
        if bytes < 1_000_000 { return String(format: "%.0f KB (local stub)", Double(bytes) / 1000) }
        return String(format: "%.1f MB (local stub)", Double(bytes) / 1_000_000)
    }

    func clearHistory(projectFilter: String?) {
        if let projectFilter, projectFilter != "all" {
            historyItems = historyItems.filter { $0.project != projectFilter }
        } else {
            historyItems = []
        }
    }

    /// UI-only rescan stub — flips scanning flag in ComputerView; does not invent backend.
    func markToolsRescanned() {
        cliInstalled = AgentCliDetection.scan()
        refreshCliScanIncludingLoginShell()
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

    var installHint: String {
        switch self {
        case .claude: return "npm install -g @anthropic-ai/claude-code"
        case .cursor: return "curl https://cursor.com/install -fsS | bash"
        case .codex: return "codex login"
        case .gemini: return "npm install -g @google/gemini-cli"
        }
    }

    var installTitle: String {
        switch self {
        case .claude: return "Install Claude Code"
        case .cursor: return "Install Cursor CLI"
        case .codex: return "How to sign in"
        case .gemini: return "Install Gemini CLI"
        }
    }
}

struct LocalHistoryStubItem: Identifiable, Codable, Equatable {
    var id: String
    var title: String
    var bot: String
    var project: String
    var cli: String
    var summary: String
    var status: String
    var whenLabel: String
    var errorDetail: String?
    /// Clear label so stubs are never mistaken for cloud history.
    var isStub: Bool

    static func seedStubs() -> [LocalHistoryStubItem] {
        [
            .init(id: "stub-1", title: "Summarise yesterday's pull requests", bot: "Daily summary", project: "infusion", cli: "claude", summary: "Wrote a short summary of 9 pull requests and flagged 2 that need a second look.", status: "done", whenLabel: "Today", errorDetail: nil, isStub: true),
            .init(id: "stub-2", title: "Review pull request #482", bot: "PR reviewer", project: "infusion", cli: "cursor", summary: "Left 6 comments. No blocking issues found.", status: "done", whenLabel: "Today", errorDetail: nil, isStub: true),
            .init(id: "stub-3", title: "Morning brief for the team", bot: "Morning brief", project: "daily-magic", cli: "claude", summary: "Collected calendar, mail and open tasks into one page.", status: "done", whenLabel: "Yesterday", errorDetail: nil, isStub: true),
            .init(id: "stub-4", title: "Update the onboarding docs", bot: "Docs updater", project: "northwind-docs", cli: "codex", summary: "Changed 4 pages to match the new sign-in flow.", status: "done", whenLabel: "2 days ago", errorDetail: nil, isStub: true),
            .init(id: "stub-5", title: "Fix the failing build", bot: "PR reviewer", project: "infusion", cli: "cursor", summary: "The build still fails in the test step.", status: "failed", whenLabel: "2 days ago", errorDetail: "Tests did not finish in 10 minutes and were stopped.", isStub: true),
            .init(id: "stub-6", title: "Draft the weekly update", bot: "Morning brief", project: "daily-magic", cli: "claude", summary: "Drafted 5 short paragraphs from this week's notes.", status: "done", whenLabel: "3 days ago", errorDetail: nil, isStub: true),
            .init(id: "stub-7", title: "Check broken links", bot: "Docs updater", project: "northwind-docs", cli: "codex", summary: "Could not finish checking links.", status: "failed", whenLabel: "4 days ago", errorDetail: "The tool lost its sign-in. Sign in to Codex and run it again.", isStub: true),
        ]
    }
}

struct LocalBotStubItem: Identifiable, Equatable {
    var id: String
    var name: String
    var project: String
    var cli: String
    var working: Bool

    static func seedStubs() -> [LocalBotStubItem] {
        [
            .init(id: "bot-1", name: "PR reviewer", project: "infusion", cli: "cursor", working: false),
            .init(id: "bot-2", name: "Morning brief", project: "daily-magic", cli: "claude", working: false),
            .init(id: "bot-3", name: "Docs updater", project: "northwind-docs", cli: "codex", working: false),
        ]
    }
}
