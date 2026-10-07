import XCTest
@testable import AgentWitchLocalCore

final class ProjectFolderSummaryTests: XCTestCase {
    func testParsesTopLevelSummary() {
        let body = #"{"ok":true,"summary":"AgentWitch uses ~/daily-magic (git repo).","folders":[{"projectName":"AgentWitch","summary":"x"}]}"#
        XCTAssertEqual(ProjectFolderSummary.parse(Data(body.utf8)), "AgentWitch uses ~/daily-magic (git repo).")
    }

    func testNilWhenNotOkEmptyOrBroken() {
        XCTAssertNil(ProjectFolderSummary.parse(Data(#"{"ok":false,"summary":"x"}"#.utf8)))
        XCTAssertNil(ProjectFolderSummary.parse(Data(#"{"ok":true,"summary":"  "}"#.utf8)))
        XCTAssertNil(ProjectFolderSummary.parse(Data("<html>".utf8)))
    }

    func testKeepsFirstLineAndCapsLength() {
        let long = String(repeating: "a", count: 300)
        let body = "{\"ok\":true,\"summary\":\"\(long)\\nsecond\"}"
        let parsed = ProjectFolderSummary.parse(Data(body.utf8))
        XCTAssertEqual(parsed?.count, 198)
        XCTAssertTrue(parsed?.hasSuffix("…") == true)
    }
}
