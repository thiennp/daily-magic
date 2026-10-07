import AppKit
import SwiftUI
import AgentWitchLocalCore

/// AWL-H2 — Grok Bot–class app window shell.
/// Sidebar: Computer · History · Settings. Main pane chrome + account chip.
/// Content mounts leave clean hooks for AWL-H3 / H4 / H8.
struct MacAppMainWindowView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var page: MacAppSidebarPage = .computer
    @State private var showAccountMenu = false
    @State private var showSignOutConfirm = false

    private var chrome: MacAppChromeStatus {
        MacAppChromeStatus.resolve(
            runtime: controller.state,
            bootstrap: controller.bootstrapState,
            signedIn: (controller.signedInEmail != nil),
            offline: controller.isOfflineStub,
            updateReady: controller.updateOffer != nil
        )
    }

    var body: some View {
        HStack(spacing: 0) {
            sidebar
            Divider().background(MacAppTheme.border)
            mainPane
        }
        .frame(minWidth: 960, minHeight: 640)
        .frame(idealWidth: 1280, idealHeight: 800)
        .background(MacAppTheme.bg)
        .preferredColorScheme(.light)
        .onAppear { controller.refreshInstallAndHealth() }
        .onReceive(NotificationCenter.default.publisher(for: .awlSelectSidebarPage)) { note in
            if let raw = note.object as? String, let p = MacAppSidebarPage(rawValue: raw) {
                page = p
            }
        }
        .alert(AWLSignOutConfirmCopy.title, isPresented: $showSignOutConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Sign out", role: .destructive) {
                controller.signOut()
            }
        } message: {
            Text(AWLSignOutConfirmCopy.message(
                displayName: controller.signedInDisplayName ?? "This account",
                email: controller.signedInEmail ?? ""
            ))
        }
    }

    // MARK: - Sidebar

    private var sidebar: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Traffic lights are system-drawn; leave brand row below titlebar inset.
            HStack(spacing: 10) {
                Text("AW")
                    .font(.system(size: 11, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)
                    .frame(width: 22, height: 22)
                    .background(RoundedRectangle(cornerRadius: 6).fill(MacAppTheme.brand))
                Text("AgentWitch Local")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(MacAppTheme.fg)
            }
            .padding(.horizontal, 16)
            .padding(.top, 14)
            .padding(.bottom, 18)

            VStack(alignment: .leading, spacing: 4) {
                ForEach(MacAppSidebarPage.allCases) { item in
                    sidebarButton(item)
                }
            }
            .padding(.horizontal, 10)

            Spacer(minLength: 12)

            sidebarFooter
        }
        .frame(width: 220)
        .background(MacAppTheme.surface2)
    }

    private func sidebarButton(_ item: MacAppSidebarPage) -> some View {
        let selected = page == item
        let setupOk = controller.bootstrapState == nil && controller.state != .notInstalled
        let disabled = !setupOk && item != .computer
        return Button {
            page = item
        } label: {
            HStack(spacing: 8) {
                Image(systemName: item.systemImage)
                    .frame(width: 16)
                Text(item.title)
                if item == .history {
                    Text("Offline")
                        .font(.caption2.weight(.semibold))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Capsule().fill(MacAppTheme.fill))
                        .foregroundStyle(MacAppTheme.fgMuted)
                }
                Spacer()
            }
            .font(.system(size: 13, weight: selected ? .semibold : .regular))
            .foregroundStyle(selected ? MacAppTheme.brand : MacAppTheme.fg)
            .padding(.horizontal, 10)
            .padding(.vertical, 8)
            .background(
                RoundedRectangle(cornerRadius: 8)
                    .fill(selected ? MacAppTheme.accentSoft : Color.clear)
            )
        }
        .buttonStyle(.plain)
        .disabled(disabled)
        .opacity(disabled ? 0.45 : 1)
        .help(disabled ? "Available after setup" : item.title)
    }

    private var sidebarFooter: some View {
        VStack(alignment: .leading, spacing: 10) {
            if let offer = controller.updateOffer {
                HStack {
                    Text("Update ready · \(offer.version)")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(MacAppTheme.brandInk)
                    Spacer()
                    Button("Restart") { controller.openUpdate() }
                        .buttonStyle(.bordered)
                        .controlSize(.mini)
                        .tint(MacAppTheme.brand)
                }
                .padding(10)
                .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.accentSoft))
            }

            HStack(spacing: 8) {
                Image(systemName: "desktopcomputer")
                    .foregroundStyle(MacAppTheme.brand)
                VStack(alignment: .leading, spacing: 2) {
                    Text("This computer")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(MacAppTheme.fg)
                    Text("\(store.computerName) · \(store.hasConnectedProject && (controller.signedInEmail != nil) ? "connected" : "not connected")")
                        .font(.caption2)
                        .foregroundStyle(MacAppTheme.fgMuted)
                }
            }
            .padding(10)
        }
        .padding(.horizontal, 10)
        .padding(.bottom, 14)
    }

    // MARK: - Main pane chrome

    private var mainPane: some View {
        VStack(spacing: 0) {
            header
            Divider().background(MacAppTheme.border)
            Group {
                switch page {
                case .computer:
                    // AWL-H8 / H3 / H5 mount: Computer pane content
                    ComputerView(controller: controller, store: store)
                case .promptOptimizer:
                    // AWL-H7 PM-3 (b): Prompt optimizer WKWebView on discovered port
                    PromptOptimizerView(controller: controller)
                case .history:
                    // AWL-H4 mount: History chrome
                    HistoryView(controller: controller, store: store)
                case .settings:
                    // AWL-H4 mount: Settings chrome (+ H6 port range placeholder)
                    SettingsView(controller: controller, store: store)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .background(MacAppTheme.bg)
    }

    private var header: some View {
        HStack(spacing: 12) {
            Text(page.title)
                .font(.title2.weight(.semibold))
                .foregroundStyle(MacAppTheme.fg)
            statusPill
            Spacer()
            startStopChrome
            accountChip
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 14)
        .background(MacAppTheme.surface)
    }

    private var statusPill: some View {
        let colors = MacAppTheme.pillColors(for: chrome.kind)
        return HStack(spacing: 6) {
            Circle()
                .fill(colors.fg)
                .frame(width: 7, height: 7)
            Text(chrome.pillLabel)
                .font(.caption.weight(.semibold))
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 4)
        .background(Capsule().fill(colors.bg))
        .foregroundStyle(colors.fg)
    }

    @ViewBuilder
    private var startStopChrome: some View {
        switch chrome.kind {
        case .notSetUp:
            Button("Start setup") { controller.startOrRepairSetup() }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.brand)
        case .settingUp:
            Button("Setting up…") {}
                .disabled(true)
        case .signedOut:
            Button("Sign in") {
                // AWL-H3 mount — open sign-in gate in Computer pane
                page = .computer
                controller.beginSignInStub()
            }
            .buttonStyle(.borderedProminent)
            .tint(MacAppTheme.brand)
        case .running:
            Button("Stop") { controller.stopCore() }
                .buttonStyle(.bordered)
        case .starting:
            Button("Starting…") {}
                .disabled(true)
        case .problem:
            Button(controller.bootstrapState != nil ? "Start setup" : "Start") {
                controller.startOrRepairSetup()
            }
            .buttonStyle(.borderedProminent)
            .tint(MacAppTheme.brand)
        case .stopped, .waitingForInternet:
            Button("Start") { controller.startOrRepairSetup() }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.brandInk)
        }
    }

    @ViewBuilder
    private var accountChip: some View {
        if (controller.signedInEmail != nil) {
            Menu {
                Text(controller.signedInEmail ?? "Signed in")
                    .font(.caption)
                Button("Settings") { page = .settings }
                Divider()
                Button("Sign out…", role: .destructive) { showSignOutConfirm = true }
            } label: {
                HStack(spacing: 6) {
                    Text(accountInitials)
                        .font(.caption2.weight(.bold))
                        .foregroundStyle(.white)
                        .frame(width: 22, height: 22)
                        .background(Circle().fill(MacAppTheme.brand))
                    Text(accountFirstName)
                        .font(.subheadline.weight(.medium))
                        .foregroundStyle(MacAppTheme.fg)
                    Image(systemName: "chevron.down")
                        .font(.caption2)
                        .foregroundStyle(MacAppTheme.fgMuted)
                }
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(RoundedRectangle(cornerRadius: 8).strokeBorder(MacAppTheme.border))
            }
            .menuStyle(.borderlessButton)
        } else if chrome.kind != .notSetUp && chrome.kind != .settingUp {
            Button("Sign in") {
                page = .computer
                controller.beginSignInStub()
            }
            .buttonStyle(.bordered)
        }
    }

    private var accountInitials: String {
        let email = controller.signedInEmail ?? "A"
        let parts = email.split(separator: "@").first?.split(separator: ".") ?? []
        if parts.count >= 2 {
            return String(parts[0].prefix(1) + parts[1].prefix(1)).uppercased()
        }
        return String(email.prefix(1)).uppercased()
    }

    private var accountFirstName: String {
        let email = controller.signedInEmail ?? "Account"
        if let local = email.split(separator: "@").first {
            let name = local.split(separator: ".").first.map(String.init) ?? String(local)
            return name.prefix(1).uppercased() + name.dropFirst()
        }
        return "Account"
    }
}
