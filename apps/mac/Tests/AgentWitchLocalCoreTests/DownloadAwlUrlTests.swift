import XCTest
@testable import AgentWitchLocalCore

final class DownloadAwlUrlTests: XCTestCase {
    func testResolveDownloadAwlUrlUsesCloudOriginDownloadPath() {
        let url = resolveDownloadAwlUrl(origin: "https://www.agentwitch.com")
        XCTAssertEqual(url.absoluteString, "https://www.agentwitch.com/download")
    }

    func testResolveDownloadAwlUrlTrimsTrailingSlash() {
        let url = resolveDownloadAwlUrl(origin: "https://www.agentwitch.com/")
        XCTAssertEqual(url.absoluteString, "https://www.agentwitch.com/download")
    }
}
