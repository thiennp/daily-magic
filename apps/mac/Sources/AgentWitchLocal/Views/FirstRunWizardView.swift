import SwiftUI
import AgentWitchLocalCore

/// First-run surface that reuses the existing bootstrap FSA (PKCE / install / setup).
/// Does not invent a parallel install path.
struct FirstRunWizardView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                HStack {
                    Image(systemName: "wand.and.stars")
                        .foregroundStyle(MacAppTheme.accent)
                    Text("Setting up your computer")
                        .font(.title2.bold())
                }
                stepList
                statusCard
                actions
                agentToolsPreview
                DownloadAwlLink(style: .prominent)
                Text("Need the installer on another Mac? Download AWL stays available here.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(20)
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 420, minHeight: 480)
    }

    private var stepList: some View {
        VStack(alignment: .leading, spacing: 8) {
            wizardStep("1", "Download components", "A private folder for your projects", active: bootstrapIs(.checking) || bootstrapIs(.installing))
            wizardStep("2", "Sign in", "Connect this computer", active: bootstrapIs(.signingIn))
            wizardStep("3", "Computer name", store.computerName, active: false)
            wizardStep("4", "Look for your agent tools", "Claude Code, Cursor CLI, Codex, Gemini CLI", active: bootstrapIs(.settingUp))
            wizardStep("5", "You are all set", controller.statusMessage, active: controller.bootstrapState == nil && controller.state == .running)
        }
    }

    private var statusCard: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(controller.statusMessage)
                .font(.headline)
            if let bootstrap = controller.bootstrapState {
                Text(bootstrapDetail(bootstrap))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: 12).fill(MacAppTheme.heroGradient.opacity(0.15)))
    }

    @ViewBuilder
    private var actions: some View {
        if let bootstrap = controller.bootstrapState {
            switch bootstrap {
            case .checking, .installing, .settingUp:
                ProgressView()
                    .controlSize(.small)
            case .signingIn:
                Button("Open browser again") {
                    controller.restartBootstrapSignIn()
                }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.accent)
                Button("Open Connect this Mac…") {
                    controller.openConnectThisMac()
                }
            case .error:
                Button("Retry") {
                    controller.retryBootstrap()
                }
                .buttonStyle(.borderedProminent)
                Button("Copy install command") {
                    controller.copyBootstrapFallbackInstallCommand()
                }
                Button("Open Connect this Mac…") {
                    controller.openConnectThisMac()
                }
            case .connected:
                Text("Connected")
                    .foregroundStyle(MacAppTheme.success)
            }
        } else if controller.state == .notInstalled {
            Button("Open Connect this Mac…") {
                controller.openConnectThisMac()
            }
            .buttonStyle(.borderedProminent)
        } else {
            Text("You are all set")
                .font(.headline)
                .foregroundStyle(MacAppTheme.success)
            Button("Start AgentWitch Local") {
                controller.startCore()
            }
            .buttonStyle(.borderedProminent)
            .tint(MacAppTheme.accent)
            .disabled(controller.state == .running || controller.state == .starting)
        }
    }

    private var agentToolsPreview: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Agent tools")
                .font(.headline)
            Text("Found tools stay off for projects until the owner turns Add to project on.")
                .font(.caption)
                .foregroundStyle(.secondary)
            ForEach(AgentCliKind.allCases) { kind in
                HStack {
                    Text(kind.displayName)
                    Spacer()
                    Text((store.cliAddToProject[kind] ?? false) ? "On" : "Off (default)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(12)
        .background(RoundedRectangle(cornerRadius: 10).fill(Color.white))
    }

    private func wizardStep(_ n: String, _ title: String, _ detail: String, active: Bool) -> some View {
        HStack(alignment: .top, spacing: 10) {
            Text(n)
                .font(.caption.weight(.bold))
                .frame(width: 22, height: 22)
                .background(Circle().fill(active ? MacAppTheme.accent : Color.secondary.opacity(0.25)))
                .foregroundStyle(active ? .white : .primary)
            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.subheadline.weight(active ? .semibold : .regular))
                Text(detail).font(.caption).foregroundStyle(.secondary)
            }
        }
    }

    private func bootstrapIs(_ state: MacAppBootstrapState) -> Bool {
        controller.bootstrapState == state
    }

    private func bootstrapDetail(_ state: MacAppBootstrapState) -> String {
        switch state {
        case .checking: return "Checking install…"
        case .signingIn: return "Waiting for browser sign-in…"
        case .installing: return "Installing…"
        case .settingUp: return "Waiting for local health…"
        case .connected: return "Connected"
        case .error(let reason): return reason
        }
    }
}
