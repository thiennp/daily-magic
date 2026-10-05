import AppKit
import SwiftUI
import AgentWitchLocalCore

@main
struct AgentWitchLocalApp: App {
    @NSApplicationDelegateAdaptor(MacAppAppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra("Agent Witch Local", systemImage: "wand.and.stars") {
            MacAppMenuBarContentView(controller: appDelegate.controller)
        }
        .menuBarExtraStyle(.window)
    }
}

/// Owns the controller from launch so `agentwitch-local://` callbacks reach it
/// even when the menu bar popover has never been opened.
@MainActor
final class MacAppAppDelegate: NSObject, NSApplicationDelegate {
    let controller = MacAppMenuController()

    func application(_ application: NSApplication, open urls: [URL]) {
        for url in urls {
            controller.handleOpenURL(url)
        }
    }
}
