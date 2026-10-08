import Foundation

/// Gatekeeper App Translocation: a quarantined app opened from Downloads/DMG
/// runs from a random read-only copy under .../AppTranslocation/....
public func isAppTranslocated(bundlePath: String) -> Bool {
    return bundlePath.contains("/AppTranslocation/")
}

public func isAppInApplicationsFolder(bundlePath: String, homeDirectory: String) -> Bool {
    if bundlePath.hasPrefix("/Applications/") {
        return true
    }
    
    let homeAppsPath = (homeDirectory as NSString).appendingPathComponent("Applications") + "/"
    if bundlePath.hasPrefix(homeAppsPath) {
        return true
    }
    
    return false
}
