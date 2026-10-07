import SwiftUI
import AgentWitchLocalCore

/// AWL-H3 — Sign-in methods chrome.
/// Continue with Google (system browser OAuth only), Email code, Waiting in browser.
/// Mounted by ComputerView / H2 shell. No browser AWL / local.agentwitch.com shell.
struct AWLSignInView: View {
    @ObservedObject var controller: MacAppMenuController

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                switch controller.chromeSignInPhase {
                case .none, .prompt:
                    promptPane
                case .choose:
                    choosePane
                case .waitingInBrowser:
                    waitingPane
                case .emailCode:
                    emailCodePane
                }
            }
            .padding(28)
            .frame(maxWidth: 480)
            .frame(maxWidth: .infinity)
        }
        .background(MacAppTheme.bg)
    }

    // MARK: - Prompt (Connect disabled + Sign in first.)

    private var promptPane: some View {
        panel {
            emblem("lock.fill")
            Text("Sign in to connect this computer")
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
                .multilineTextAlignment(.center)
            Text("Setup is done. Sign in so AgentWitch knows which account this computer belongs to.")
                .font(.system(size: 14))
                .foregroundStyle(MacAppTheme.fgMuted)
                .multilineTextAlignment(.center)
            Button("Sign in") { controller.beginSignInStub() }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.brand)
                .controlSize(.large)
            AWLConnectGateInline(afterSetupHint: false)
                .padding(.top, 8)
        }
    }

    // MARK: - Choose method

    private var choosePane: some View {
        panel {
            emblem("lock.fill")
            Text("Sign in to AgentWitch")
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
            Text("Connect binds this computer to the account you sign in with.")
                .font(.system(size: 14))
                .foregroundStyle(MacAppTheme.fgMuted)
                .multilineTextAlignment(.center)

            Button {
                controller.continueWithGoogleStub()
            } label: {
                HStack(spacing: 10) {
                    Text("G")
                        .font(.system(size: 15, weight: .bold))
                        .foregroundStyle(MacAppTheme.brand)
                        .frame(width: 22, height: 22)
                        .background(Circle().fill(MacAppTheme.accentSoft))
                    Text("Continue with Google")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(MacAppTheme.fg)
                    Spacer()
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 11)
                .background(
                    RoundedRectangle(cornerRadius: 10, style: .continuous)
                        .fill(MacAppTheme.surface)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .stroke(MacAppTheme.borderStrong, lineWidth: 1)
                        )
                )
            }
            .buttonStyle(.plain)

            HStack {
                Rectangle().fill(MacAppTheme.border).frame(height: 1)
                Text("or")
                    .font(.caption.weight(.medium))
                    .foregroundStyle(MacAppTheme.fgSubtle)
                Rectangle().fill(MacAppTheme.border).frame(height: 1)
            }

            Text("Email")
                .font(.caption.weight(.semibold))
                .foregroundStyle(MacAppTheme.fgSubtle)
                .frame(maxWidth: .infinity, alignment: .leading)
            TextField("name@example.com", text: $controller.chromeSignInEmailDraft)
                .textFieldStyle(.roundedBorder)

            Button("Send sign-in code") {
                controller.sendEmailCodeStub()
            }
            .buttonStyle(.borderedProminent)
            .tint(MacAppTheme.brand)
            .disabled(controller.chromeSignInEmailDraft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            .frame(maxWidth: .infinity)

            Button("Cancel") { controller.cancelSignInStub() }
                .buttonStyle(.borderless)
                .foregroundStyle(MacAppTheme.brand)
        }
    }

    // MARK: - Waiting in browser (OAuth handoff only)

    private var waitingPane: some View {
        panel {
            emblem("globe")
            Text("Finish signing in in your browser")
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
                .multilineTextAlignment(.center)
            Text("Your browser opened for Google sign-in. When it says you're done, come back here. This window updates by itself.")
                .font(.system(size: 14))
                .foregroundStyle(MacAppTheme.fgMuted)
                .multilineTextAlignment(.center)
            ProgressView()
                .controlSize(.small)
                .padding(.vertical, 4)
            HStack(spacing: 12) {
                Button("Open browser again") { controller.openBrowserAgainStub() }
                    .buttonStyle(.bordered)
                Button("I'm done") { controller.completeBrowserSignInStub() }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brand)
                Button("Cancel") { controller.cancelSignInStub() }
                    .buttonStyle(.borderless)
                    .foregroundStyle(MacAppTheme.brand)
            }
        }
    }

    // MARK: - Email code

    private var emailCodePane: some View {
        panel {
            emblem("envelope.fill")
            Text("Enter the 6-digit code")
                .font(.system(size: 22, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
            (
                Text("We sent a code to ")
                + Text(codeTargetEmail).fontWeight(.semibold)
                + Text(". It works for 10 minutes.")
            )
            .font(.system(size: 14))
            .foregroundStyle(MacAppTheme.fgMuted)
            .multilineTextAlignment(.center)

            TextField("000000", text: $controller.chromeSignInCodeDraft)
                .textFieldStyle(.roundedBorder)
                .font(.system(size: 24, weight: .semibold, design: .monospaced))
                .multilineTextAlignment(.center)
                .frame(maxWidth: 200)
                .onChange(of: controller.chromeSignInCodeDraft) { newValue in
                    let digits = String(newValue.filter(\.isNumber).prefix(6))
                    if digits != newValue {
                        controller.chromeSignInCodeDraft = digits
                    }
                }

            Button("Sign in") { controller.verifyEmailCodeStub() }
                .buttonStyle(.borderedProminent)
                .tint(MacAppTheme.brand)
                .controlSize(.large)
                .disabled(controller.chromeSignInCodeDraft.count != 6)

            HStack(spacing: 16) {
                Button("Send a new code") { controller.resendEmailCodeStub() }
                    .buttonStyle(.borderless)
                    .foregroundStyle(MacAppTheme.brand)
                Button("Use a different email") { controller.useDifferentEmailStub() }
                    .buttonStyle(.borderless)
                    .foregroundStyle(MacAppTheme.brand)
            }
        }
    }

    private var codeTargetEmail: String {
        let draft = controller.chromeSignInEmailDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        if !draft.isEmpty { return draft }
        return controller.chromeAuthEmail ?? "your email"
    }

    private func panel<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        VStack(spacing: 14) {
            content()
        }
        .padding(28)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(MacAppTheme.surface)
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .stroke(MacAppTheme.border, lineWidth: 1)
                )
        )
    }

    private func emblem(_ systemName: String) -> some View {
        Image(systemName: systemName)
            .font(.system(size: 22, weight: .semibold))
            .foregroundStyle(MacAppTheme.brand)
            .frame(width: 52, height: 52)
            .background(Circle().fill(MacAppTheme.accentSoft))
            .padding(.bottom, 4)
    }
}

/// Disabled Connect + exact copy **"Sign in first."**
struct AWLConnectGateInline: View {
    var afterSetupHint: Bool = false

    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            Text("Connect this computer")
                .font(.system(size: 13, weight: .medium))
                .foregroundStyle(MacAppTheme.fgSubtle)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(
                    RoundedRectangle(cornerRadius: 9, style: .continuous)
                        .fill(MacAppTheme.fill)
                        .overlay(
                            RoundedRectangle(cornerRadius: 9, style: .continuous)
                                .stroke(MacAppTheme.border, lineWidth: 1)
                        )
                )
                .opacity(0.65)
            Group {
                if afterSetupHint {
                    Text("Sign in first. ").fontWeight(.bold)
                    + Text("You can sign in after setup.")
                } else {
                    Text("Sign in first.")
                        .fontWeight(.bold)
                }
            }
            .font(.system(size: 13))
            .foregroundStyle(MacAppTheme.fgMuted)
            Spacer(minLength: 0)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Connect this computer. Sign in first.")
    }
}
