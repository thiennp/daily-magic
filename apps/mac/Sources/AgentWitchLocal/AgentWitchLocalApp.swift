import SwiftUI
import AgentWitchLocalCore

@main
struct AgentWitchLocalApp: App {
    @StateObject private var controller = MacAppMenuController()

    var body: some Scene {
        MenuBarExtra("Agent Witch Local", systemImage: "wand.and.stars") {
            MacAppMenuBarContentView(controller: controller)
        }
        .menuBarExtraStyle(.window)
    }
}
