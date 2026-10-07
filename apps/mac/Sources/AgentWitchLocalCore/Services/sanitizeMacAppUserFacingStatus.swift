import Foundation

/// Strips bare launchctl / exit status numbers (esp. **113**) from user-facing chrome.
public func sanitizeMacAppUserFacingStatus(_ message: String) -> String {
    var result = sanitizeBootstrapErrorReason(message)
    let patterns = [
        #"(?i)\bstatus\s*113\b"#,
        #"(?i)\bexit(?:ed)?(?:\s+with)?(?:\s+status)?\s*113\b"#,
        #"(?i)\blaunchctl[^\n.]{0,40}\b113\b"#,
    ]
    for pattern in patterns {
        guard let regex = try? NSRegularExpression(pattern: pattern) else { continue }
        let range = NSRange(result.startIndex..<result.endIndex, in: result)
        result = regex.stringByReplacingMatches(
            in: result,
            range: range,
            withTemplate: ""
        )
    }
    let collapsed = result
        .replacingOccurrences(of: #"\s{2,}"#, with: " ", options: .regularExpression)
        .trimmingCharacters(in: .whitespacesAndNewlines)
    if collapsed.isEmpty
        || collapsed.lowercased().contains("kickstart failed")
        || collapsed.lowercased().contains("bootstrap failed")
    {
        return MacAppSetupFailureKind.couldNotFinishTitle
    }
    return collapsed
}
