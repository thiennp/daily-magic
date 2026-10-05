import CryptoKit
import XCTest
@testable import AgentWitchLocalCore

private final class FakeBrowserOpener: BrowserOpening, @unchecked Sendable {
    private(set) var opened: [URL] = []
    func open(_ url: URL) throws {
        opened.append(url)
    }
}

private final class FakeHttpClient: BootstrapHttpClienting, @unchecked Sendable {
    var postHandler: ((URL, Data) async throws -> (Data, Int))?
    var getHandler: ((URL) async throws -> Data)?
    private(set) var postBodies: [Data] = []

    func postJson(url: URL, body: Data) async throws -> (Data, Int) {
        postBodies.append(body)
        guard let postHandler else {
            throw NSError(domain: "test", code: 1)
        }
        return try await postHandler(url, body)
    }

    func getData(url: URL) async throws -> Data {
        guard let getHandler else {
            throw NSError(domain: "test", code: 2)
        }
        return try await getHandler(url)
    }
}

private final class FakeScriptRunner: InstallScriptRunning, @unchecked Sendable {
    var status: Int32 = 0
    private(set) var lastEnvironment: [String: String] = [:]
    private(set) var lastArguments: [String] = []
    private(set) var lastScriptPath: URL?

    func run(scriptPath: URL, environment: [String: String]) throws -> Int32 {
        lastScriptPath = scriptPath
        lastEnvironment = environment
        lastArguments = [scriptPath.path]
        return status
    }
}

final class BootstrapFlowTests: XCTestCase {
    private let scriptBody = Data("#!/bin/bash\necho ok\n".utf8)

    private func scriptShaHex(_ data: Data) -> String {
        SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
    }

    private func makePending(now: Date = Date()) -> MacAppBootstrapPendingAttempt {
        MacAppBootstrapPendingAttempt(
            state: "state-value",
            codeVerifier: "verifier-value",
            createdAt: now
        )
    }

    func testHappyPathInstallAndSetup() async throws {
        let http = FakeHttpClient()
        let runner = FakeScriptRunner()
        let sha = scriptShaHex(scriptBody)
        http.postHandler = { _, _ in
            let json = """
            {"installToken":"SECRET_TOKEN","profileEmail":"user@example.com","scriptUrl":"https://www.agentwitch.com/install/agent-witch.sh","scriptSha256":"\(sha)"}
            """
            return (Data(json.utf8), 200)
        }
        http.getHandler = { _ in self.scriptBody }

        var captured: BootstrapInstallCapturedEnv?
        let install = await runBootstrapInstallFlow(
            current: .installing,
            code: "auth-code",
            pending: makePending(),
            http: http,
            scriptRunner: runner,
            onScriptInvocation: { captured = $0 }
        )
        XCTAssertEqual(install.state, .settingUp)
        XCTAssertNil(install.pending)
        XCTAssertEqual(install.scriptExitStatus, 0)

        XCTAssertEqual(
            runner.lastEnvironment[MacAppConstants.installTokenEnvironmentVariable],
            "SECRET_TOKEN"
        )
        XCTAssertEqual(
            runner.lastEnvironment[MacAppConstants.profileEmailEnvironmentVariable],
            "user@example.com"
        )
        // Token and email only in env — never argv.
        XCTAssertEqual(runner.lastArguments.count, 1)
        XCTAssertFalse(runner.lastArguments.contains(where: { $0.contains("SECRET_TOKEN") }))
        XCTAssertFalse(runner.lastArguments.contains(where: { $0.contains("user@example.com") }))
        XCTAssertEqual(
            captured?.environment[MacAppConstants.installTokenEnvironmentVariable],
            "SECRET_TOKEN"
        )
        XCTAssertFalse(captured?.arguments.contains(where: { $0.contains("SECRET") }) ?? true)

        // Post body must include code_verifier (and not leak into runner argv).
        let posted = try XCTUnwrap(http.postBodies.first)
        let obj = try JSONSerialization.jsonObject(with: posted) as? [String: String]
        XCTAssertEqual(obj?["code"], "auth-code")
        XCTAssertEqual(obj?["state"], "state-value")
        XCTAssertEqual(obj?["code_verifier"], "verifier-value")

        var probes = 0
        let setup = await runBootstrapSetupFlow(
            current: .settingUp,
            probeHealth: {
                probes += 1
                return probes >= 2 ? .ours : .unhealthy
            },
            sleep: { _ in },
            now: {
                // Advance fake clock slowly so second probe succeeds before timeout.
                Date(timeIntervalSince1970: Double(probes))
            },
            timeoutSeconds: 10,
            pollIntervalSeconds: 0
        )
        XCTAssertEqual(setup.state, .connected)
    }

    func testExchangeHttpErrorClearsPending() async {
        let http = FakeHttpClient()
        http.postHandler = { _, _ in (Data(), 400) }
        let runner = FakeScriptRunner()
        let result = await runBootstrapInstallFlow(
            current: .installing,
            code: "c",
            pending: makePending(),
            http: http,
            scriptRunner: runner
        )
        guard case .error = result.state else {
            return XCTFail("expected error")
        }
        XCTAssertNil(result.pending)
        XCTAssertNil(runner.lastScriptPath)
    }

    func testChecksumMismatch() async {
        let http = FakeHttpClient()
        http.postHandler = { _, _ in
            let json = """
            {"installToken":"tok","profileEmail":"a@b.c","scriptUrl":"https://www.agentwitch.com/install/agent-witch.sh","scriptSha256":"\(String(repeating: "ab", count: 32))"}
            """
            return (Data(json.utf8), 200)
        }
        http.getHandler = { _ in self.scriptBody }
        let runner = FakeScriptRunner()
        let result = await runBootstrapInstallFlow(
            current: .installing,
            code: "c",
            pending: makePending(),
            http: http,
            scriptRunner: runner
        )
        guard case .error(let reason) = result.state else {
            return XCTFail("expected error")
        }
        XCTAssertTrue(reason.lowercased().contains("checksum"))
        XCTAssertNil(result.pending)
        XCTAssertNil(runner.lastScriptPath)
    }

    func testHealthTimeout() async {
        let start = Date(timeIntervalSince1970: 0)
        var tick = 0
        let result = await runBootstrapSetupFlow(
            current: .settingUp,
            probeHealth: { .unhealthy },
            sleep: { _ in tick += 1 },
            now: {
                // Jump past timeout after a couple iterations.
                if tick >= 2 {
                    return start.addingTimeInterval(1000)
                }
                return start.addingTimeInterval(TimeInterval(tick))
            },
            timeoutSeconds: 5,
            pollIntervalSeconds: 1
        )
        guard case .error(let reason) = result.state else {
            return XCTFail("expected timeout error")
        }
        XCTAssertTrue(reason.lowercased().contains("timed out"))
    }

    func testSetupFailsFastWhenAnotherUsersAgentWitchAnswers() async {
        var probes = 0
        var slept = 0
        let result = await runBootstrapSetupFlow(
            current: .settingUp,
            probeHealth: {
                probes += 1
                return .foreign
            },
            sleep: { _ in slept += 1 },
            now: { Date(timeIntervalSince1970: 0) },
            timeoutSeconds: 60,
            pollIntervalSeconds: 1
        )
        guard case .error(let reason) = result.state else {
            return XCTFail("expected foreign responder error, got \(result.state)")
        }
        XCTAssertTrue(reason.contains("another macOS user"))
        XCTAssertEqual(probes, 1)
        XCTAssertEqual(slept, 0)
    }

    func testSetupNeverConnectsOnUnverifiedOldServer() async {
        let start = Date(timeIntervalSince1970: 0)
        var tick = 0
        let result = await runBootstrapSetupFlow(
            current: .settingUp,
            probeHealth: { .unverified },
            sleep: { _ in tick += 1 },
            now: { start.addingTimeInterval(TimeInterval(tick * 10)) },
            timeoutSeconds: 25,
            pollIntervalSeconds: 1
        )
        guard case .error(let reason) = result.state else {
            return XCTFail("expected unverified timeout error, got \(result.state)")
        }
        XCTAssertTrue(reason.contains("did not identify"))
        XCTAssertNotEqual(result.state, .connected)
    }

    func testBeginSignInOpensBrowserAndReplacesPending() throws {
        let opener = FakeBrowserOpener()
        let fixed = Data(repeating: 0x42, count: 32)
        let result = try beginBootstrapSignInFlow(
            current: .checking,
            opener: opener,
            now: Date(timeIntervalSince1970: 42),
            randomBytes: { _ in fixed }
        )
        XCTAssertEqual(result.state, .signingIn)
        XCTAssertEqual(opener.opened.count, 1)
        let url = try XCTUnwrap(opener.opened.first)
        XCTAssertTrue(url.absoluteString.contains("code_challenge_method=S256"))
        XCTAssertTrue(url.absoluteString.contains("client=mac-app"))
        XCTAssertEqual(result.pending.codeVerifier, encodeBase64Url(fixed))
        XCTAssertEqual(result.pending.state, encodeBase64Url(fixed))
    }

    func testRetrySignInFromSigningInReplacesPendingAndReopensBrowser() throws {
        let opener = FakeBrowserOpener()
        let first = try beginBootstrapSignInFlow(
            current: .checking,
            opener: opener,
            randomBytes: { count in Data(repeating: 0x01, count: count) }
        )
        let retry = try beginBootstrapSignInFlow(
            current: first.state,
            opener: opener,
            randomBytes: { count in Data(repeating: 0x02, count: count) }
        )
        XCTAssertEqual(retry.state, .signingIn)
        XCTAssertEqual(opener.opened.count, 2)
        XCTAssertNotEqual(retry.pending.state, first.pending.state)
        XCTAssertNotEqual(retry.pending.codeVerifier, first.pending.codeVerifier)
        XCTAssertNotEqual(opener.opened[0], opener.opened[1])
        XCTAssertEqual(
            isBootstrapPendingAttemptValid(pending: retry.pending, callbackState: first.pending.state),
            .stateMismatch
        )
    }

    func testRetrySignInDisallowedOutsideSigningIn() {
        let opener = FakeBrowserOpener()
        XCTAssertThrowsError(try beginBootstrapSignInFlow(current: .installing, opener: opener))
        XCTAssertTrue(opener.opened.isEmpty)
    }
}
