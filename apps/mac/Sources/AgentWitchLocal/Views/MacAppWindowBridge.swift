import AppKit
import Foundation
import SwiftUI

enum MacAppWindowID: String {
    /// Single Grok Bot–class app window (AWL-H2).
    case main
    /// Legacy ids — open main and select sidebar page.
    case computer
    case history
    case settings
    case firstRun
    /// Prompt optimizer in-app WKWebView (AWL-H7 PM-3 b).
    case promptOptimizer
}

enum MacAppSidebarPage: String, CaseIterable, Identifiable, Hashable {
    case computer
    case promptOptimizer
    case history
    case settings

    var id: String { rawValue }

    var title: String {
        switch self {
        case .computer: return "Computer"
        case .promptOptimizer: return "Prompt optimizer"
        case .history: return "History"
        case .settings: return "Settings"
        }
    }

    var systemImage: String {
        switch self {
        case .computer: return "desktopcomputer"
        case .promptOptimizer: return "wand.and.stars"
        case .history: return "clock"
        case .settings: return "gearshape"
        }
    }

    static func fromWindowID(_ raw: String) -> MacAppSidebarPage? {
        switch MacAppWindowID(rawValue: raw) {
        case .computer, .main, .firstRun, .none: return .computer
        case .promptOptimizer: return .promptOptimizer
        case .history: return .history
        case .settings: return .settings
        }
    }
}

extension Notification.Name {
    static let awlOpenWindow = Notification.Name("awl.openWindow")
    /// object = MacAppSidebarPage.rawValue
    static let awlSelectSidebarPage = Notification.Name("awl.selectSidebarPage")
}

/// Hosts openWindow so MenuBarExtra can raise the main window.
struct MacAppWindowOpener: ViewModifier {
    @Environment(\.openWindow) private var openWindow

    func body(content: Content) -> some View {
        content
            .onReceive(NotificationCenter.default.publisher(for: .awlOpenWindow)) { note in
                let raw = (note.object as? String) ?? MacAppWindowID.main.rawValue
                // A menu-bar (.accessory) app cannot show its Window scene (AWL 0.2.3).
                NSApp.setActivationPolicy(.regular)
                if #available(macOS 14, *) {
                    NSApp.activate()
                } else {
                    NSApp.activate(ignoringOtherApps: true)
                }
                openWindow(id: MacAppWindowID.main.rawValue)
                if let page = MacAppSidebarPage(rawValue: raw) ?? MacAppSidebarPage.fromWindowID(raw) {
                    NotificationCenter.default.post(name: .awlSelectSidebarPage, object: page.rawValue)
                }
            }
    }
}

extension View {
    func awlWindowOpener() -> some View {
        modifier(MacAppWindowOpener())
    }
}
