import Foundation

/// 279e425f (AWL 0.2.8): the History sidebar row said "History: Offline" while
/// this computer was connected. The badge only shows when it really is offline.
public func resolveHistorySidebarBadge(chromeKind: MacAppChromeKind, isOffline: Bool) -> String? {
    (isOffline || chromeKind == .waitingForInternet) ? "Offline" : nil
}

/// VoiceOver label for a sidebar row ("History", or "History, offline").
public func sidebarRowAccessibilityLabel(title: String, badge: String?) -> String {
    guard let badge, !badge.isEmpty else { return title }
    return "\(title), \(badge.lowercased())"
}

/// 279e425f: SwiftUI's `MenuBarExtra(.window)` panel class. Open window / Settings
/// close it so the popover does not stay over the window that just opened.
public func isMenuBarExtraWindowClassName(_ className: String) -> Bool {
    className.contains("MenuBarExtraWindow") || className.contains("MenuBarExtraPanel")
}
