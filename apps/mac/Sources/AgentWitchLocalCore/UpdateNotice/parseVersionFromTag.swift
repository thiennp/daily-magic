import Foundation

/// Strips `prefix` (e.g. `awl-mac-v`) and returns a plain `major.minor.patch` body.
public func parseVersionFromTag(tag: String, prefix: String) -> String? {
    guard !prefix.isEmpty, tag.hasPrefix(prefix) else {
        return nil
    }
    let ver = String(tag.dropFirst(prefix.count))
    guard isPlainSemver(ver) else {
        return nil
    }
    return ver
}
