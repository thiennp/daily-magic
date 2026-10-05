import XCTest
@testable import AgentWitchLocalCore

final class InstallScriptPathTests: XCTestCase {
    func testFinderPathGetsHomebrewAndLocalBinPrepended() {
        let path = buildInstallScriptPath(
            inheritedPath: "/usr/bin:/bin:/usr/sbin:/sbin",
            homeDirectory: "/Users/test",
            loginShellNodeDirectory: nil
        )
        XCTAssertEqual(
            path,
            "/opt/homebrew/bin:/usr/local/bin:/Users/test/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        )
    }

    func testLoginShellNodeDirectoryComesFirstAndDuplicatesAreDropped() {
        let path = buildInstallScriptPath(
            inheritedPath: "/usr/local/bin:/custom/bin::/usr/bin",
            homeDirectory: "/Users/test",
            loginShellNodeDirectory: "/Users/test/.nvm/versions/node/v22.1.0/bin"
        )
        XCTAssertEqual(
            path,
            "/Users/test/.nvm/versions/node/v22.1.0/bin:/opt/homebrew/bin:/usr/local/bin:"
                + "/Users/test/.local/bin:/custom/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        )
    }

    func testMissingInheritedPathStillHasSystemDefaults() {
        let path = buildInstallScriptPath(
            inheritedPath: nil,
            homeDirectory: "/Users/test",
            loginShellNodeDirectory: "/opt/homebrew/bin"
        )
        XCTAssertEqual(
            path,
            "/opt/homebrew/bin:/usr/local/bin:/Users/test/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        )
    }

    func testParseLoginShellNodeDirectoryTakesLastAbsoluteNodeLine() {
        XCTAssertEqual(
            parseLoginShellNodeDirectory(output: "Welcome!\n/opt/homebrew/bin/node\n"),
            "/opt/homebrew/bin"
        )
        XCTAssertEqual(
            parseLoginShellNodeDirectory(output: "  /Users/a/.nvm/versions/node/v22/bin/node  "),
            "/Users/a/.nvm/versions/node/v22/bin"
        )
    }

    func testParseLoginShellNodeDirectoryRejectsNonPaths() {
        XCTAssertNil(parseLoginShellNodeDirectory(output: ""))
        XCTAssertNil(parseLoginShellNodeDirectory(output: "node not found\n"))
        XCTAssertNil(parseLoginShellNodeDirectory(output: "node: aliased to /usr/bin/node-wrapper"))
    }
}
