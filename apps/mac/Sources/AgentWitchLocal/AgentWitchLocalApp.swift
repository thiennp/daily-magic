import AppKit
import SwiftUI
import AgentWitchLocalCore

@main
struct AgentWitchLocalApp: App {
    @NSApplicationDelegateAdaptor(MacAppAppDelegate.self) private var appDelegate

    var body: some Scene {
        // AWL-H1 — menu bar companion (works with window closed)
        MenuBarExtra {
            MacAppMenuBarContentView(
                controller: appDelegate.controller,
                store: appDelegate.uiStore,
                presenter: appDelegate.windowPresenter,
                presenting: appDelegate.windowPresenting
            )
        } label: {
            Group {
                if let template = MenuBarTemplateImage.load() {
                    Image(nsImage: template)
                } else {
                    Image(systemName: "wand.and.stars")
                }
            }
            // The status item label is always alive, so deep links
            // (agentwitch-local://status, Prompt optimizer) and Dock reopen can
            // raise the window even when it was never opened or was closed.
            .awlWindowOpener()
        }
        .menuBarExtraStyle(.window)

        // AWL-H2 — single Grok Bot–class window (1280×800 light sand)
        Window("AgentWitch Local", id: MacAppWindowID.main.rawValue) {
            MacAppMainWindowView(
                controller: appDelegate.controller,
                store: appDelegate.uiStore,
                presenter: appDelegate.windowPresenter
            )
        }
        .defaultSize(width: 1280, height: 800)
        .windowToolbarStyle(.unified(showsTitle: false))
    }
}

/// Owns the controller from launch so `agentwitch-local://` callbacks reach it
/// even when the menu bar popover has never been opened.
@MainActor
final class MacAppAppDelegate: NSObject, NSApplicationDelegate {
    let controller = MacAppMenuController()
    let uiStore = MacAppLocalUIStore.shared

    let windowPresenting = AppKitMacAppWindowPresenting()
    lazy var windowPresenter = MacAppMainWindowPresenter(presenter: windowPresenting)

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Menu bar + window are both first-class; do not activate as a dock-only app.
        NSApp.setActivationPolicy(.accessory)

        NotificationCenter.default.addObserver(self, selector: #selector(windowWillClose), name: NSWindow.willCloseNotification, object: nil)

        // Onboarding starts in the window (design): open it when signed out.
        if controller.signedInEmail == nil {
            Task { @MainActor in
                try? await Task.sleep(nanoseconds: 800_000_000)
                self.windowPresenter.present(pageRawValue: MacAppSidebarPage.computer.rawValue)
            }
        }
    }

    /// Only a closing main window may drop the app back to .accessory (the
    /// menu-bar popover panel also closes, often while the main window opens).
    @objc private func windowWillClose(_ notification: Notification) {
        guard let window = notification.object as? NSWindow,
              isMainAppWindow(window) else { return }
        let visibleCount = NSApp.windows.filter {
            isMainAppWindow($0) && $0.isVisible && $0 !== window
        }.count
        windowPresenter.mainWindowsDidChange(visibleMainWindowCount: visibleCount)
    }

    func application(_ application: NSApplication, open urls: [URL]) {
        for url in urls {
            controller.handleOpenURL(url)
        }
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if !flag {
            windowPresenter.present(pageRawValue: MacAppSidebarPage.computer.rawValue)
        }
        return true
    }
}
