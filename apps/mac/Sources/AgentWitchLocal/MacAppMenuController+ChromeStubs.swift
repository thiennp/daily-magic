import AppKit
import Foundation
import AgentWitchLocalCore

/// AWL-H1/H2 chrome stubs + helpers that remain after H5 lands.
/// H5 owns `setupSession` / `setupLogPath` / `signedInEmail` / `startOrRepairSetup` /
/// `retrySetup` / `signOut` on `MacAppMenuController` — do not redeclare them here.
@MainActor
extension MacAppMenuController {
    /// Convenience for chrome (real H5 email, or H3 chrome auth stub).
    var isSignedInStub: Bool { signedInEmail != nil || chromeAuthSignedIn }

    var signedInEmailStub: String? { signedInEmail ?? chromeAuthEmail }

    /// AWL-H8 placeholder — offline / waiting for internet.
    var isOfflineStub: Bool { chromeOffline }

    /// AWL-H6 placeholder until port allocator lands.
    var localPortRangeDisplayStub: String { "49152–49167" }

    var chromeStatus: MacAppChromeStatus {
        MacAppChromeStatus.resolve(
            runtime: state,
            bootstrap: bootstrapState,
            signedIn: isSignedInStub,
            offline: isOfflineStub,
            updateReady: updateOffer != nil,
            setupSession: setupSession
        )
    }

    /// Open the latest setup failure log (H5 `setupLogPath`), if any.
    func openSetupLog() {
        let path = setupLogPath ?? setupSession.logPath
        guard let path else { return }
        NSWorkspace.shared.open(path)
    }

    var canOpenSetupLog: Bool {
        setupLogPath != nil || setupSession.logPath != nil
    }

    func beginSignInStub() {
        // AWL-H3: open sign-in gate. H1/H2: waiting chrome only — never invent an account email.
        statusMessage = "Sign in — AWL-H3 will open the sign-in gate here."
    }

    func signOutStub() {
        setChromeAuth(signedIn: false, email: nil)
        // Prefer real H5 sign-out (clears active-profile pointer) when available.
        signOut()
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
}
