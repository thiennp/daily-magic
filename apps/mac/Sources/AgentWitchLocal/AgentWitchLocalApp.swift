import AppKit
import Carbon
import SwiftUI
import AgentWitchLocalCore

@main
struct AgentWitchLocalApp: App {
    @StateObject private var controller = MacAppMenuController()
    @NSApplicationDelegateAdaptor(MacAppAppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra("Agent Witch Local", systemImage: "wand.and.stars") {
            MacAppMenuBarContentView(controller: controller)
                .onOpenURL { url in
                    controller.handleOpenURL(url)
                }
                .onAppear {
                    appDelegate.controller = controller
                }
        }
        .menuBarExtraStyle(.window)
    }
}

/// Registers `agentwitch-local://` Apple Events for cold-start callbacks.
final class MacAppAppDelegate: NSObject, NSApplicationDelegate {
    weak var controller: MacAppMenuController?

    func applicationDidFinishLaunching(_ notification: Notification) {
        let manager = NSAppleEventManager.shared()
        manager.setEventHandler(
            self,
            andSelector: #selector(handleGetURLEvent(_:withReplyEvent:)),
            forEventClass: AEEventClass(kInternetEventClass),
            andEventID: AEEventID(kAEGetURL)
        )
    }

    @objc func handleGetURLEvent(
        _ event: NSAppleEventDescriptor,
        withReplyEvent replyEvent: NSAppleEventDescriptor
    ) {
        guard
            let urlString = event.paramDescriptor(forKeyword: AEKeyword(keyDirectObject))?.stringValue,
            let url = URL(string: urlString)
        else {
            return
        }
        Task { @MainActor in
            controller?.handleOpenURL(url)
        }
    }
}
