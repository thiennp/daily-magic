import AppKit
import SwiftUI
import AgentWitchLocalCore

/// SwiftUI `Window(id: "main")` windows carry an identifier starting with the scene id.
@MainActor
func isMainAppWindow(_ window: NSWindow) -> Bool {
    window.identifier?.rawValue.hasPrefix(MacAppWindowID.main.rawValue) == true
}

/// AppKit implementation of MacAppWindowPresenting (AWL 0.2.3 Open window / Settings fix).
@MainActor
final class AppKitMacAppWindowPresenting: MacAppWindowPresenting {
    var openWindowAction: (() -> Void)?

    func setActivationPolicy(_ policy: MacAppActivationPolicyRequest) {
        let nsPolicy: NSApplication.ActivationPolicy = policy == .regular ? .regular : .accessory
        NSApp.setActivationPolicy(nsPolicy)
    }

    func activateApp() {
        if #available(macOS 14, *) {
            NSApp.activate()
        } else {
            NSApp.activate(ignoringOtherApps: true)
        }
    }

    func focusExistingMainWindow() -> Bool {
        let mainWindow = NSApp.windows.first { isMainAppWindow($0) && $0.canBecomeMain }
        if let window = mainWindow {
            if window.isMiniaturized {
                window.deminiaturize(nil)
            }
            window.makeKeyAndOrderFront(nil)
            window.orderFrontRegardless()
            return true
        }
        return false
    }

    /// Prefer the menu popover's openWindow; else (or if no window shows up
    /// shortly) ask the always-alive status-item label's opener.
    func openMainWindowScene() {
        guard let action = openWindowAction else {
            NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.main.rawValue)
            return
        }
        action()
        Task { @MainActor [weak self] in
            try? await Task.sleep(nanoseconds: 400_000_000)
            guard let self, !self.focusExistingMainWindow() else { return }
            NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.main.rawValue)
        }
    }

    func selectPage(_ rawPage: String) {
        NotificationCenter.default.post(name: .awlSelectSidebarPage, object: rawPage)
    }
}
