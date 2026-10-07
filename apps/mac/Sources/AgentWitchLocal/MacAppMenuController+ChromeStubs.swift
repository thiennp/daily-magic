import Foundation
import AgentWitchLocalCore

/// AWL-H1/H2 chrome stubs + helpers.
/// Placeholders mirror AW Mac H5 / H3 / H6 surface names — replace when those tips land.
/// Do NOT invent parallel enums; bind to existing runtime/bootstrap + these coming names.
@MainActor
extension MacAppMenuController {
    // MARK: - Coming H5/H3 surface (placeholders until AW Mac tip lands)

    /// AWL-H5: `MacAppSetupSessionState` (idle | running | failed | succeeded).
    /// Placeholder mirror until Core type exists on this branch.
    enum ChromeSetupSessionPlaceholder: Equatable {
        case idle
        case running(stepTitle: String, progressPercent: Int)
        case failed(title: String, detail: String, logPath: URL?)
        case succeeded
    }

    /// AWL-H5 placeholder — maps from existing `bootstrapState` until `setupSession` lands.
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

    /// AWL-H3 placeholder — replace with real profile email. Default nil (signed-out).
    var signedInEmail: String? {
        chromeAuthSignedIn ? chromeAuthEmail : nil
    }

    /// Convenience for chrome (same as signedInEmail != nil).
    var isSignedInStub: Bool { chromeAuthSignedIn }

    var signedInEmailStub: String? { signedInEmail }

    /// AWL-H8 placeholder — offline / waiting for internet.
    var isOfflineStub: Bool { chromeOffline }

    /// AWL-H6 placeholder until port allocator lands.
    var localPortRangeDisplayStub: String { "49152–49167" }

    var chromeStatus: MacAppChromeStatus {
        MacAppChromeStatus.resolve(
            runtime: state,
            bootstrap: bootstrapState,
            signedIn: signedInEmail != nil,
            offline: isOfflineStub,
            updateReady: updateOffer != nil
        )
    }

    /// AWL-H5: `startOrRepairSetup()` — Start setup / self-heal entry.
    func startOrRepairSetup() {
        startCoreOrSetup()
    }

    /// AWL-H5: `retrySetup()` after failure.
    func retrySetup() {
        retryFromProblem()
    }

    /// AWL-H3: `signOut()` — clears Connect affordances; files stay.
    func signOut() {
        signOutStub()
    }

    func beginSignInStub() {
        // AWL-H3: open sign-in gate. H1/H2: waiting chrome only — never invent an account email.
        statusMessage = "Sign in — AWL-H3 will open the sign-in gate here."
    }

    func signOutStub() {
        setChromeAuth(signedIn: false, email: nil)
        statusMessage = "Signed out"
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
}
