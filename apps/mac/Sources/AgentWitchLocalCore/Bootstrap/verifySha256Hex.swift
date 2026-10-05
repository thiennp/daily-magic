import CryptoKit
import Foundation

/// Returns true when `data`'s SHA-256 hex (lowercase) matches `expectedHex` (case-insensitive).
public func verifySha256Hex(data: Data, expectedHex: String) -> Bool {
    let digest = SHA256.hash(data: data)
    let actual = digest.map { String(format: "%02x", $0) }.joined()
    return constantTimeStringEquals(actual, expectedHex.lowercased())
}
