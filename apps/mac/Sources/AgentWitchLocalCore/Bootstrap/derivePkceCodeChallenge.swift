import CryptoKit
import Foundation

/// S256 code_challenge = BASE64URL(SHA256(ASCII(code_verifier))) per RFC 7636.
public func derivePkceCodeChallenge(codeVerifier: String) -> String {
    let digest = SHA256.hash(data: Data(codeVerifier.utf8))
    return encodeBase64Url(Data(digest))
}
