import XCTest
@testable import AgentWitchLocalCore

final class UpdateNoticeTests: XCTestCase {
    func testParseVersionFromTag() {
        XCTAssertEqual(parseVersionFromTag(tag: "awl-mac-v0.2.0", prefix: MacAppConstants.tagPrefixMac), "0.2.0")
        XCTAssertNil(parseVersionFromTag(tag: "awl-linux-v0.2.0", prefix: MacAppConstants.tagPrefixMac))
        XCTAssertNil(parseVersionFromTag(tag: "awl-mac-v0.2.0-rc1", prefix: MacAppConstants.tagPrefixMac))
        XCTAssertNil(parseVersionFromTag(tag: "awl-mac-v", prefix: MacAppConstants.tagPrefixMac))
    }

    func testCompareSemver() {
        XCTAssertEqual(compareSemver("0.2.0", "0.1.0"), 1)
        XCTAssertEqual(compareSemver("0.1.0", "0.1.0"), 0)
        XCTAssertEqual(compareSemver("0.1.0", "1.0.0"), -1)
        XCTAssertNil(compareSemver("1.0", "1.0.0"))
        XCTAssertNil(compareSemver("v1.0.0", "1.0.0"))
    }

    func testIsNewerSemver() {
        XCTAssertTrue(isNewerSemver(candidate: "0.2.0", current: "0.1.0"))
        XCTAssertFalse(isNewerSemver(candidate: "0.1.0", current: "0.1.0"))
        XCTAssertFalse(isNewerSemver(candidate: "0.0.9", current: "0.1.0"))
        XCTAssertFalse(isNewerSemver(candidate: "bad", current: "0.1.0"))
    }

    func testSelectNewestUpdate() {
        let releases = [
            ReleaseEntry(tagName: "awl-linux-v9.9.9", htmlURL: "https://example/linux", draft: false, prerelease: false),
            ReleaseEntry(tagName: "awl-mac-v0.1.0", htmlURL: "https://example/old", draft: false, prerelease: false),
            ReleaseEntry(tagName: "awl-mac-v0.3.0", htmlURL: "https://example/new", draft: false, prerelease: false),
            ReleaseEntry(tagName: "awl-mac-v0.2.0", htmlURL: "https://example/mid", draft: false, prerelease: false),
            ReleaseEntry(tagName: "awl-mac-v0.4.0", htmlURL: "https://example/draft", draft: true, prerelease: false),
            ReleaseEntry(tagName: "awl-mac-v0.5.0", htmlURL: "https://example/pre", draft: false, prerelease: true),
        ]
        let offer = selectNewestUpdate(
            releases: releases,
            prefix: MacAppConstants.tagPrefixMac,
            currentVersion: "0.1.0"
        )
        XCTAssertEqual(offer?.version, "0.3.0")
        XCTAssertEqual(offer?.url.absoluteString, "https://example/new")
        XCTAssertNil(selectNewestUpdate(
            releases: releases,
            prefix: MacAppConstants.tagPrefixMac,
            currentVersion: "0.3.0"
        ))
        XCTAssertNil(selectNewestUpdate(
            releases: releases,
            prefix: MacAppConstants.tagPrefixWindows,
            currentVersion: "0.0.1"
        ))
    }

    func testUpdateAvailableTitle() {
        XCTAssertEqual(updateAvailableTitle(version: "0.2.0"), "Update available (v0.2.0)")
    }

    func testParseReleasesJSON() throws {
        let body = Data("""
        [
          {"tag_name":"awl-mac-v0.2.0","html_url":"https://example/r","draft":false,"prerelease":false},
          {"tag_name":"other","html_url":"https://example/o","draft":true,"prerelease":false}
        ]
        """.utf8)
        let entries = try XCTUnwrap(parseReleasesJSON(body))
        XCTAssertEqual(entries.count, 2)
        XCTAssertEqual(entries[0].tagName, "awl-mac-v0.2.0")
        XCTAssertTrue(entries[1].draft)
        XCTAssertNil(parseReleasesJSON(Data("{".utf8)))
    }

    func testCheckForUpdateSuccessAndFailure() async {
        let okClient = FakeUpdateHTTPClient(result: .success(Data("""
        [{"tag_name":"awl-mac-v0.2.0","html_url":"https://example/r","draft":false,"prerelease":false}]
        """.utf8)))
        let ok = await checkForUpdate(
            http: okClient,
            prefix: MacAppConstants.tagPrefixMac,
            currentVersion: "0.1.0"
        )
        guard case .checked(let offer) = ok else {
            return XCTFail("expected checked, got \(ok)")
        }
        XCTAssertEqual(offer?.version, "0.2.0")

        let failClient = FakeUpdateHTTPClient(result: .failure(URLError(.timedOut)))
        let failed = await checkForUpdate(
            http: failClient,
            prefix: MacAppConstants.tagPrefixMac,
            currentVersion: "0.1.0"
        )
        XCTAssertEqual(failed, .failed)
    }

    func testResolveMacAppVersionFallsBackToConstant() {
        // Bundle.main in unit tests typically has no CFBundleShortVersionString for this package.
        let version = resolveMacAppVersion(bundle: Bundle(for: UpdateNoticeTests.self))
        XCTAssertFalse(version.isEmpty)
    }
}

private struct FakeUpdateHTTPClient: UpdateNoticeHttpClienting {
    let result: Result<Data, Error>

    func getData(url: URL) async throws -> Data {
        _ = url
        switch result {
        case .success(let data):
            return data
        case .failure(let error):
            throw error
        }
    }
}
