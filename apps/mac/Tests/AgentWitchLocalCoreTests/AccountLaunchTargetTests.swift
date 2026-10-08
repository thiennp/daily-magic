import XCTest
@testable import AgentWitchLocalCore

final class AccountLaunchTargetTests: XCTestCase {
    var tempHome: URL!
    var installDir: URL!
    var launchAgents: URL!

    override func setUp() {
        super.setUp()
        tempHome = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        installDir = tempHome.appendingPathComponent(".agent-witch", isDirectory: true)
        launchAgents = tempHome
            .appendingPathComponent("Library", isDirectory: true)
            .appendingPathComponent("LaunchAgents", isDirectory: true)
        try? FileManager.default.createDirectory(at: installDir, withIntermediateDirectories: true)
        try? FileManager.default.createDirectory(at: launchAgents, withIntermediateDirectories: true)
    }

    override func tearDown() {
        try? FileManager.default.removeItem(at: tempHome)
        super.tearDown()
    }

    func writeHostServices(_ accounts: [(String, String)]) throws {
        let rows = accounts.map { email, label in
            """
            { "email": "\(email)", "launchAgentLabel": "\(label)", "systemdUnitName": "u.service", "wakePort": 1 }
            """
        }.joined(separator: ",")
        let json = """
        { "version": 1, "mode": "per-account", "updatedAt": "", "accounts": [\(rows)] }
        """
        try json.write(
            to: installDir.appendingPathComponent("host-services.json"),
            atomically: true,
            encoding: .utf8
        )
    }

    func testResolveUsesPerAccountLabelNeverLegacyWhenMigrated() throws {
        try writeHostServices([
            ("agt@example.com", "com.agent-witch.aaa"),
            ("gmail@example.com", "com.agent-witch.bbb"),
        ])
        let target = resolveAccountLaunchTarget(
            email: "gmail@example.com",
            installDir: installDir,
            homeDirectory: tempHome
        )
        XCTAssertEqual(target?.label, "com.agent-witch.bbb")
        XCTAssertEqual(target?.plistPath.lastPathComponent, "com.agent-witch.bbb.plist")
        XCTAssertNotEqual(target?.label, MacAppConstants.launchAgentLabel)
    }

    func testResolveFallsBackToLegacyBeforeMigration() {
        let target = resolveAccountLaunchTarget(
            email: "only@example.com",
            installDir: installDir,
            homeDirectory: tempHome
        )
        XCTAssertEqual(target?.label, MacAppConstants.launchAgentLabel)
    }

    func testResolveReturnsNilWhenMigratedButEmailMissing() throws {
        try writeHostServices([("agt@example.com", "com.agent-witch.aaa")])
        XCTAssertNil(
            resolveAccountLaunchTarget(
                email: "gmail@example.com",
                installDir: installDir,
                homeDirectory: tempHome
            )
        )
    }

    func testListAccountsIncludesLaunchAgentLabel() throws {
        try writeHostServices([("alice@example.com", "com.agent-witch.alice")])
        let accounts = listLocalAppAccounts(installDir: installDir)
        XCTAssertEqual(accounts.first?.email, "alice@example.com")
        XCTAssertEqual(accounts.first?.launchAgentLabel, "com.agent-witch.alice")
    }
}
