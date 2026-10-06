import AppKit
import SwiftUI
import AgentWitchLocalCore

struct ComputerView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var renameDraft: String = ""
    @State private var isRenaming = false
    @State private var tab: ComputerTab = .projects
    @State private var isScanning = false
    @State private var howtoKind: AgentCliKind?

    enum ComputerTab: String, CaseIterable, Identifiable {
        case projects, tools, bots
        var id: String { rawValue }
        var title: String {
            switch self {
            case .projects: return "Projects"
            case .tools: return "Agent tools"
            case .bots: return "Bots"
            }
        }
        var systemImage: String {
            switch self {
            case .projects: return "folder.fill"
            case .tools: return "terminal"
            case .bots: return "face.smiling"
            }
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header
            statsRow
                .padding(.horizontal, 20)
                .padding(.bottom, 8)
            Picker("Section", selection: $tab) {
                ForEach(ComputerTab.allCases) { t in
                    Label(t.title, systemImage: t.systemImage).tag(t)
                }
            }
            .pickerStyle(.segmented)
            .padding(.horizontal, 20)
            .padding(.bottom, 10)

            ScrollView {
                Group {
                    switch tab {
                    case .projects: connectedProjects
                    case .tools: agentTools
                    case .bots: botsTab
                    }
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 12)

                DownloadAwlLink(style: .prominent)
                    .padding(.horizontal, 20)
                    .padding(.bottom, 20)
            }
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 460, minHeight: 520)
        .onAppear {
            renameDraft = store.computerName
            controller.refreshInstallAndHealth()
        }
        .sheet(item: $howtoKind) { kind in
            VStack(alignment: .leading, spacing: 12) {
                Text(kind.installTitle)
                    .font(.headline)
                Text(kind == .codex
                     ? "Run this in a terminal, then check again."
                     : "Install on this computer, then check again.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Text(kind.installHint)
                    .font(.system(.body, design: .monospaced))
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.surface2))
                Button("Copy command") {
                    NSPasteboard.general.clearContents()
                    NSPasteboard.general.setString(kind.installHint, forType: .string)
                }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.accent)
                Button("Done") { howtoKind = nil }
            }
            .padding(20)
            .frame(width: 420)
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "desktopcomputer")
                    .foregroundStyle(MacAppTheme.accent)
                Text("Computer")
                    .font(.title2.bold())
                Spacer()
                Text(controller.statusMessage)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            if isRenaming {
                HStack {
                    TextField("Computer name", text: $renameDraft)
                        .textFieldStyle(.roundedBorder)
                    Button("Save") {
                        let trimmed = renameDraft.trimmingCharacters(in: .whitespacesAndNewlines)
                        if trimmed.count >= 2 {
                            store.computerName = trimmed
                            isRenaming = false
                        }
                    }
                    .disabled(renameDraft.trimmingCharacters(in: .whitespacesAndNewlines).count < 2)
                    Button("Cancel") { isRenaming = false }
                }
            } else {
                HStack {
                    Text(store.computerName)
                        .font(.headline)
                    Button("Rename") {
                        renameDraft = store.computerName
                        isRenaming = true
                    }
                    .buttonStyle(.bordered)
                }
            }
            Text("Shown in AgentWitch on the web.")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(16)
        .background(MacAppTheme.playSoft.opacity(0.55))
    }

    private var statsRow: some View {
        HStack(spacing: 10) {
            statChip("Tools ready", "\(store.toolsReadyCount) / \(AgentCliKind.allCases.count)", MacAppTheme.agentSoft)
            statChip("Projects", store.hasConnectedProject ? "1" : "0", MacAppTheme.skillSoft)
            statChip("Status", controller.state == .running ? "Running" : "Idle", MacAppTheme.botSoft)
        }
    }

    private func statChip(_ title: String, _ value: String, _ fill: Color) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title)
                .font(.caption2)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.subheadline.weight(.semibold))
        }
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: 10).fill(fill))
    }

    private var connectedProjects: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Connected projects")
                .font(.headline)
            if store.hasConnectedProject {
                HStack {
                    Image(systemName: "folder.fill")
                        .foregroundStyle(MacAppTheme.accentWarm)
                        .frame(width: 28, height: 28)
                        .background(Circle().fill(MacAppTheme.skillSoft))
                    VStack(alignment: .leading) {
                        Text("infusion")
                            .font(.subheadline.weight(.semibold))
                        Text(store.isOwner ? "You are the owner." : "You are a member.")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
                    Button("Open on web") {
                        controller.openConnectThisMac()
                    }
                    .buttonStyle(.borderless)
                }
                .padding(12)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(MacAppTheme.surface)
                        .shadow(color: .black.opacity(0.04), radius: 3, y: 1)
                )
            } else {
                VStack(alignment: .leading, spacing: 8) {
                    Text("No project yet")
                        .font(.subheadline.weight(.semibold))
                    Text("Connect this computer to a project to let its bots work here.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Button("Connect a project") {
                        controller.openConnectThisMac()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.accent)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .strokeBorder(MacAppTheme.border)
                        .background(RoundedRectangle(cornerRadius: 12).fill(MacAppTheme.surface))
                )
            }
        }
    }

    private var agentTools: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text("Agent tools")
                    .font(.headline)
                Spacer()
                Button(isScanning ? "Checking…" : "Check again") {
                    isScanning = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
                        store.markToolsRescanned()
                        isScanning = false
                    }
                }
                .disabled(isScanning)
                .controlSize(.small)
            }
            Text("Tools found on this computer. Add to project lets that project's bots use the tool here. It is off until the owner turns it on.")
                .font(.caption)
                .foregroundStyle(.secondary)
            if let reason = store.cliToggleDisabledReason {
                Text(reason)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.accentWarm)
                    .padding(8)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.warningSoft))
            }
            ForEach(AgentCliKind.allCases) { kind in
                let installed = store.cliInstalled[kind] ?? false
                HStack(alignment: .top) {
                    Image(systemName: kind.systemImage)
                        .foregroundStyle(MacAppTheme.accent)
                        .frame(width: 28, height: 28)
                        .background(Circle().fill(MacAppTheme.accentSoft))
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(kind.displayName)
                                .font(.subheadline.weight(.semibold))
                            Text(installed ? "Ready" : "Not installed")
                                .font(.caption2.weight(.semibold))
                                .padding(.horizontal, 7)
                                .padding(.vertical, 2)
                                .background(Capsule().fill(installed ? MacAppTheme.successSoft : MacAppTheme.dangerSoft))
                                .foregroundStyle(installed ? MacAppTheme.success : MacAppTheme.danger)
                        }
                        if installed {
                            Text("Add to project")
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                        } else {
                            Button(kind.installTitle) { howtoKind = kind }
                                .buttonStyle(.borderless)
                                .font(.caption)
                        }
                    }
                    Spacer()
                    if installed {
                        Toggle(
                            "Add to project",
                            isOn: Binding(
                                get: { store.cliAddToProject[kind] ?? false },
                                set: { store.setCliAddToProject(kind, enabled: $0) }
                            )
                        )
                        .labelsHidden()
                        .disabled(!store.canEditCliToggles)
                        .accessibilityLabel("Add \(kind.displayName) to project")
                    }
                }
                .padding(12)
                .opacity(installed ? 1 : 0.85)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(MacAppTheme.surface)
                        .shadow(color: .black.opacity(0.04), radius: 3, y: 1)
                )
            }
        }
    }

    private var botsTab: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Bots")
                .font(.headline)
            if store.botStubs.isEmpty || !store.hasConnectedProject {
                VStack(alignment: .leading, spacing: 8) {
                    Text("No bots on this computer")
                        .font(.subheadline.weight(.semibold))
                    Text("Bots from your connected projects show up here when they run.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(RoundedRectangle(cornerRadius: 12).fill(MacAppTheme.botSoft.opacity(0.5)))
            } else {
                ForEach(store.botStubs) { bot in
                    HStack {
                        Image(systemName: "face.smiling")
                            .foregroundStyle(MacAppTheme.accent)
                            .frame(width: 28, height: 28)
                            .background(Circle().fill(MacAppTheme.botSoft))
                        VStack(alignment: .leading, spacing: 2) {
                            Text(bot.name)
                                .font(.subheadline.weight(.semibold))
                            Text("\(bot.project) · \(bot.cli)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        Text(bot.working ? "Working" : "Idle")
                            .font(.caption2.weight(.semibold))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(Capsule().fill(bot.working ? MacAppTheme.successSoft : MacAppTheme.surface2))
                    }
                    .padding(12)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(MacAppTheme.surface)
                            .shadow(color: .black.opacity(0.04), radius: 3, y: 1)
                    )
                }
            }
        }
    }
}
