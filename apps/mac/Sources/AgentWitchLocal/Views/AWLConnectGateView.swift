import SwiftUI
import AgentWitchLocalCore

/// AWL-H3 — Connect this computer gate (signed in, not yet bound).
/// Shows which account is bound; Connect enabled. "Not you?" signs out first.
struct AWLConnectGateView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                Image(systemName: "cable.connector")
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundStyle(MacAppTheme.brand)
                    .frame(width: 52, height: 52)
                    .background(Circle().fill(MacAppTheme.accentSoft))

                Text("Connect this computer")
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundStyle(MacAppTheme.fg)

                Text("Assistants in projects you can access will be able to use tools on this computer.")
                    .font(.system(size: 14))
                    .foregroundStyle(MacAppTheme.fgMuted)
                    .multilineTextAlignment(.center)

                VStack(alignment: .leading, spacing: 0) {
                    bindRow(title: "Account") {
                        HStack(spacing: 10) {
                            Text(initials)
                                .font(.caption.weight(.bold))
                                .foregroundStyle(.white)
                                .frame(width: 32, height: 32)
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
                            Button("Not you?") { controller.notYouSignOutStub() }
                                .buttonStyle(.borderless)
                                .foregroundStyle(MacAppTheme.brand)
                                .font(.caption.weight(.medium))
                        }
                    }
                    Divider().background(MacAppTheme.border)
                    bindRow(title: "Computer") {
                        Text(store.computerName)
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(MacAppTheme.fg)
                    }
                    Divider().background(MacAppTheme.border)
                    bindRow(title: "Port range") {
                        HStack(spacing: 6) {
                            Text(controller.localPortRangeDisplayStub)
                                .font(.system(.subheadline, design: .monospaced).weight(.medium))
                                .foregroundStyle(MacAppTheme.fg)
                            Text("· only for this account")
                                .font(.caption)
                                .foregroundStyle(MacAppTheme.fgSubtle)
                        }
                    }
                }
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(MacAppTheme.surface)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .stroke(MacAppTheme.border, lineWidth: 1)
                        )
                )

                Button("Connect this computer") {
                    controller.connectThisComputerStub()
                }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.brand)
                .controlSize(.large)
            }
            .padding(28)
            .frame(maxWidth: 520)
            .frame(maxWidth: .infinity)
        }
        .background(MacAppTheme.bg)
    }

    private func bindRow<Content: View>(title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(MacAppTheme.fgSubtle)
            content()
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var initials: String {
        let name = controller.signedInDisplayName ?? controller.signedInEmail ?? "?"
        let parts = name.split(whereSeparator: { $0 == " " || $0 == "@" || $0 == "." }).prefix(2)
        let letters = parts.compactMap { $0.first.map { String($0).uppercased() } }
        return letters.isEmpty ? "?" : letters.joined()
    }
}

/// Sign-out confirm copy from Mac UX HTML (AWL-H3).
enum AWLSignOutConfirmCopy {
    static let title = "Sign out of AgentWitch Local?"

    static func message(displayName: String, email: String) -> String {
        """
        \(displayName) (\(email)) will be disconnected from this computer.
        Files stay on this computer.
        Assistants cannot use this computer until someone signs in and starts it again.
        """
    }
}
