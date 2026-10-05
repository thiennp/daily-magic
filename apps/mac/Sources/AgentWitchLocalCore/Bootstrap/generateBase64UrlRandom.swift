import Foundation
import Security

/// Generates `byteCount` cryptographically random bytes, base64url-encoded (no padding).
public func generateBase64UrlRandom(
    byteCount: Int = MacAppConstants.bootstrapPkceByteCount,
    randomBytes: (Int) -> Data = { count in
        var bytes = [UInt8](repeating: 0, count: count)
        let status = SecRandomCopyBytes(kSecRandomDefault, count, &bytes)
        precondition(status == errSecSuccess, "SecRandomCopyBytes failed")
        return Data(bytes)
    }
) -> String {
    encodeBase64Url(randomBytes(byteCount))
}
