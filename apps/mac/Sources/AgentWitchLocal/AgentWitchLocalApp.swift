import AppKit
import SwiftUI
import AgentWitchLocalCore

@main
struct AgentWitchLocalApp: App {
    @NSApplicationDelegateAdaptor(MacAppAppDelegate.self) private var appDelegate

    var body: some Scene {
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

        Window("Computer", id: MacAppWindowID.computer.rawValue) {
            ComputerView(controller: appDelegate.controller, store: appDelegate.uiStore)
                .awlWindowOpener()
        }
        .defaultSize(width: 480, height: 560)

        Window("History", id: MacAppWindowID.history.rawValue) {
            HistoryView(store: appDelegate.uiStore)
                .awlWindowOpener()
        }
        .defaultSize(width: 500, height: 560)

        Window("Settings", id: MacAppWindowID.settings.rawValue) {
            SettingsView(controller: appDelegate.controller, store: appDelegate.uiStore)
                .awlWindowOpener()
        }
        .defaultSize(width: 500, height: 640)

        Window("First run", id: MacAppWindowID.firstRun.rawValue) {
            FirstRunWizardView(controller: appDelegate.controller, store: appDelegate.uiStore)
                .awlWindowOpener()
        }
        .defaultSize(width: 480, height: 560)
    }
}

/// Owns the controller from launch so `agentwitch-local://` callbacks reach it
/// even when the menu bar popover has never been opened.
@MainActor
final class MacAppAppDelegate: NSObject, NSApplicationDelegate {
    let controller = MacAppMenuController()
    let uiStore = MacAppLocalUIStore.shared

    func application(_ application: NSApplication, open urls: [URL]) {
        for url in urls {
            controller.handleOpenURL(url)
        }
    }
}
