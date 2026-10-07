import AppKit
import SwiftUI
import AgentWitchLocalCore

/// AWL-H4 — Settings chrome from Mac UX redo HTML.
/// Account, Local port range (read-only until H6), open at login, menu bar, permissions, diagnostics (AWB/AWI glossed).
struct SettingsView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var showSignOutConfirm = false

    private var isSignedIn: Bool { controller.signedInEmail != nil }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                accountSection
                connectionSection
                generalSection
                permissionsSection
                diagnosticsSection
            }
            .padding(20)
            .frame(maxWidth: 760, alignment: .leading)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(MacAppTheme.bg)
        .frame(minWidth: 480, minHeight: 600)
        .onAppear { controller.refreshInstallAndHealth() }
        .alert(AWLSignOutConfirmCopy.title, isPresented: $showSignOutConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Sign out", role: .destructive) { controller.signOut() }
        } message: {
            Text(AWLSignOutConfirmCopy.message(
                displayName: controller.signedInDisplayName ?? "This account",
                email: controller.signedInEmail ?? ""
            ))
        }
    }

    // MARK: - Account

    private var accountSection: some View {
        section("Account") {
            if isSignedIn {
                settingsRow {
                    HStack(spacing: 12) {
                        Text(accountInitials)
                            .font(.caption.weight(.bold))
                            .foregroundStyle(.white)
                            .frame(width: 36, height: 36)
                            .background(Circle().fill(MacAppTheme.brand))
                        VStack(alignment: .leading, spacing: 2) {
                            Text(controller.signedInDisplayName ?? "Account")
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(MacAppTheme.fg)
                            Text(controller.signedInEmail ?? "")
                                .font(.caption)
                                .foregroundStyle(MacAppTheme.fgMuted)
                        }
                        Spacer()
                        Button("Sign out…") { showSignOutConfirm = true }
                            .buttonStyle(.bordered)
                    }
                }
                Divider().background(MacAppTheme.border)
                settingsRow {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("This computer is connected to this account")
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(MacAppTheme.fg)
                            Text("Signing out disconnects it. Files stay on this computer.")
                                .font(.caption)
                                .foregroundStyle(MacAppTheme.fgMuted)
                        }
                        Spacer()
                        statusPill(
                            controller.isComputerBoundStub ? "Connected" : "Not connected",
                            ok: controller.isComputerBoundStub
                        )
                    }
                }
            } else {
                settingsRow {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Not signed in")
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(MacAppTheme.fg)
                            Text("Sign in to connect this computer.")
                                .font(.caption)
                                .foregroundStyle(MacAppTheme.fgMuted)
                        }
                        Spacer()
                        Button("Sign in") {
                            NotificationCenter.default.post(
                                name: .awlSelectSidebarPage,
                                object: MacAppSidebarPage.computer.rawValue
                            )
                            controller.beginSignInStub()
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(MacAppTheme.brand)
                    }
                }
            }
        }
    }

    // MARK: - Connection

    private var connectionSection: some View {
        section("Connection") {
            settingsRow {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack(spacing: 6) {
                            Text("Local port range")
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(MacAppTheme.fg)
                            Image(systemName: "info.circle")
                                .font(.caption)
                                .foregroundStyle(MacAppTheme.fgSubtle)
                                .help("AgentWitch Local picks a random range when you first sign in and keeps it. Other accounts on this computer get their own range.")
                        }
                        Text("Unique to this AgentWitch account on this computer.")
                            .font(.caption.italic())
                            .foregroundStyle(MacAppTheme.fgMuted)
                    }
                    Spacer()
                    if isSignedIn, controller.localPortRange != nil {
                        Text(controller.localPortRangeDisplayStub)
                            .font(.system(.subheadline, design: .monospaced).weight(.semibold))
                            .foregroundStyle(MacAppTheme.brand)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.accentSoft))
                    } else {
                        Text("Assigned after you sign in")
                            .font(.caption)
                            .foregroundStyle(MacAppTheme.fgSubtle)
                    }
                }
            }
            Divider().background(MacAppTheme.border)
            settingsRow {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Computer name")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(MacAppTheme.fg)
                        Text("Shown to your projects")
                            .font(.caption)
                            .foregroundStyle(MacAppTheme.fgMuted)
                    }
                    Spacer()
                    Text(store.computerName)
                        .font(.subheadline)
                        .foregroundStyle(MacAppTheme.fg)
                }
            }
        }
    }

    // MARK: - General

    private var generalSection: some View {
        section("General") {
            settingsRow {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Open at login")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(MacAppTheme.fg)
                        Text("Starts in the menu bar when you log in to this computer.")
                            .font(.caption)
                            .foregroundStyle(MacAppTheme.fgMuted)
                    }
                    Spacer()
                    Toggle(
                        "",
                        isOn: Binding(
                            get: { controller.launchesAtLogin },
                            set: { controller.toggleLaunchAtLogin($0) }
                        )
                    )
                    .labelsHidden()
                    .toggleStyle(.switch)
                    .accessibilityLabel("Open at login")
                }
            }
            Divider().background(MacAppTheme.border)
            settingsRow {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Show in menu bar")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(MacAppTheme.fg)
                        Text("Always on. The menu bar keeps working when this window is closed.")
                            .font(.caption)
                            .foregroundStyle(MacAppTheme.fgMuted)
                    }
                    Spacer()
                    Toggle("", isOn: .constant(true))
                        .labelsHidden()
                        .toggleStyle(.switch)
                        .disabled(true)
                        .accessibilityLabel("Show in menu bar")
                }
            }
        }
    }

    // MARK: - Permissions

    private var permissionsSection: some View {
        section("Permissions") {
            permissionRow(
                title: "Files and folders",
                detail: "Lets assistant tools read and change project folders.",
                status: "Allowed",
                ok: true,
                showOpenSettings: false
            )
            Divider().background(MacAppTheme.border)
            permissionRow(
                title: "Notifications",
                detail: "Tells you when something needs your attention.",
                status: "Allowed",
                ok: true,
                showOpenSettings: false
            )
            Divider().background(MacAppTheme.border)
            permissionRow(
                title: "Automation",
                detail: "Lets assistant tools open other apps when a task needs it.",
                status: "Not allowed",
                ok: false,
                showOpenSettings: true
            )
        }
    }

    // MARK: - Diagnostics

    private var diagnosticsSection: some View {
        let running = controller.state == .running
        return section("Diagnostics") {
            glossRow(
                code: "AWB",
                title: "Connection service",
                detail: "Links this computer to AgentWitch · version \(MacAppConstants.appVersion)",
                running: running
            )
            Divider().background(MacAppTheme.border)
            glossRow(
                code: "AWI",
                title: "Assistant tools runner",
                detail: "Installs and runs assistant tools on this computer · version \(MacAppConstants.appVersion)",
                running: running
            )
            Divider().background(MacAppTheme.border)
            settingsRow {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Log")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(MacAppTheme.fg)
                        Text("~/Library/Logs/AgentWitch Local/")
                            .font(.system(size: 11.5, design: .monospaced))
                            .foregroundStyle(MacAppTheme.fgMuted)
                    }
                    Spacer()
                    Button("See log") { controller.openLogs() }
                        .buttonStyle(.bordered)
                    Button("Repair setup") { controller.startOrRepairSetup() }
                        .buttonStyle(.bordered)
                }
            }
        }
    }

    // MARK: - Helpers

    private func section<Content: View>(_ title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.title3.weight(.semibold))
                .foregroundStyle(MacAppTheme.fg)
            VStack(alignment: .leading, spacing: 0) {
                content()
            }
            .background(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(MacAppTheme.surface)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .stroke(MacAppTheme.border, lineWidth: 1)
                    )
            )
        }
    }

    private func settingsRow<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        content()
            .padding(.horizontal, 14)
            .padding(.vertical, 12)
            .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func permissionRow(
        title: String,
        detail: String,
        status: String,
        ok: Bool,
        showOpenSettings: Bool
    ) -> some View {
        settingsRow {
            HStack(alignment: .center) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(MacAppTheme.fg)
                    Text(detail)
                        .font(.caption)
                        .foregroundStyle(MacAppTheme.fgMuted)
                }
                Spacer()
                HStack(spacing: 8) {
                    Text(status)
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(ok ? MacAppTheme.success : MacAppTheme.warning)
                    if showOpenSettings {
                        Button("Open System Settings") {
                            if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security") {
                                NSWorkspace.shared.open(url)
                            }
                        }
                        .buttonStyle(.bordered)
                        .controlSize(.small)
                    }
                }
            }
        }
    }

    private func glossRow(code: String, title: String, detail: String, running: Bool) -> some View {
        settingsRow {
            HStack(alignment: .center, spacing: 12) {
                Text(code)
                    .font(.system(.caption, design: .monospaced).weight(.bold))
                    .foregroundStyle(MacAppTheme.brandInk)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(RoundedRectangle(cornerRadius: 6).fill(MacAppTheme.accentSoft))
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(MacAppTheme.fg)
                    Text(detail)
                        .font(.caption)
                        .foregroundStyle(MacAppTheme.fgMuted)
                }
                Spacer()
                statusPill(running ? "Running" : controller.chromeStatus.pillLabel, ok: running)
            }
        }
    }

    private func statusPill(_ text: String, ok: Bool) -> some View {
        HStack(spacing: 5) {
            Circle().fill(ok ? MacAppTheme.success : MacAppTheme.fgMuted).frame(width: 6, height: 6)
            Text(text)
                .font(.caption.weight(.semibold))
        }
        .foregroundStyle(ok ? MacAppTheme.success : MacAppTheme.fgMuted)
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(Capsule().fill(ok ? MacAppTheme.successSoft : MacAppTheme.fill))
    }

    private var accountInitials: String {
        let name = controller.signedInDisplayName ?? controller.signedInEmail ?? "?"
        let parts = name.split(whereSeparator: { $0 == " " || $0 == "@" || $0 == "." }).prefix(2)
        let letters = parts.compactMap { $0.first.map { String($0).uppercased() } }
        return letters.isEmpty ? "?" : letters.joined()
    }
}
