import XCTest
@testable import AgentWitchLocalCore

final class LocalAppLogDirTests: XCTestCase {
    func testEnsureCreatesLogFolder() throws {
        let home = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: home) }
        let dir = ensureAgentWitchLocalAppLogsDir(homeDirectory: home)
        XCTAssertNotNil(dir)
        var isDir: ObjCBool = false
        XCTAssertTrue(FileManager.default.fileExists(atPath: dir!.path, isDirectory: &isDir) && isDir.boolValue)
        appendAgentWitchLocalAppLog("hello", homeDirectory: home)
        let log = dir!.appendingPathComponent(MacAppConstants.appLogFileName)
        let text = try String(contentsOf: log, encoding: .utf8)
        XCTAssertTrue(text.contains("hello"))
    }
}
