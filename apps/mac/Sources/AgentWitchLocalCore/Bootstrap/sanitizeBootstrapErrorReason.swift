import Foundation

/// Redacts likely secrets from user-visible bootstrap error reasons.
public func sanitizeBootstrapErrorReason(_ reason: String) -> String {
    var result = reason
    let patterns = [
        #"(?i)(token|code|verifier|code_verifier|installToken)[=:]\S+"#,
        #"(?i)agentwitch-local://\S+"#,
    ]
    for pattern in patterns {
        guard let regex = try? NSRegularExpression(pattern: pattern) else { continue }
        let range = NSRange(result.startIndex..<result.endIndex, in: result)
        result = regex.stringByReplacingMatches(
            in: result,
            range: range,
            withTemplate: "[redacted]"
        )
    }
    return result
}
