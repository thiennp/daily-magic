import XCTest
@testable import AgentWitchLocalCore

final class AppInstallGuidanceTests: XCTestCase {
    private let home = "/Users/test"

    func testApplicationsFoldersNeedNoGuidance() {
        XCTAssertNil(resolveAppInstallGuidance(bundlePath: "/Applications/AgentWitch Local.app", homeDirectory: home))
        XCTAssertNil(resolveAppInstallGuidance(bundlePath: "/Users/test/Applications/AgentWitch Local.app", homeDirectory: home))
    }

    func testMountedDiskImage() {
        let guidance = resolveAppInstallGuidance(bundlePath: "/Volumes/AgentWitch Local/AgentWitch Local.app", homeDirectory: home)
        XCTAssertEqual(guidance, .mountedDiskImage)
        XCTAssertTrue(guidance?.message.contains("eject") == true)
    }

    func testTranslocatedCopyWinsOverVolumes() {
        let path = "/private/var/folders/12/34/AppTranslocation/56/d/AgentWitch Local.app"
        XCTAssertEqual(resolveAppInstallGuidance(bundlePath: path, homeDirectory: home), .translocated)
    }

    func testOtherFoldersGetTheGenericAdvice() {
        XCTAssertEqual(
            resolveAppInstallGuidance(bundlePath: "/Users/test/Downloads/AgentWitch Local.app", homeDirectory: home),
            .notInApplications
        )
    }
}
