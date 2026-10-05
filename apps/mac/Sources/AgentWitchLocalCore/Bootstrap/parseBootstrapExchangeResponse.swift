import Foundation

public enum BootstrapExchangeParseError: Error, Equatable {
    case invalidJson
    case missingField(String)
}

/// Parses `{installToken, profileEmail, scriptUrl, scriptSha256}` (checksum required).
public func parseBootstrapExchangeResponse(data: Data) throws -> BootstrapExchangeResponse {
    guard let root = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
        throw BootstrapExchangeParseError.invalidJson
    }
    guard let installToken = root["installToken"] as? String, !installToken.isEmpty else {
        throw BootstrapExchangeParseError.missingField("installToken")
    }
    guard let profileEmail = root["profileEmail"] as? String else {
        throw BootstrapExchangeParseError.missingField("profileEmail")
    }
    guard let scriptUrl = root["scriptUrl"] as? String, !scriptUrl.isEmpty else {
        throw BootstrapExchangeParseError.missingField("scriptUrl")
    }
    guard let scriptSha256 = root["scriptSha256"] as? String else {
        throw BootstrapExchangeParseError.missingField("scriptSha256")
    }
    let trimmedSha = scriptSha256.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmedSha.isEmpty else {
        throw BootstrapExchangeParseError.missingField("scriptSha256")
    }
    return BootstrapExchangeResponse(
        installToken: installToken,
        profileEmail: profileEmail.trimmingCharacters(in: .whitespacesAndNewlines),
        scriptUrl: scriptUrl,
        scriptSha256: trimmedSha
    )
}
