import Foundation
import AgentWitchLocalCore

/// AWL-H1/H2/H3 chrome stubs + helpers.
/// Placeholders mirror AW Mac H5 / H3 / H6 surface names — replace when those tips land.
/// Do NOT invent parallel enums; bind to existing runtime/bootstrap + these coming names.
/// Do NOT merge H5 into this tip — keep local mirrors until H5 types are on the base.
@MainActor
extension MacAppMenuController {
    // MARK: - Coming H5/H3 surface (placeholders until AW Mac tip lands)

    /// Local mirror of H5 `MacAppSetupSessionState` (idle | running | failed | succeeded).
    enum ChromeSetupSessionPlaceholder: Equatable {
        case idle
        case running(stepTitle: String, progressPercent: Int)
        case failed(title: String, detail: String, logPath: URL?)
        case succeeded
    }

    /// AWL-H5 placeholder — maps from existing `bootstrapState` until real `setupSession` lands.
    var setupSession: ChromeSetupSessionPlaceholder {
        guard let bootstrap = bootstrapState else { return .idle }
        switch bootstrap {
        case .checking:
            return .running(stepTitle: "Checking this computer", progressPercent: 5)
        case .signingIn:
            return .running(stepTitle: "Sign in to connect this computer", progressPercent: 10)
        case .installing:
            return .running(stepTitle: "Downloading the connection", progressPercent: 40)
        case .settingUp:
            return .running(stepTitle: "Checking everything works", progressPercent: 86)
        case .connected:
            return .succeeded
        case .error(let reason):
            return .failed(
                title: "Could not finish setup on this computer.",
                detail: sanitizeChromeMessage(reason),
                logPath: setupLogPath
            )
        }
    }

    /// AWL-H5 placeholder — log path for See log.
    var setupLogPath: URL? { nil }

    /// Matches H5 `signedInEmail`. Default nil = signed out. Never invent a fake email.
    var signedInEmail: String? {
        guard chromeAuthSignedIn else { return nil }
        let email = chromeAuthEmail?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return email.isEmpty ? nil : email
    }

    /// Convenience for chrome (same as signedInEmail != nil).
    var isSignedInStub: Bool { signedInEmail != nil }

    var signedInEmailStub: String? { signedInEmail }

    var signedInDisplayName: String? {
        guard signedInEmail != nil else { return nil }
        return chromeDisplayName ?? "You"
    }

    /// AWL-H8 placeholder — offline / waiting for internet.
    var isOfflineStub: Bool { chromeOffline }

    /// AWL-H8 / Connect bind placeholder.
    var isComputerBoundStub: Bool { chromeComputerBound && signedInEmail != nil }

    /// AWL-H6 placeholder until port allocator lands.
    var localPortRangeDisplayStub: String {
        if let localPortRange {
            return "\(localPortRange.lowerBound)–\(localPortRange.upperBound)"
        }
        return "Assigned after you sign in"
    }

    var chromeStatus: MacAppChromeStatus {
        MacAppChromeStatus.resolve(
            runtime: state,
            bootstrap: bootstrapState,
            signedIn: signedInEmail != nil,
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

    // MARK: - Setup / Start (H5 names)

    /// AWL-H5: `startOrRepairSetup()` — Start setup / self-heal entry.
    func startOrRepairSetup() {
        startCoreOrSetup()
    }

    /// AWL-H5: `retrySetup()` after failure.
    func retrySetup() {
        retryFromProblem()
    }

    /// Start setup when not installed / bootstrap error; otherwise start core.
    func startCoreOrSetup() {
        if bootstrapState != nil {
            if case .error = bootstrapState {
                retryBootstrap()
            }
            return
        }
        if case .notInstalled = state {
            retryBootstrap()
            return
        }
        startCore()
    }

    func retryFromProblem() {
        if bootstrapState != nil {
            retryBootstrap()
        } else {
            startCore()
        }
    }

    // MARK: - AWL-H3 Sign in / Sign out / Connect gate

    /// AWL-H3 / H5: `signOut()` — clears Connect affordances; files stay.
    func signOut() {
        signOutStub()
    }

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
        chromeSignInPhase = .waitingInBrowser
        statusMessage = "Finish signing in in your browser"
        openConnectThisMac()
    }

    func openBrowserAgainStub() {
        openConnectThisMac()
        statusMessage = "Finish signing in in your browser"
    }

    func cancelSignInStub() {
        chromeSignInPhase = signedInEmail == nil ? .prompt : .none
        chromeSignInCodeDraft = ""
        statusMessage = signedInEmail == nil ? "Signed out" : statusMessage
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
        if localPortRange == nil {
            localPortRange = 49152...49167
        }
        statusMessage = "Signed in — connect this computer"
    }

    func signOutStub() {
        setChromeAuth(signedIn: false, email: nil)
        chromeComputerBound = false
        // Clears Connect affordances on both surfaces; files stay on this computer.
        MacAppLocalUIStore.shared.hasConnectedProject = false
        statusMessage = "Signed out"
    }

    /// Connect this computer while signed in (binds account; H8 will deepen).
    func connectThisComputerStub() {
        guard signedInEmail != nil else {
            showSignInPromptGate()
            return
        }
        chromeComputerBound = true
        MacAppLocalUIStore.shared.hasConnectedProject = true
        chromeSignInPhase = .none
        statusMessage = "This computer is connected"
    }

    func notYouSignOutStub() {
        signOutStub()
        beginSignInStub()
    }
}
