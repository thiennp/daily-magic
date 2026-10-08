import AppKit
import Foundation
import AgentWitchLocalCore

/// AWL-H1/H2/H3 chrome stubs + helpers that remain after H5 lands.
/// H5 owns `setupSession` / `setupLogPath` / `signedInEmail` / `startOrRepairSetup` /
/// `retrySetup` / `signOut` on `MacAppMenuController` — do not redeclare them here.
@MainActor
extension MacAppMenuController {
    /// Convenience for chrome (real H5 email, or H3 chrome auth stub).
    var isSignedInStub: Bool { signedInEmail != nil || chromeAuthSignedIn }

    var signedInEmailStub: String? { signedInEmail ?? chromeAuthEmail }

    var signedInDisplayName: String? {
        guard signedInEmail != nil else { return nil }
        return chromeDisplayName ?? displayNameFromEmail(signedInEmail) ?? "You"
    }

    /// AWL-H8 placeholder — offline / waiting for internet.
    var isOfflineStub: Bool { chromeOffline }

    /// Connect bind: this session's Connect, a live connection for the signed-in
    /// account, or a bind remembered for this account (survives app restarts).
    var isComputerBoundStub: Bool {
        guard let email = signedInEmail else { return false }
        return chromeComputerBound
            || connectionLive == true
            || UserDefaults.standard.string(forKey: Self.boundAccountKey) == email
    }

    static let boundAccountKey = "awl.boundAccountEmail"

    func rememberBoundAccount(_ email: String) {
        UserDefaults.standard.set(email, forKey: Self.boundAccountKey)
    }

    func forgetBoundAccount() {
        UserDefaults.standard.removeObject(forKey: Self.boundAccountKey)
    }

    /// Opens AgentWitch (cloud) — projects, assistants and tool access are managed there.
    func openAgentWitch(path: String = "/projects") {
        guard let url = URL(string: MacAppConstants.cloudOrigin + path) else { return }
        NSWorkspace.shared.open(url)
    }

    /// H6 owns the range; chrome display reads real allocation (or placeholder copy).
    var localPortRangeDisplayStub: String {
        if let localPortRangeDisplay { return localPortRangeDisplay }
        if let localPortRange {
            return "\(localPortRange.lowerBound)–\(localPortRange.upperBound)"
        }
        return "Assigned after you sign in"
    }

    /// Signing in from the system browser on an already set up computer.
    /// Design: still "Signed out" (not "Setting up…") while the handoff runs.
    var isWaitingInBrowserForSignIn: Bool {
        guard signedInEmail == nil else { return false }
        if case .notInstalled = state { return false }
        return bootstrapState == .signingIn || chromeSignInPhase == .waitingInBrowser
    }

    var chromeStatus: MacAppChromeStatus {
        if isWaitingInBrowserForSignIn {
            return MacAppChromeStatus(
                kind: .signedOut,
                pillLabel: "Signed out",
                detailTitle: "Finishing sign-in in your browser…",
                detailSubtitle: "Come back here when your browser says you're done."
            )
        }
        return MacAppChromeStatus.resolve(
            runtime: state,
            bootstrap: bootstrapState,
            signedIn: isSignedInStub,
            offline: isOfflineStub,
            updateReady: updateOffer != nil
        )
    }

    /// True when Computer pane should show H3 sign-in / Connect gate instead of running content.
    var showsSignInOrConnectGate: Bool {
        if bootstrapState != nil { return false }
        if case .notInstalled = state { return false }
        if chromeSignInPhase != .none { return true }
        if signedInEmail == nil { return true }
        if !isComputerBoundStub { return true }
        return false
    }

    /// Start setup when not installed / bootstrap error; otherwise start/repair via H5.
    func startCoreOrSetup() {
        if bootstrapState != nil {
            if case .error = bootstrapState {
                retryBootstrap()
            }
            return
        }
        startOrRepairSetup()
    }

    func retryFromProblem() {
        if case .failed = setupSession {
            retrySetup()
            return
        }
        if bootstrapState != nil {
            retryBootstrap()
        } else {
            startOrRepairSetup()
        }
    }

    // MARK: - AWL-H3 Sign in / Sign out / Connect gate

    /// Open the sign-in choose gate (Google + Email). Does not invent OAuth or a fake email.
    func beginSignInStub() {
        chromeSignInPhase = .choose
        chromeSignInCodeDraft = ""
        statusMessage = "Sign in to AgentWitch"
    }

    /// Prompt with disabled Connect + "Sign in first."
    func showSignInPromptGate() {
        chromeSignInPhase = .prompt
        statusMessage = "Sign in to connect this computer"
    }

    func continueWithGoogleStub() {
        // System browser OAuth handoff only — not browser AWL / local.agentwitch.com.
        beginAccountSignIn()
    }

    func openBrowserAgainStub() {
        if bootstrapState == .signingIn {
            restartBootstrapSignIn()
        } else {
            beginAccountSignIn()
        }
        statusMessage = "Finish signing in in your browser"
        showToast("Browser opened again for sign-in")
    }

    func cancelSignInStub() {
        chromeSignInCodeDraft = ""
        cancelAccountSignIn()
    }

    func sendEmailCodeStub() {
        let email = chromeSignInEmailDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !email.isEmpty else { return }
        chromeAuthEmail = email
        chromeSignInPhase = .emailCode
        chromeSignInCodeDraft = ""
        statusMessage = "Enter the 6-digit code"
    }

    func resendEmailCodeStub() {
        statusMessage = "We sent a new code."
    }

    func useDifferentEmailStub() {
        chromeSignInPhase = .choose
        chromeSignInCodeDraft = ""
        statusMessage = "Sign in to AgentWitch"
    }

    func verifyEmailCodeStub() {
        let code = chromeSignInCodeDraft.filter(\.isNumber)
        guard code.count == 6 else { return }
        let draft = chromeSignInEmailDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        let stored = chromeAuthEmail?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let resolved = draft.isEmpty ? stored : draft
        guard !resolved.isEmpty else { return }
        completeSignInStub(email: resolved)
    }

    /// UI stub: finish waiting-in-browser. Does not invent an email.
    func completeBrowserSignInStub() {
        let draft = chromeSignInEmailDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        let stored = chromeAuthEmail?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let resolved = draft.isEmpty ? stored : draft
        guard !resolved.isEmpty else {
            statusMessage = "Finish signing in in your browser"
            return
        }
        completeSignInStub(email: resolved, displayName: chromeDisplayName)
    }

    func completeSignInStub(email: String, displayName: String? = nil) {
        setChromeAuth(signedIn: true, email: email, displayName: displayName)
        chromeComputerBound = false
        // H6 allocates the real per-account range after profile exists — do not invent one here.
        statusMessage = "Signed in — connect this computer"
    }

    func signOutStub() {
        setChromeAuth(signedIn: false, email: nil)
        chromeComputerBound = false
        // Clears Connect affordances on both surfaces; files stay on this computer.
        MacAppLocalUIStore.shared.hasConnectedProject = false
        // Prefer real H5 sign-out (clears active-profile pointer) when available.
        signOut()
    }

    /// Connect this computer while signed in (binds account; H8 will deepen).
    func connectThisComputerStub() {
        guard signedInEmail != nil else {
            showSignInPromptGate()
            return
        }
        chromeComputerBound = true
        if let email = signedInEmail { rememberBoundAccount(email) }
        MacAppLocalUIStore.shared.hasConnectedProject = true
        chromeSignInPhase = .none
        statusMessage = "This computer is connected"
        showToast("This computer is connected to \(signedInEmail ?? "your account")")
        if state != .running {
            startOrRepairSetup()
        }
    }

    func notYouSignOutStub() {
        signOutStub()
        beginSignInStub()
    }
}
