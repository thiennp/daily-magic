import XCTest
@testable import AgentWitchLocalCore

private final class FakeHealHTTP: BootstrapHttpClienting, @unchecked Sendable {
    var getError: Error?
    var data: Data = Data("# ok\n".utf8)

    func postJson(url: URL, body: Data) async throws -> (Data, Int) {
        (Data(), 200)
    }

    func getData(url: URL) async throws -> Data {
        if let getError { throw getError }
        return data
    }
}

private final class FakeHealScriptRunner: InstallScriptRunning, @unchecked Sendable {
    var status: Int32
    var throwOnRun = false
    private(set) var ran = false

    init(status: Int32 = 0) {
        self.status = status
    }

    func run(scriptPath: URL, environment: [String: String]) throws -> Int32 {
        ran = true
        if throwOnRun { throw NSError(domain: "test", code: 1) }
        return status
    }
}

private struct FakeNetworkError: Error {}

final class SelfHealSetupFlowTests: XCTestCase {
    func testDecideStartActionSelfHealsWhenMissingOrUnverified() {
        XCTAssertEqual(
            decideMacAppStartAction(
                isCoreInstalled: false,
                runtimeState: .notInstalled,
                ownership: .unhealthy
            ),
            .selfHeal
        )
        XCTAssertEqual(
            decideMacAppStartAction(
                isCoreInstalled: true,
                runtimeState: .stopped,
                ownership: .unverified
            ),
            .selfHeal
        )
        XCTAssertEqual(
            decideMacAppStartAction(
                isCoreInstalled: true,
                runtimeState: .stopped,
                ownership: .unhealthy
            ),
            .kickstart
        )
        XCTAssertEqual(
            decideMacAppStartAction(
                isCoreInstalled: true,
                runtimeState: .running,
                ownership: .ours
            ),
            .none
        )
        XCTAssertEqual(
            decideMacAppStartAction(
                isCoreInstalled: true,
                runtimeState: .running,
                ownership: .unhealthy
            ),
            .kickstart
        )
        XCTAssertEqual(
            decideMacAppStartAction(
                isCoreInstalled: true,
                runtimeState: .stopped,
                ownership: .foreign
            ),
            .blockedForeign
        )
    }

    func testProgressStepTitlesMatchDesign() {
        XCTAssertEqual(MacAppSetupProgressStep.checkingThisComputer.title, "Checking this computer")
        XCTAssertEqual(
            MacAppSetupProgressStep.downloadingTheConnection.title,
            "Downloading the connection"
        )
        XCTAssertEqual(
            MacAppSetupProgressStep.installingAssistantTools.title,
            "Installing support for assistant tools"
        )
        XCTAssertEqual(
            MacAppSetupProgressStep.checkingEverythingWorks.title,
            "Checking everything works"
        )
        XCTAssertEqual(
            MacAppSetupFailureKind.couldNotFinishTitle,
            "Could not finish setup on this computer."
        )
        let disk = MacAppSetupFailureKind.disk.userFacingDetail
        XCTAssertTrue(disk.contains("not enough free space"))
        XCTAssertFalse(disk.contains("600"))
        XCTAssertFalse(disk.contains("210"))
    }

    func testSanitizeStrips113() {
        let raw = "launchctl kickstart failed (status 113)."
        let cleaned = sanitizeMacAppUserFacingStatus(raw)
        XCTAssertFalse(cleaned.contains("113"))
        XCTAssertEqual(cleaned, MacAppSetupFailureKind.couldNotFinishTitle)
        XCTAssertFalse(sanitizeMacAppUserFacingStatus("exit status 113").contains("113"))
    }

    func testSelfHealSuccessEmitsStepsAndRunning() async {
        let http = FakeHealHTTP()
        let runner = FakeHealScriptRunner(status: 0)
        final class StepBox: @unchecked Sendable {
            var steps: [MacAppSetupProgressStep] = []
        }
        let box = StepBox()
        let result = await runSelfHealSetupFlow(
            isCoreInstalled: false,
            http: http,
            scriptRunner: runner,
            probeHealth: { .ours },
            onProgress: { step, _ in box.steps.append(step) },
            sleep: { _ in },
            healthTimeoutSeconds: 1,
            healthPollIntervalSeconds: 0
        )
        XCTAssertTrue(runner.ran)
        XCTAssertEqual(result.session, .succeeded)
        XCTAssertEqual(result.runtimeState, .running)
        XCTAssertTrue(box.steps.contains(.checkingThisComputer))
        XCTAssertTrue(box.steps.contains(.downloadingTheConnection))
        XCTAssertTrue(box.steps.contains(.installingAssistantTools))
        XCTAssertTrue(box.steps.contains(.checkingEverythingWorks))
    }

    func testSelfHealMapsScriptFailureWithout113() async {
        let http = FakeHealHTTP()
        let runner = FakeHealScriptRunner(status: 113)
        let result = await runSelfHealSetupFlow(
            isCoreInstalled: true,
            http: http,
            scriptRunner: runner,
            probeHealth: { .unverified },
            sleep: { _ in },
            healthTimeoutSeconds: 0.1,
            healthPollIntervalSeconds: 0
        )
        guard case .failed(let kind, _) = result.session else {
            return XCTFail("expected failed session, got \(result.session)")
        }
        XCTAssertEqual(kind, .generic)
        XCTAssertEqual(MacAppSetupFailureKind.couldNotFinishTitle.contains("113"), false)
    }

    func testSelfHealOfflineWhenDownloadFails() async {
        let http = FakeHealHTTP()
        http.getError = FakeNetworkError()
        let runner = FakeHealScriptRunner()
        let result = await runSelfHealSetupFlow(
            isCoreInstalled: false,
            http: http,
            scriptRunner: runner,
            probeHealth: { .unhealthy },
            sleep: { _ in },
            healthTimeoutSeconds: 0.1,
            healthPollIntervalSeconds: 0
        )
        guard case .failed(let kind, _) = result.session else {
            return XCTFail("expected failed")
        }
        XCTAssertEqual(kind, .offline)
        XCTAssertFalse(runner.ran)
    }

    func testSelfHealScriptUrls() {
        let install = resolveAgentWitchInstallScriptUrl()
        XCTAssertEqual(
            install.absoluteString,
            "https://www.agentwitch.com/install/agent-witch.sh"
        )
        let update = resolveAgentWitchUpdateScriptUrl()
        XCTAssertEqual(
            update.absoluteString,
            "https://www.agentwitch.com/install/agent-witch-update.sh"
        )
        XCTAssertEqual(
            resolveAgentWitchSelfHealScriptUrl(isCoreInstalled: true).absoluteString,
            update.absoluteString
        )
        XCTAssertEqual(
            resolveAgentWitchSelfHealScriptUrl(isCoreInstalled: false).absoluteString,
            install.absoluteString
        )
        XCTAssertTrue(isValidBootstrapScriptUrl(update.absoluteString))
    }

    func testResolveSignedInProfileEmailReadsEmailOnly() throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("awl-email-\(UUID().uuidString)", isDirectory: true)
        try FileManager.default.createDirectory(at: root, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: root) }
        let profile = root.appendingPathComponent("active-profile.json")
        try Data(#"{"email":"user@example.com"}"#.utf8).write(to: profile)
        XCTAssertEqual(
            resolveSignedInProfileEmail(installDir: root),
            "user@example.com"
        )
        try clearSignedInProfilePointer(installDir: root)
        XCTAssertNil(resolveSignedInProfileEmail(installDir: root))
        XCTAssertFalse(FileManager.default.fileExists(atPath: profile.path))
    }

    func testSelfHealHealthTimeoutMapsToGenericFailure() async {
        let http = FakeHealHTTP()
        let runner = FakeHealScriptRunner(status: 0)
        let result = await runSelfHealSetupFlow(
            isCoreInstalled: true,
            http: http,
            scriptRunner: runner,
            probeHealth: { .unverified },
            sleep: { _ in },
            healthTimeoutSeconds: 0.05,
            healthPollIntervalSeconds: 0
        )
        guard case .failed(let kind, _) = result.session else {
            return XCTFail("expected failed session on health timeout, got \(result.session)")
        }
        XCTAssertEqual(kind, .generic)
        XCTAssertEqual(result.runtimeState, .stopped)
        XCTAssertTrue(runner.ran)
    }

    func testRedactInstallScriptLogStripsTokens() {
        let raw = "PAIRING_TOKEN=abc123secret\ntoken=xyz\nFound 113 tools\n"
        let cleaned = redactInstallScriptLog(raw)
        XCTAssertFalse(cleaned.contains("abc123secret"))
        XCTAssertFalse(cleaned.contains("xyz"))
        XCTAssertTrue(cleaned.contains("<redacted>"))
        XCTAssertTrue(cleaned.contains("Found 113 tools"))
    }

    func testResolveSetupLogPath() {
        let root = URL(fileURLWithPath: "/tmp/fake-install", isDirectory: true)
        let url = resolveAgentWitchSetupLogPath(installDir: root)
        XCTAssertEqual(url.lastPathComponent, "setup.log")
        XCTAssertTrue(url.path.hasSuffix("/logs/setup.log"))
    }

}
