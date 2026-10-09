import Foundation

/// Where the app runs from when that is not a normal install. The app stops when
/// a mounted disk image is ejected, so all three cases get "move to Applications".
public enum AppInstallGuidance: Equatable {
    case mountedDiskImage
    case translocated
    case notInApplications

    public var title: String { "Move AgentWitch Local to Applications" }

    public var message: String {
        switch self {
        case .mountedDiskImage:
            return "AgentWitch Local is running from the disk image, so it stops when you eject it. Drag it into Applications, eject the disk image, then open it from Applications."
        case .translocated:
            return "macOS is running a temporary copy. Quit, drag AgentWitch Local into Applications, then open it from there."
        case .notInApplications:
            return "Install AgentWitch Local in Applications so it keeps running after you close this folder. Drag it into Applications, then open it from there."
        }
    }
}

/// Nil when the app already runs from an Applications folder.
public func resolveAppInstallGuidance(bundlePath: String, homeDirectory: String) -> AppInstallGuidance? {
    if isAppInApplicationsFolder(bundlePath: bundlePath, homeDirectory: homeDirectory) {
        return nil
    }
    if isAppTranslocated(bundlePath: bundlePath) {
        return .translocated
    }
    if bundlePath.hasPrefix("/Volumes/") {
        return .mountedDiskImage
    }
    return .notInApplications
}
