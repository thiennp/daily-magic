import SwiftUI
import AgentWitchLocalCore

struct ComputerView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var renameDraft: String = ""
    @State private var isRenaming = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                header
                connectedProjects
                agentTools
                DownloadAwlLink(style: .prominent)
                    .padding(.top, 4)
            }
            .padding(20)
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 420, minHeight: 480)
        .onAppear {
            renameDraft = store.computerName
            controller.refreshInstallAndHealth()
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
        .padding(14)
        .background(
            RoundedRectangle(cornerRadius: 14)
                .fill(MacAppTheme.heroGradient.opacity(0.12))
        )
    }

    private var connectedProjects: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Connected projects")
                .font(.headline)
            if store.hasConnectedProject {
                HStack {
                    Image(systemName: "folder.fill")
                        .foregroundStyle(MacAppTheme.accentWarm)
                    VStack(alignment: .leading) {
                        Text("infusion")
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
                .padding(10)
                .background(RoundedRectangle(cornerRadius: 10).fill(Color.white.opacity(0.9)))
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
                }
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(RoundedRectangle(cornerRadius: 10).strokeBorder(.secondary.opacity(0.3)))
            }
        }
    }

    private var agentTools: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Agent tools")
                .font(.headline)
            Text("Tools found on this computer. Add to project lets that project's bots use the tool here. It is off until the owner turns it on.")
                .font(.caption)
                .foregroundStyle(.secondary)
            if let reason = store.cliToggleDisabledReason {
                Text(reason)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.accentWarm)
            }
            ForEach(AgentCliKind.allCases) { kind in
                HStack {
                    Image(systemName: kind.systemImage)
                        .foregroundStyle(MacAppTheme.accent)
                        .frame(width: 22)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(kind.displayName)
                        Text("Add to project")
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
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
                .padding(10)
                .background(RoundedRectangle(cornerRadius: 10).fill(Color.white))
            }
        }
    }
}
