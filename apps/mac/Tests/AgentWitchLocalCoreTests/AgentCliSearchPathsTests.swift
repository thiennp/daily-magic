import XCTest
@testable import AgentWitchLocalCore

final class AgentCliSearchPathsTests: XCTestCase {
    func testParseIgnoresBannerAndKeepsAbsoluteDirsInOrder() {
        let out = "Welcome to zsh\n\(AgentCliSearchPaths.pathMarker)/opt/homebrew/bin:/Users/u/.nvm/versions/node/v22/bin:relative:/opt/homebrew/bin:/usr/bin"
        XCTAssertEqual(
            AgentCliSearchPaths.parseLoginShellPath(out),
            ["/opt/homebrew/bin", "/Users/u/.nvm/versions/node/v22/bin", "/usr/bin"]
        )
    }

    func testParseWithoutMarkerIsEmpty() {
        XCTAssertEqual(AgentCliSearchPaths.parseLoginShellPath("/usr/bin:/bin"), [])
    }

    func testDefaultsCoverPackageManagers() {
        let dirs = AgentCliSearchPaths.defaultDirectories(home: "/Users/u/", nodeVersionBins: ["/Users/u/.nvm/versions/node/v25/bin"])
        XCTAssertTrue(dirs.contains("/opt/homebrew/bin"))
        XCTAssertTrue(dirs.contains("/Users/u/.npm-global/bin"))
        XCTAssertTrue(dirs.contains("/Users/u/Library/pnpm"))
        XCTAssertTrue(dirs.contains("/Users/u/.asdf/shims"))
        XCTAssertEqual(dirs.last, "/Users/u/.nvm/versions/node/v25/bin")
    }

    func testMergePutsLoginPathFirstWithoutDuplicates() {
        XCTAssertEqual(
            AgentCliSearchPaths.merge(loginShellPath: ["/x/bin", "/opt/homebrew/bin"], defaults: ["/opt/homebrew/bin", "/usr/local/bin"]),
            ["/x/bin", "/opt/homebrew/bin", "/usr/local/bin"]
        )
    }
}
