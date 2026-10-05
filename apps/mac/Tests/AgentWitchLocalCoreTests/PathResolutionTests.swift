import XCTest
@testable import AgentWitchLocalCore

final class PathResolutionTests: XCTestCase {
    func testResolveInstallDirUsesProductionFolder() {
        let home = URL(fileURLWithPath: "/Users/test", isDirectory: true)
        let dir = resolveAgentWitchInstallDir(homeDirectory: home)
        XCTAssertEqual(dir.path, "/Users/test/.agent-witch")
    }

    func testResolvePlistPathUsesLaunchAgentLabel() {
        let home = URL(fileURLWithPath: "/Users/test", isDirectory: true)
        let plist = resolveAgentWitchLaunchAgentPlistPath(homeDirectory: home)
        XCTAssertEqual(
            plist.path,
            "/Users/test/Library/LaunchAgents/com.agent-witch.plist"
        )
    }

    func testHealthAndStatusUrls() {
        XCTAssertEqual(
            resolveAgentWitchLocalHealthUrl().absoluteString,
            "http://127.0.0.1:43347/health"
        )
        XCTAssertEqual(
            resolveAgentWitchLocalStatusUrl().absoluteString,
            "http://127.0.0.1:43347/status"
        )
    }

    func testConnectThisMacUrlUsesDefaultOrigin() {
        XCTAssertEqual(
            resolveConnectThisMacUrl().absoluteString,
            "https://www.agentwitch.com"
        )
    }

    func testNewestLogPrefersNewestProfileLog() throws {
        let temp = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString, isDirectory: true)
        defer { try? FileManager.default.removeItem(at: temp) }

        let older = temp
            .appendingPathComponent("profiles/a@example.com/logs", isDirectory: true)
        let newer = temp
            .appendingPathComponent("profiles/b@example.com/logs", isDirectory: true)
        try FileManager.default.createDirectory(at: older, withIntermediateDirectories: true)
        try FileManager.default.createDirectory(at: newer, withIntermediateDirectories: true)

        let olderLog = older.appendingPathComponent("agent-witch.log")
        let newerLog = newer.appendingPathComponent("agent-witch.log")
        try "old".write(to: olderLog, atomically: true, encoding: .utf8)
        try "new".write(to: newerLog, atomically: true, encoding: .utf8)

        let olderDate = Date(timeIntervalSince1970: 1_000)
        let newerDate = Date(timeIntervalSince1970: 2_000)
        try FileManager.default.setAttributes([.modificationDate: olderDate], ofItemAtPath: olderLog.path)
        try FileManager.default.setAttributes([.modificationDate: newerDate], ofItemAtPath: newerLog.path)

        let resolved = resolveNewestAgentWitchMainLogPath(installDir: temp)
        XCTAssertEqual(resolved?.path, newerLog.path)
    }

    func testNewestLogFallsBackToLegacyLogsDir() throws {
        let temp = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString, isDirectory: true)
        defer { try? FileManager.default.removeItem(at: temp) }

        let legacyDir = temp.appendingPathComponent("logs", isDirectory: true)
        try FileManager.default.createDirectory(at: legacyDir, withIntermediateDirectories: true)
        let legacyLog = legacyDir.appendingPathComponent("agent-witch.log")
        try "legacy".write(to: legacyLog, atomically: true, encoding: .utf8)

        let resolved = resolveNewestAgentWitchMainLogPath(installDir: temp)
        XCTAssertEqual(resolved?.path, legacyLog.path)
    }
}
