import XCTest
@testable import AgentWitchLocalCore

final class LocalPortRangeTests: XCTestCase {
    func testDisplayAndValidity() {
        let range = MacAppLocalPortRange(start: 49152, end: 49167)
        XCTAssertTrue(range.isValid)
        XCTAssertEqual(range.displayString, "49152–49167")
        XCTAssertEqual(range.closedRange, 49152...49167)
        XCTAssertEqual(MacAppConstants.portsInUseReason, "Ports for this account are in use.")
        XCTAssertEqual(
            MacAppConstants.localPortRangeHelp,
            "Unique to this AgentWitch account on this computer."
        )
    }

    func testAllocatePersistsAndIsStable() throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("awl-ports-\(UUID().uuidString)", isDirectory: true)
        let profiles = root.appendingPathComponent("profiles", isDirectory: true)
        let profile = profiles.appendingPathComponent("a@example.com", isDirectory: true)
        try FileManager.default.createDirectory(at: profile, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: root) }

        let first = try allocateOrLoadLocalPortRange(
            profileDir: profile,
            profilesDir: profiles,
            random: { 0.0 }
        )
        XCTAssertTrue(first.isValid)
        let second = try allocateOrLoadLocalPortRange(
            profileDir: profile,
            profilesDir: profiles,
            random: { 0.9 }
        )
        XCTAssertEqual(first, second)
    }

    func testDifferentAccountsGetDifferentRanges() throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("awl-ports2-\(UUID().uuidString)", isDirectory: true)
        let profiles = root.appendingPathComponent("profiles", isDirectory: true)
        let a = profiles.appendingPathComponent("a@example.com", isDirectory: true)
        let b = profiles.appendingPathComponent("b@example.com", isDirectory: true)
        try FileManager.default.createDirectory(at: a, withIntermediateDirectories: true)
        try FileManager.default.createDirectory(at: b, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: root) }

        let rangeA = try allocateOrLoadLocalPortRange(
            profileDir: a,
            profilesDir: profiles,
            random: { 0.0 }
        )
        let rangeB = try allocateOrLoadLocalPortRange(
            profileDir: b,
            profilesDir: profiles,
            random: { 0.0 }
        )
        XCTAssertNotEqual(rangeA.start, rangeB.start)
    }

    func testCandidatesIncludeLegacyPort() {
        let range = MacAppLocalPortRange(start: 49152, end: 49167)
        let ports = candidateLocalAppPorts(savedPort: 49155, range: range)
        XCTAssertEqual(ports.first, 49155)
        XCTAssertTrue(ports.contains(49152))
        XCTAssertTrue(ports.contains(MacAppConstants.localAppPort))
    }

    func testHealthUrlUsesDiscoveredPort() {
        XCTAssertEqual(
            resolveAgentWitchLocalHealthUrl(port: 49155).absoluteString,
            "http://127.0.0.1:49155/health"
        )
        XCTAssertEqual(
            resolveAgentWitchLocalHealthUrl().absoluteString,
            "http://127.0.0.1:43347/health"
        )
    }
}
