import XCTest
@testable import AgentWitchLocalCore

final class LocalWebViewDownloadTests: XCTestCase {
    private let port = 51234

    func testLoopbackLinkAllows() {
        let url = URL(string: "http://127.0.0.1:51234/prompt-optimizer?cycle=abc&export=wizard-markdown")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: false), .allow)
    }

    func testLoopbackDownloadAttributeDownloads() {
        let url = URL(string: "http://127.0.0.1:51234/prompt-optimizer?cycle=abc&export=wizard-markdown")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: true), .download)
    }

    func testBlobDownloadOnlyWhenDownload() {
        let url = URL(string: "blob:http://127.0.0.1:51234/5f2c")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: true), .download)
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: false), .cancel)
    }

    func testDataDownloadOnlyWhenDownload() {
        let url = URL(string: "data:text/markdown;charset=utf-8,%23%20hi")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: true), .download)
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: false), .cancel)
    }

    func testAboutBlankStillCancels() {
        let url = URL(string: "about:blank")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: false), .cancel)
    }

    func testHttpsOpensExternallyEvenWithDownload() {
        let url = URL(string: "https://www.agentwitch.com/report.md")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: true), .openExternally)
    }

    func testNonLoopbackHttpDownloadCancels() {
        let url = URL(string: "http://example.com:51234/x.md")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: port, shouldPerformDownload: true), .cancel)
    }

    func testNilPortCancelsHttp() {
        let url = URL(string: "http://127.0.0.1:51234/prompt-optimizer")!
        XCTAssertEqual(decideLocalWebViewNavigation(url: url, allowedPort: nil, shouldPerformDownload: false), .cancel)
    }

    func testAttachmentResponseDownloads() {
        XCTAssertTrue(shouldDownloadLocalWebViewResponse(
            contentDisposition: "attachment; filename=\"prompt-optimizer-wizard-x.md\"",
            canShowMIMEType: true
        ))
        XCTAssertTrue(shouldDownloadLocalWebViewResponse(contentDisposition: " Attachment ", canShowMIMEType: true))
    }

    func testInlineHtmlResponseRenders() {
        XCTAssertFalse(shouldDownloadLocalWebViewResponse(contentDisposition: nil, canShowMIMEType: true))
        XCTAssertFalse(shouldDownloadLocalWebViewResponse(contentDisposition: "inline", canShowMIMEType: true))
    }

    func testUnshowableMimeDownloads() {
        XCTAssertTrue(shouldDownloadLocalWebViewResponse(contentDisposition: nil, canShowMIMEType: false))
    }

    func testSanitizeFilename() {
        XCTAssertEqual(sanitizeLocalWebViewDownloadFilename("../../etc/passwd"), "-..-etc-passwd")
        XCTAssertEqual(sanitizeLocalWebViewDownloadFilename("  "), "download")
        XCTAssertEqual(sanitizeLocalWebViewDownloadFilename(".hidden.md"), "hidden.md")
        XCTAssertEqual(sanitizeLocalWebViewDownloadFilename("a:b.md"), "a-b.md")
    }

    func testDestinationUniqueSuffix() {
        let dir = URL(fileURLWithPath: "/Users/x/Downloads")
        let taken: Set<String> = [
            "/Users/x/Downloads/prompt-optimizer-wizard-x.md",
            "/Users/x/Downloads/prompt-optimizer-wizard-x (1).md",
        ]
        let first = resolveLocalWebViewDownloadDestination(
            directory: dir, suggestedFilename: "fresh.md", fileExists: taken.contains
        )
        XCTAssertEqual(first.path, "/Users/x/Downloads/fresh.md")
        let dup = resolveLocalWebViewDownloadDestination(
            directory: dir, suggestedFilename: "prompt-optimizer-wizard-x.md", fileExists: taken.contains
        )
        XCTAssertEqual(dup.path, "/Users/x/Downloads/prompt-optimizer-wizard-x (2).md")
    }

    func testDestinationNoExtension() {
        let dir = URL(fileURLWithPath: "/tmp/d")
        let dup = resolveLocalWebViewDownloadDestination(
            directory: dir, suggestedFilename: "report", fileExists: { $0 == "/tmp/d/report" }
        )
        XCTAssertEqual(dup.path, "/tmp/d/report (1)")
    }
}
