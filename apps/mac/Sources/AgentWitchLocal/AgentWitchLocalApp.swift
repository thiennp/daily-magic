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
                store: appDelegate.uiStore
            )
        } label: {
            if let template = MenuBarTemplateImage.load() {
                Image(nsImage: template)
            } else {
                Image(systemName: "wand.and.stars")
            }
        }
        .menuBarExtraStyle(.window)

        // AWL-H2 — single Grok Bot–class window (1280×800 light sand)
        Window("AgentWitch Local", id: MacAppWindowID.main.rawValue) {
            MacAppMainWindowView(
                controller: appDelegate.controller,
                store: appDelegate.uiStore
            )
            .awlWindowOpener()
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

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Menu bar + window are both first-class; do not activate as a dock-only app.
        NSApp.setActivationPolicy(.accessory)
    }

    func application(_ application: NSApplication, open urls: [URL]) {
        for url in urls {
            controller.handleOpenURL(url)
        }
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if !flag {
            NotificationCenter.default.post(name: .awlOpenWindow, object: MacAppWindowID.main.rawValue)
        }
        return true
    }
}
