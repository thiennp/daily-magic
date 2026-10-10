import XCTest
@testable import AgentWitchLocalCore

final class DuplicateInstanceActionTests: XCTestCase {
    private let home = "/Users/test"
    private let apps = "/Applications/AgentWitch Local.app"
    private let dmg = "/Volumes/Agent Witch Local 2/AgentWitchLocal.app"

    func testAloneProceeds() {
        XCTAssertEqual(resolveDuplicateInstanceAction(selfBundlePath: dmg, others: [], homeDirectory: home), .proceed)
    }

    func testApplicationsCopyReplacesDiskImageCopies() {
        let others = [
            OtherAppInstance(processIdentifier: 11, bundlePath: dmg),
            OtherAppInstance(processIdentifier: 12, bundlePath: "/Volumes/Agent Witch Local 1/AgentWitchLocal.app"),
        ]
        XCTAssertEqual(
            resolveDuplicateInstanceAction(selfBundlePath: apps, others: others, homeDirectory: home),
            .terminateOthers(processIdentifiers: [11, 12])
        )
    }

    func testDiskImageCopyHandsOverToApplicationsCopy() {
        let others = [OtherAppInstance(processIdentifier: 7, bundlePath: apps)]
        XCTAssertEqual(
            resolveDuplicateInstanceAction(selfBundlePath: dmg, others: others, homeDirectory: home),
            .activateExistingAndQuit
        )
    }

    func testTwoDiskImageCopiesKeepTheRunningOne() {
        let others = [OtherAppInstance(processIdentifier: 7, bundlePath: dmg)]
        XCTAssertEqual(
            resolveDuplicateInstanceAction(
                selfBundlePath: "/Volumes/Agent Witch Local 1/AgentWitchLocal.app",
                others: others,
                homeDirectory: home
            ),
            .activateExistingAndQuit
        )
    }

    func testTwoApplicationsCopiesKeepTheRunningOne() {
        let others = [OtherAppInstance(processIdentifier: 7, bundlePath: "/Users/test/Applications/AgentWitch Local.app")]
        XCTAssertEqual(
            resolveDuplicateInstanceAction(selfBundlePath: apps, others: others, homeDirectory: home),
            .activateExistingAndQuit
        )
    }
}
