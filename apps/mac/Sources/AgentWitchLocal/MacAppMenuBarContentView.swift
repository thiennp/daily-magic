import AppKit
import SwiftUI
import AgentWitchLocalCore

/// AWL-H1 — Menu bar companion chrome. Works with the app window closed.
/// States from HTML: status pill, Start/Stop / Start setup, Open window, Sign in,
/// projects peek, Update ready, Quit. Mirrors MacAppChromeStatus with AWL-H2.
struct MacAppMenuBarContentView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @Environment(\.openWindow) private var openWindow
    @State private var showQuitConfirm = false

    private var chrome: MacAppChromeStatus {
        MacAppChromeStatus.resolve(
            runtime: controller.state,
            bootstrap: controller.bootstrapState,
            signedIn: (controller.signedInEmail != nil),
            offline: controller.isOfflineStub,
            updateReady: controller.updateOffer != nil,
            setupSession: controller.setupSession
        )
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header
            Divider().background(MacAppTheme.border)
            bodyContent
                .padding(12)
            if let offer = controller.updateOffer {
                Divider().background(MacAppTheme.border)
                updateStrip(offer)
            }
            Divider().background(MacAppTheme.border)
            footer
        }
        .frame(width: 320)
        .background(MacAppTheme.bg)
        .preferredColorScheme(.light)
        .onAppear { controller.refreshInstallAndHealth() }
        .awlWindowOpener()
        .alert("Quit AgentWitch Local?", isPresented: $showQuitConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Quit", role: .destructive) {
                NSApplication.shared.terminate(nil)
            }
        } message: {
            Text(controller.state == .running
                 ? "Assistants cannot use this computer until you open the app again. The menu bar icon goes away until you open the app again."
                 : "The menu bar icon goes away until you open the app again.")
        }
    }

    private var header: some View {
        HStack(alignment: .center, spacing: 10) {
            Text("AW")
                .font(.system(size: 10, weight: .bold, design: .rounded))
                .foregroundStyle(.white)
                .frame(width: 20, height: 20)
                .background(RoundedRectangle(cornerRadius: 5).fill(MacAppTheme.brand))
            VStack(alignment: .leading, spacing: 2) {
                Text("AgentWitch Local")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Text(store.computerName)
                    .font(.caption2)
                    .foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            statusPill
        }
        .padding(12)
        .background(MacAppTheme.surface)
    }

    private var statusPill: some View {
        let colors = MacAppTheme.pillColors(for: chrome.kind)
        return HStack(spacing: 5) {
            Circle().fill(colors.fg).frame(width: 6, height: 6)
            Text(chrome.pillLabel)
                .font(.caption2.weight(.semibold))
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 3)
        .background(Capsule().fill(colors.bg))
        .foregroundStyle(colors.fg)
    }

    @ViewBuilder
    private var bodyContent: some View {
        switch chrome.kind {
        case .notSetUp:
            VStack(alignment: .leading, spacing: 10) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                Button("Start setup") { controller.startOrRepairSetup() }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brand)
                    .controlSize(.large)
                    .frame(maxWidth: .infinity)
                    .disabled(controller.setupSession.isInProgress)
            }

        case .settingUp:
            VStack(alignment: .leading, spacing: 8) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                if case .running(let step, let percent) = controller.setupSession {
                    Text(step.title)
                        .font(.caption)
                        .foregroundStyle(MacAppTheme.fgMuted)
                    ProgressView(value: Double(max(0, min(percent, 100))), total: 100)
                        .progressViewStyle(.linear)
                        .tint(MacAppTheme.brand)
                } else {
                    Text(chrome.detailSubtitle)
                        .font(.caption)
                        .foregroundStyle(MacAppTheme.fgMuted)
                    ProgressView()
                        .progressViewStyle(.linear)
                        .tint(MacAppTheme.brand)
                }
            }

        case .signedOut:
            VStack(alignment: .leading, spacing: 10) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                Button("Sign in") {
                    openMainWindow(page: .computer)
                    controller.beginSignInStub()
                }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.brand)
                .frame(maxWidth: .infinity)
            }

        case .waitingForInternet:
            accountRow
            VStack(alignment: .leading, spacing: 8) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                Button("Try now") { controller.refreshInstallAndHealth() }
                    .frame(maxWidth: .infinity)
            }

        case .problem:
            if (controller.signedInEmail != nil) { accountRow }
            VStack(alignment: .leading, spacing: 8) {
                Text(
                    controller.setupSession.failureKind != nil
                        ? MacAppSetupFailureKind.couldNotFinishTitle
                        : chrome.detailTitle
                )
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                    .fixedSize(horizontal: false, vertical: true)
                HStack {
                    Button("Try again") { controller.retryFromProblem() }
                        .buttonStyle(.borderedProminent)
                        .tint(MacAppTheme.brand)
                        .disabled(controller.setupSession.isInProgress)
                    Button("See log") { controller.openSetupLog() }
                        .buttonStyle(.bordered)
                        .disabled(!controller.canOpenSetupLog)
                }
            }

        case .running, .starting, .stopped:
            accountRow
            runRow
            if store.hasConnectedProject {
                projectsPeek
            }
        }
    }

    private var accountRow: some View {
        HStack(spacing: 8) {
            Text(accountInitials)
                .font(.caption2.weight(.bold))
                .foregroundStyle(.white)
                .frame(width: 28, height: 28)
                .background(Circle().fill(MacAppTheme.brand))
            VStack(alignment: .leading, spacing: 1) {
                Text(accountDisplayName)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Text(controller.signedInEmail ?? "Signed in")
                    .font(.caption2)
                    .foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
        }
        .padding(.bottom, 4)
    }

    private var runRow: some View {
        HStack(alignment: .center) {
            VStack(alignment: .leading, spacing: 2) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            switch chrome.kind {
            case .running:
                Button("Stop") { controller.stopCore() }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
            case .starting:
                Button("Starting…") {}
                    .disabled(true)
                    .controlSize(.small)
            default:
                Button("Start") { controller.startOrRepairSetup() }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brandInk)
                    .controlSize(.small)
                    .disabled(controller.setupSession.isInProgress)
            }
        }
        .padding(10)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.surface))
        .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(MacAppTheme.border))
    }

    private var projectsPeek: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Projects")
                .font(.caption.weight(.semibold))
                .foregroundStyle(MacAppTheme.fgMuted)
            // Stub peek — AWL-H8 binds real connected projects
            HStack(spacing: 8) {
                RoundedRectangle(cornerRadius: 4)
                    .fill(MacAppTheme.accentSoft2)
                    .frame(width: 22, height: 22)
                    .overlay(Image(systemName: "folder.fill").font(.caption2).foregroundStyle(MacAppTheme.brand))
                Text(store.computerName)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(MacAppTheme.fg)
                Spacer()
                Text(store.isOwner ? "Owner" : "Member")
                    .font(.caption2)
                    .foregroundStyle(MacAppTheme.fgSubtle)
            }
            .padding(8)
            .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.tile))
        }
        .padding(.top, 6)
    }

    private func updateStrip(_ offer: UpdateOffer) -> some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text("Update ready · \(offer.version)")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(MacAppTheme.brandInk)
                Text("What is new in version \(offer.version)")
                    .font(.caption2)
                    .foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            Button("Restart to update") { controller.openUpdate() }
                .buttonStyle(.borderedProminent)
                .controlSize(.small)
                .tint(MacAppTheme.brand)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(MacAppTheme.accentSoft)
    }

    private var footer: some View {
        HStack(spacing: 8) {
            Button {
                openMainWindow(page: .computer)
            } label: {
                Label("Open window", systemImage: "macwindow")
            }
            .buttonStyle(.borderless)
            .controlSize(.small)

            Spacer()

            Button {
                showQuitConfirm = true
            } label: {
                Label("Quit", systemImage: "power")
            }
            .buttonStyle(.borderless)
            .controlSize(.small)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(MacAppTheme.surface)
    }

    private func openMainWindow(page: MacAppSidebarPage) {
        openWindow(id: MacAppWindowID.main.rawValue)
        NotificationCenter.default.post(name: .awlSelectSidebarPage, object: page.rawValue)
    }

    private var accountInitials: String {
        let email = controller.signedInEmail ?? "A"
        let local = email.split(separator: "@").first.map(String.init) ?? "A"
        let parts = local.split(separator: ".")
        if parts.count >= 2 {
            return String(parts[0].prefix(1) + parts[1].prefix(1)).uppercased()
        }
        return String(local.prefix(1)).uppercased()
    }

    private var accountDisplayName: String {
        let email = controller.signedInEmail ?? "Account"
        if let local = email.split(separator: "@").first {
            return local.split(separator: ".").map { $0.prefix(1).uppercased() + $0.dropFirst() }.joined(separator: " ")
        }
        return "Account"
    }
}
