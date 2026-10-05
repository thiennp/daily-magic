import Foundation

/// GETs the releases list (not /latest), filters by tag prefix, compares to currentVersion.
/// Failures return `.failed` without throwing.
public func checkForUpdate(
    http: UpdateNoticeHttpClienting,
    prefix: String,
    currentVersion: String,
    releasesURL: URL = URL(string: MacAppConstants.releasesAPIURL + "?per_page=100")!
) async -> UpdateCheckResult {
    do {
        let data = try await http.getData(url: releasesURL)
        guard let entries = parseReleasesJSON(data) else {
            return .failed
        }
        return .checked(selectNewestUpdate(
            releases: entries,
            prefix: prefix,
            currentVersion: currentVersion
        ))
    } catch {
        return .failed
    }
}

/// Prefer CFBundleShortVersionString when present (shipped DMG); else the package constant.
public func resolveMacAppVersion(bundle: Bundle = .main) -> String {
    if let v = bundle.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String {
        let trimmed = v.trimmingCharacters(in: .whitespacesAndNewlines)
        if !trimmed.isEmpty {
            return trimmed
        }
    }
    return MacAppConstants.appVersion
}
