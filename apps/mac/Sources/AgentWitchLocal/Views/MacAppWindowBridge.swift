import Foundation
import SwiftUI

enum MacAppWindowID: String {
    case computer
    case history
    case settings
    case firstRun
}

extension Notification.Name {
    static let awlOpenWindow = Notification.Name("awl.openWindow")
}

/// Hosts openWindow so MenuBarExtra and Settings buttons can raise feature windows.
struct MacAppWindowOpener: ViewModifier {
    @Environment(\.openWindow) private var openWindow

    func body(content: Content) -> some View {
        content
            .onReceive(NotificationCenter.default.publisher(for: .awlOpenWindow)) { note in
                guard let raw = note.object as? String,
                      let id = MacAppWindowID(rawValue: raw)
                else { return }
                openWindow(id: id.rawValue)
            }
    }
}

extension View {
    func awlWindowOpener() -> some View {
        modifier(MacAppWindowOpener())
    }
}
