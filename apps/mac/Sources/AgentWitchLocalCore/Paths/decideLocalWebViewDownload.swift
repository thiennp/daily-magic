import Foundation

/// Policy for a `MacAppLocalWebView` navigation action (AWL-H7 DF-013).
public enum LocalWebViewNavigationDecision: Equatable {
    case allow
    case download
    case openExternally
    case cancel
}

/// Keeps the F-2 loopback allowlist and adds download handling:
/// loopback `<a download>` → `.download`; `blob:`/`data:` only when the action is a
/// download (never opened as a page); `https` opens externally; everything else cancels.
public func decideLocalWebViewNavigation(
    url: URL,
    allowedPort: Int?,
    shouldPerformDownload: Bool
) -> LocalWebViewNavigationDecision {
    if let allowedPort, shouldAllowLocalWebViewNavigation(url: url, allowedPort: allowedPort) {
        return shouldPerformDownload ? .download : .allow
    }
    let scheme = url.scheme?.lowercased()
    if shouldPerformDownload, scheme == "blob" || scheme == "data" {
        return .download
    }
    if scheme == "https" {
        return .openExternally
    }
    return .cancel
}

/// Whether a loopback response must become a WKDownload instead of rendering.
/// WKWebView ignores `Content-Disposition: attachment` unless the delegate returns
/// `.download` — e.g. Prompt optimizer `?export=wizard-markdown` (text/markdown) (DF-013).
public func shouldDownloadLocalWebViewResponse(
    contentDisposition: String?,
    canShowMIMEType: Bool
) -> Bool {
    if !canShowMIMEType {
        return true
    }
    guard let contentDisposition else {
        return false
    }
    let kind = contentDisposition
        .split(separator: ";", maxSplits: 1, omittingEmptySubsequences: false)
        .first
        .map { $0.trimmingCharacters(in: .whitespaces).lowercased() }
    return kind == "attachment"
}

/// Strips path separators / leading dots from a server-suggested filename.
public func sanitizeLocalWebViewDownloadFilename(_ suggested: String) -> String {
    let replaced = suggested
        .replacingOccurrences(of: "/", with: "-")
        .replacingOccurrences(of: ":", with: "-")
        .trimmingCharacters(in: .whitespacesAndNewlines)
    var trimmed = Substring(replaced)
    while trimmed.first == "." {
        trimmed = trimmed.dropFirst()
    }
    let result = trimmed.trimmingCharacters(in: .whitespacesAndNewlines)
    return result.isEmpty ? "download" : result
}

/// Unique destination in `directory` (`name.md`, `name (1).md`, …) — WKDownload fails if it exists.
public func resolveLocalWebViewDownloadDestination(
    directory: URL,
    suggestedFilename: String,
    fileExists: (String) -> Bool
) -> URL {
    let name = sanitizeLocalWebViewDownloadFilename(suggestedFilename)
    let candidate = directory.appendingPathComponent(name)
    if !fileExists(candidate.path) {
        return candidate
    }
    let ext = (name as NSString).pathExtension
    let base = (name as NSString).deletingPathExtension
    for index in 1...999 {
        let numbered = ext.isEmpty ? "\(base) (\(index))" : "\(base) (\(index)).\(ext)"
        let url = directory.appendingPathComponent(numbered)
        if !fileExists(url.path) {
            return url
        }
    }
    let fallback = ext.isEmpty ? "\(base)-\(UUID().uuidString)" : "\(base)-\(UUID().uuidString).\(ext)"
    return directory.appendingPathComponent(fallback)
}
