import Foundation

/// Picks the newest non-draft, non-prerelease release for `prefix` newer than `currentVersion`.
public func selectNewestUpdate(
    releases: [ReleaseEntry],
    prefix: String,
    currentVersion: String
) -> UpdateOffer? {
    var best: UpdateOffer?
    for rel in releases {
        if rel.draft || rel.prerelease {
            continue
        }
        guard let ver = parseVersionFromTag(tag: rel.tagName, prefix: prefix),
              isNewerSemver(candidate: ver, current: currentVersion),
              let url = URL(string: rel.htmlURL),
              !rel.htmlURL.isEmpty
        else {
            continue
        }
        if let currentBest = best {
            if isNewerSemver(candidate: ver, current: currentBest.version) {
                best = UpdateOffer(version: ver, url: url)
            }
        } else {
            best = UpdateOffer(version: ver, url: url)
        }
    }
    return best
}

public func updateAvailableTitle(version: String) -> String {
    "Update available (v\(version))"
}
