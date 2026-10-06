import AppKit
import SwiftUI
import AgentWitchLocalCore

struct SettingsView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var showRemoveConfirm = false
    @State private var tab: SettingsTab = .general
    @State private var isRunningChecks = false
    @State private var checkResults: [DiagCheck: DiagResult] = [:]
    @State private var reportStubMessage: String?

    private let keepOptions = [7, 14, 30, 90, 365]

    enum SettingsTab: String, CaseIterable, Identifiable {
        case general, updates, perms, startup, diag
        var id: String { rawValue }
        var title: String {
            switch self {
            case .general: return "General"
            case .updates: return "Updates"
            case .perms: return "Permissions"
            case .startup: return "Startup"
            case .diag: return "Diagnostics"
            }
        }
        var systemImage: String {
            switch self {
            case .general: return "slider.horizontal.3"
            case .updates: return "arrow.triangle.2.circlepath"
            case .perms: return "lock.shield"
            case .startup: return "power"
            case .diag: return "stethoscope"
            }
        }
    }

    enum DiagCheck: String, CaseIterable, Identifiable {
        case net, svc, disk, tools, perm
        var id: String { rawValue }
        var title: String {
            switch self {
            case .net: return "Internet"
            case .svc: return "AgentWitch Local"
            case .disk: return "Disk space"
            case .tools: return "Agent tools"
            case .perm: return "Permissions"
            }
        }
        var help: String {
            switch self {
            case .net: return "Reaching the AgentWitch service"
            case .svc: return "The background service on this computer"
            case .disk: return "Free space for History and updates"
            case .tools: return "Claude Code, Cursor CLI, Codex, Gemini CLI"
            case .perm: return "Notifications and folders"
            }
        }
    }

    struct DiagResult {
        var ok: Bool
        var message: String
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Image(systemName: "slider.horizontal.3")
                    .foregroundStyle(MacAppTheme.accent)
                Text("Settings")
                    .font(.title2.bold())
                Spacer()
            }
            .padding(16)
            .background(MacAppTheme.playSoft.opacity(0.45))

            Picker("Section", selection: $tab) {
                ForEach(SettingsTab.allCases) { t in
                    Text(t.title).tag(t)
                }
            }
            .pickerStyle(.segmented)
            .padding(.horizontal, 16)
            .padding(.bottom, 10)

            ScrollView {
                Group {
                    switch tab {
                    case .general: generalTab
                    case .updates: updatesTab
                    case .perms: permsTab
                    case .startup: startupTab
                    case .diag: diagTab
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 20)
            }
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 480, minHeight: 600)
        .onAppear { controller.refreshInstallAndHealth() }
        .alert("Remove this computer?", isPresented: $showRemoveConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Remove from AgentWitch", role: .destructive) {
                // Local UI stub: opens Connect so the user can manage computers on the web.
                controller.openConnectThisMac()
            }
        } message: {
            Text("Disconnects all projects here. Your files and History stay on this computer.")
        }
        .alert("Diagnostic report", isPresented: Binding(
            get: { reportStubMessage != nil },
            set: { if !$0 { reportStubMessage = nil } }
        )) {
            Button("OK", role: .cancel) { reportStubMessage = nil }
        } message: {
            Text(reportStubMessage ?? "")
        }
    }

    private var generalTab: some View {
        VStack(alignment: .leading, spacing: 14) {
            settingsCard("Account") {
                VStack(alignment: .leading, spacing: 8) {
                    Text(controller.bootstrapState == nil && controller.state != .notInstalled
                         ? "Signed in on this computer"
                         : "Sign in to connect this Mac…")
                        .font(.subheadline)
                    Text(controller.statusMessage)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    HStack {
                        Button("Open Connect this Mac…") {
                            controller.openConnectThisMac()
                        }
                        Button("Open AgentWitch") {
                            controller.openLocalStatus()
                        }
                    }
                }
            }
            settingsCard("This computer") {
                VStack(alignment: .leading, spacing: 8) {
                    LabeledContent("Computer name") {
                        Text(store.computerName)
                    }
                    Text("Shown in AgentWitch on the web.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Open Computer") {
                        NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.computer.rawValue)
                    }
                }
            }
            settingsCard("History") {
                VStack(alignment: .leading, spacing: 10) {
                    Toggle("Save History on this computer", isOn: $store.historyEnabled)
                    Text("Past tasks stay on this computer only.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Picker("Keep for", selection: $store.historyKeepDays) {
                        ForEach(keepOptions, id: \.self) { days in
                            Text(days == 365 ? "1 year" : "\(days) days").tag(days)
                        }
                    }
                    .pickerStyle(.menu)
                    Text("Older tasks are removed by themselves.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Open History") {
                        NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.history.rawValue)
                    }
                }
            }
            settingsCard("Notifications") {
                VStack(alignment: .leading, spacing: 8) {
                    Toggle("A task finishes", isOn: $store.notifyDone)
                    Toggle("A task fails", isOn: $store.notifyFail)
                    Toggle("An assistant needs my approval", isOn: $store.notifyAsk)
                }
            }
            settingsCard("Remove this computer") {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Remove from AgentWitch")
                        .font(.subheadline.weight(.semibold))
                    Text("Disconnects all projects here. Your files and History stay on this computer.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Remove…", role: .destructive) {
                        showRemoveConfirm = true
                    }
                }
            }
        }
    }

    private var updatesTab: some View {
        VStack(alignment: .leading, spacing: 14) {
            settingsCard("Updates") {
                VStack(alignment: .leading, spacing: 10) {
                    if let offer = controller.updateOffer {
                        Text(updateAvailableTitle(version: offer.version))
                            .font(.subheadline.weight(.semibold))
                        Button("Download update") {
                            controller.openUpdate()
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(MacAppTheme.accent)
                    } else {
                        Text("You are up to date (\(MacAppConstants.appVersion)).")
                            .font(.subheadline)
                        Button("Check for updates") {
                            controller.refreshInstallAndHealth()
                        }
                        .controlSize(.small)
                    }
                }
            }
            settingsCard("How to update") {
                VStack(alignment: .leading, spacing: 10) {
                    Toggle("Update by itself", isOn: $store.autoUpdate)
                    Text("Downloads in the background and asks before restarting.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Picker("Which versions", selection: $store.updateChannel) {
                        Text("Stable").tag("stable")
                        Text("Early access").tag("early")
                    }
                    .pickerStyle(.menu)
                    Text("Early access gets new things sooner and may have rough edges.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    // HARD: always show Download AWL even when connected / running / update offer present.
                    DownloadAwlLink(style: .prominent)
                    Text("Get AgentWitch Local for this or another Mac.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    private var permsTab: some View {
        VStack(alignment: .leading, spacing: 14) {
            settingsCard("Ask me first") {
                VStack(alignment: .leading, spacing: 8) {
                    Toggle("Before an assistant runs a command", isOn: $store.askBeforeCommand)
                    Text("You see what it wants to do and choose.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Toggle("Before an assistant changes files outside its folder", isOn: $store.askBeforeOutsideFolder)
                    Text("Recommended.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            settingsCard("Folders assistants can use") {
                VStack(alignment: .leading, spacing: 8) {
                    Text("No folders yet")
                        .font(.subheadline.weight(.semibold))
                    Text("Assistants can only work inside folders you add. Add-folder wiring stays a UI stub — no invented backend.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Add folder") {}
                        .disabled(true)
                        .help("Stub — folder picker not wired in this tip.")
                }
            }
            settingsCard("This computer allows") {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Notifications")
                        .font(.subheadline.weight(.semibold))
                    Text("So you hear about finished and failed tasks.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("Files and folders")
                        .font(.subheadline.weight(.semibold))
                    Text("So assistants can read and write in the folders above.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Open system settings") {
                        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy") {
                            NSWorkspace.shared.open(url)
                        }
                    }
                }
            }
        }
    }

    private var startupTab: some View {
        VStack(alignment: .leading, spacing: 14) {
            settingsCard("Startup") {
                VStack(alignment: .leading, spacing: 8) {
                    Toggle(
                        "Open at login",
                        isOn: Binding(
                            get: { controller.launchesAtLogin },
                            set: { controller.toggleLaunchAtLogin($0) }
                        )
                    )
                    Text(controller.launchesAtLogin
                         ? "Starts quietly when you sign in to this computer."
                         : "Will not open at login")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Toggle("Start running when it opens", isOn: $store.autoStartCore)
                    Text("Assistants can use this computer right away.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            settingsCard("Where it lives") {
                VStack(alignment: .leading, spacing: 8) {
                    Toggle("Show the icon in the menu bar or tray", isOn: $store.showTrayIcon)
                    Text("Needed for the quick menu.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Toggle("Keep running when the window is closed", isOn: $store.keepRunningClosed)
                    Text("Turn off to quit when you close the window.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    private var diagTab: some View {
        VStack(alignment: .leading, spacing: 14) {
            settingsCard("Checks") {
                VStack(alignment: .leading, spacing: 10) {
                    Button(isRunningChecks ? "Checking…" : "Run checks") {
                        runChecks()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.accent)
                    .disabled(isRunningChecks)
                    ForEach(DiagCheck.allCases) { check in
                        HStack(alignment: .top) {
                            Image(systemName: icon(for: check))
                                .foregroundStyle(color(for: check))
                                .frame(width: 18)
                            VStack(alignment: .leading, spacing: 2) {
                                Text(check.title)
                                    .font(.subheadline.weight(.semibold))
                                Text(checkResults[check]?.message ?? check.help)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                        }
                        .padding(8)
                        .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.surface2))
                    }
                }
            }
            settingsCard("Log") {
                VStack(alignment: .leading, spacing: 8) {
                    LabeledContent("Status") {
                        Text(controller.statusMessage)
                    }
                    LabeledContent("Runtime") {
                        Text(String(describing: controller.state))
                    }
                    Button("View logs") {
                        controller.openLogs()
                    }
                }
            }
            settingsCard("Report a problem") {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Diagnostic report")
                        .font(.subheadline.weight(.semibold))
                    Text("A small file with versions, status and the log. It has no task content. You choose where to send it.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Create report…") {
                        // Explicit stub — no invented zip exporter in this tip.
                        reportStubMessage = "Export diagnostics.zip is not wired in this tip. Use View logs for now."
                    }
                }
            }
            // HARD: Download AWL always visible
            DownloadAwlLink(style: .prominent)
        }
    }

    private func runChecks() {
        isRunningChecks = true
        checkResults = [:]
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            var next: [DiagCheck: DiagResult] = [:]
            next[.net] = DiagResult(ok: true, message: "Connected (UI check stub).")
            next[.svc] = DiagResult(
                ok: controller.state == .running,
                message: controller.state == .running
                    ? "Running, version \(MacAppConstants.appVersion)."
                    : "The background service did not answer. Start AgentWitch Local."
            )
            next[.disk] = DiagResult(ok: true, message: "Enough free space (UI stub).")
            let ready = store.toolsReadyCount
            next[.tools] = DiagResult(
                ok: ready >= 2,
                message: "\(ready) of \(AgentCliKind.allCases.count) tools ready. See Computer."
            )
            next[.perm] = DiagResult(ok: true, message: "All allowed (UI stub).")
            checkResults = next
            isRunningChecks = false
        }
    }

    private func icon(for check: DiagCheck) -> String {
        guard let r = checkResults[check] else { return "circle" }
        return r.ok ? "checkmark.circle.fill" : "exclamationmark.triangle.fill"
    }

    private func color(for check: DiagCheck) -> Color {
        guard let r = checkResults[check] else { return .secondary }
        return r.ok ? MacAppTheme.success : MacAppTheme.accentWarm
    }

    private func settingsCard<Content: View>(_ title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.headline)
            content()
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(MacAppTheme.surface)
                .shadow(color: .black.opacity(0.04), radius: 4, y: 1)
        )
    }
}
