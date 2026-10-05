import CryptoKit
import XCTest
@testable import AgentWitchLocalCore

final class BootstrapScriptValidationTests: XCTestCase {
    func testScriptUrlAcceptsHttpsWww() {
        XCTAssertTrue(isValidBootstrapScriptUrl("https://www.agentwitch.com/install/agent-witch.sh"))
        XCTAssertTrue(isValidBootstrapScriptUrl("https://agentwitch.com/install/agent-witch.sh"))
    }

    func testScriptUrlRejectsHttpTokenOrWrongHost() {
        XCTAssertFalse(isValidBootstrapScriptUrl("http://www.agentwitch.com/install/agent-witch.sh"))
        XCTAssertFalse(isValidBootstrapScriptUrl("https://evil.com/install/agent-witch.sh"))
        XCTAssertFalse(
            isValidBootstrapScriptUrl(
                "https://www.agentwitch.com/install/agent-witch.sh?token=secret"
            )
        )
    }

    func testVerifySha256Hex() {
        let data = Data("hello".utf8)
        let digest = SHA256.hash(data: data)
        let hex = digest.map { String(format: "%02x", $0) }.joined()
        XCTAssertTrue(verifySha256Hex(data: data, expectedHex: hex))
        XCTAssertTrue(verifySha256Hex(data: data, expectedHex: hex.uppercased()))
        XCTAssertFalse(verifySha256Hex(data: data, expectedHex: String(repeating: "0", count: 64)))
    }

    func testParseExchangeRequiresChecksumAndProfileEmail() throws {
        let ok = """
        {"installToken":"tok","profileEmail":"a@b.com","scriptUrl":"https://www.agentwitch.com/install/agent-witch.sh","scriptSha256":"abc123"}
        """.data(using: .utf8)!
        let parsed = try parseBootstrapExchangeResponse(data: ok)
        XCTAssertEqual(parsed.installToken, "tok")
        XCTAssertEqual(parsed.profileEmail, "a@b.com")
        XCTAssertEqual(parsed.scriptSha256, "abc123")

        let missingSha = """
        {"installToken":"tok","profileEmail":"a@b.com","scriptUrl":"https://www.agentwitch.com/install/agent-witch.sh","scriptSha256":null}
        """.data(using: .utf8)!
        XCTAssertThrowsError(try parseBootstrapExchangeResponse(data: missingSha))

        let emptySha = """
        {"installToken":"tok","profileEmail":"a@b.com","scriptUrl":"https://www.agentwitch.com/install/agent-witch.sh","scriptSha256":""}
        """.data(using: .utf8)!
        XCTAssertThrowsError(try parseBootstrapExchangeResponse(data: emptySha))

        let missingEmail = """
        {"installToken":"tok","scriptUrl":"https://www.agentwitch.com/install/agent-witch.sh","scriptSha256":"abc"}
        """.data(using: .utf8)!
        XCTAssertThrowsError(try parseBootstrapExchangeResponse(data: missingEmail))
    }

    func testFallbackInstallCommand() {
        XCTAssertEqual(
            resolveBootstrapFallbackInstallCommand(),
            "curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash"
        )
    }

    func testEnvVarNamesMatchOfficialScript() {
        XCTAssertEqual(MacAppConstants.installTokenEnvironmentVariable, "PRESET_PAIRING_TOKEN")
        XCTAssertEqual(MacAppConstants.profileEmailEnvironmentVariable, "PRESET_PROFILE_EMAIL")
    }
}
