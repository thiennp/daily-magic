import AppKit
import SwiftUI
import AgentWitchLocalCore

@main
struct AgentWitchLocalApp: App {
    @NSApplicationDelegateAdaptor(MacAppAppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra {
            MacAppMenuBarContentView(controller: appDelegate.controller)
        } label: {
            if let template = MenuBarTemplateImage.load() {
                Image(nsImage: template)
            } else {
                Image(systemName: "wand.and.stars")
            }
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
