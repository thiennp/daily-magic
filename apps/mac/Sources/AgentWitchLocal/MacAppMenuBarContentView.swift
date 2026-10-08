import AppKit
import SwiftUI
import AgentWitchLocalCore

/// AWL-H1 — Menu bar companion chrome. Works with the app window closed.
/// States from HTML: status pill, Start/Stop / Start setup, Open window, Sign in,
/// projects peek, Update ready, Quit. Mirrors MacAppChromeStatus with AWL-H2.
struct MacAppMenuBarContentView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    let presenter: MacAppMainWindowPresenter
    let presenting: AppKitMacAppWindowPresenting
    @Environment(\.openWindow) private var openWindow
    @State private var showQuitConfirm = false

    private var chrome: MacAppChromeStatus { controller.chromeStatus }

    /// Translocated (quarantined copy) or not installed in an Applications folder.
    private var showTranslocationBanner: Bool {
        let path = Bundle.main.bundlePath
        return isAppTranslocated(bundlePath: path)
            || !isAppInApplicationsFolder(bundlePath: path, homeDirectory: NSHomeDirectory())
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
            if showTranslocationBanner {
                Divider().background(MacAppTheme.border)
                translocationStrip
                    .padding(12)
            }
            Divider().background(MacAppTheme.border)
            footer
        }
        .frame(width: 320)
        .background(MacAppTheme.bg)
        .preferredColorScheme(.light)
        .onAppear {
            controller.refreshInstallAndHealth()
            presenting.openWindowAction = {
                openWindow(id: MacAppWindowID.main.rawValue)
            }
        }
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
            }

        case .settingUp:
            VStack(alignment: .leading, spacing: 8) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                ProgressView()
                    .progressViewStyle(.linear)
                    .tint(MacAppTheme.brand)
                // AWL-H5 will bind real step progress here
                Text(controller.statusMessage.isEmpty ? "Setting up…" : sanitizeChromeMessage(controller.statusMessage))
                    .font(.caption2)
                    .foregroundStyle(MacAppTheme.fgSubtle)
                    .lineLimit(2)
            }

        case .signedOut:
            VStack(alignment: .leading, spacing: 10) {
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                if controller.isWaitingInBrowserForSignIn {
                    ProgressView()
                        .progressViewStyle(.linear)
                        .tint(MacAppTheme.brand)
                    Button("Cancel sign-in") { controller.cancelSignInStub() }
                        .frame(maxWidth: .infinity)
                } else {
                    Button("Sign in") {
                        openMainWindow(page: .computer)
                        controller.beginSignInStub()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brand)
                    .frame(maxWidth: .infinity)
                }
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
                Text(chrome.detailTitle)
                    .font(.subheadline.weight(.semibold))
                Text(chrome.detailSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
                    .fixedSize(horizontal: false, vertical: true)
                HStack {
                    Button("Try again") { controller.retrySetup() }
                        .buttonStyle(.borderedProminent)
                        .tint(MacAppTheme.brand)
                    Button("See log") { controller.openLogs() }
                        .buttonStyle(.bordered)
                }
            }

        case .running, .starting, .stopped:
            accountRow
            runRow
            statusLines
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
            if controller.accounts.count > 1 {
                Menu {
                    ForEach(controller.accounts.filter { $0.email != controller.signedInEmail }, id: \.email) { account in
                        Button("Switch to \(account.email)") {
                            controller.switchAccount(to: account.email)
                        }
                    }
                } label: {
                    Image(systemName: "arrow.left.arrow.right.circle")
                }
                .menuStyle(.borderlessButton)
                .fixedSize()
                .help("Switch account")
            }
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
                // eb0fcdf9: `.bordered` rendered a blank label in the popover (same as 0.2.5's
                // Show Applications); draw the labels ourselves like that fix.
                popoverActionButton("Restart", prominent: false) { controller.restartCore() }
                popoverActionButton("Stop", prominent: false) { controller.stopCore() }
            case .starting:
                Button("Starting…") {}
                    .disabled(true)
                    .controlSize(.small)
            default:
                Button("Start") { controller.startOrRepairSetup() }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brandInk)
                    .controlSize(.small)
            }
        }
        .padding(10)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.surface))
        .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(MacAppTheme.border))
    }

    /// Plain-style button with an explicit label + background (system bordered styles
    /// can render the label invisible in the MenuBarExtra popover).
    private func popoverActionButton(
        _ title: String,
        prominent: Bool,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(prominent ? Color.white : MacAppTheme.fg)
                .padding(.horizontal, 10)
                .padding(.vertical, 4)
                .background(
                    RoundedRectangle(cornerRadius: 6)
                        .fill(prominent ? MacAppTheme.brandInk : MacAppTheme.surface2)
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 6)
                        .strokeBorder(prominent ? Color.clear : MacAppTheme.border)
                )
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(title)
    }

    /// Thin AWL: plain-language AWB / AWI status (projects live in AgentWitch).
    private var statusLines: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("On this computer")
                .font(.caption.weight(.semibold))
                .foregroundStyle(MacAppTheme.fgMuted)
            statusLine("Connection to AgentWitch", value: connectionValue)
            statusLine("Assistant tools", value: toolsValue)
        }
        .padding(.top, 6)
    }

    private var connectionValue: String {
        guard controller.state == .running else { return "Stopped" }
        switch controller.connectionLive {
        case true?: return "Connected"
        case false?: return "Not connected yet"
        case nil: return "Checking…"
        }
    }

    private var toolsValue: String {
        var parts = ["\(store.toolsReadyCount) found"]
        if controller.state == .running, let port = controller.localAppPort {
            parts.append("port \(port)")
        }
        return parts.joined(separator: " · ")
    }

    private func statusLine(_ title: String, value: String) -> some View {
        HStack {
            Text(title)
                .font(.caption)
                .foregroundStyle(MacAppTheme.fg)
            Spacer()
            Text(value)
                .font(.caption)
                .foregroundStyle(MacAppTheme.fgSubtle)
        }
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

    private var translocationStrip: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Move AgentWitch Local to Applications")
                .font(.caption.weight(.semibold))
                .foregroundStyle(MacAppTheme.brandInk)
            Text("macOS is running a temporary copy. Quit, drag AgentWitch Local into Applications, then open it from there.")
                .font(.caption2)
                .foregroundStyle(MacAppTheme.fgMuted)
                .fixedSize(horizontal: false, vertical: true)
            // 0.2.5: `.bordered` + `.mini` + tint rendered a blank label in the popover.
            Button {
                NSWorkspace.shared.open(URL(fileURLWithPath: "/Applications"))
            } label: {
                Text("Show Applications")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(Color.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(RoundedRectangle(cornerRadius: 6).fill(MacAppTheme.brand))
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Show Applications")
            .padding(.top, 4)
        }
        .padding(10)
        .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.accentSoft))
    }

    private var footer: some View {
        VStack(spacing: 0) {
            footerRow("Open window", shortcut: "⌘O") { openMainWindow(page: .computer) }
                .keyboardShortcut("o")
            footerRow("Settings…", shortcut: "⌘,") { openMainWindow(page: .settings) }
                .keyboardShortcut(",")
                .disabled(chrome.kind == .notSetUp || chrome.kind == .settingUp)
                .help(chrome.kind == .notSetUp || chrome.kind == .settingUp ? "Available after setup" : "Settings")
            Divider().padding(.horizontal, 8).padding(.vertical, 4)
            footerRow("Quit AgentWitch Local", shortcut: "⌘Q") { showQuitConfirm = true }
        }
        .padding(5)
        .background(MacAppTheme.surface)
    }

    private func footerRow(_ title: String, shortcut: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack {
                Text(title).font(.system(size: 13)).foregroundStyle(MacAppTheme.fg)
                Spacer()
                Text(shortcut).font(.system(size: 12)).foregroundStyle(MacAppTheme.fgSubtle)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }

    private func openMainWindow(page: MacAppSidebarPage) {
        presenter.present(pageRawValue: page.rawValue)
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
