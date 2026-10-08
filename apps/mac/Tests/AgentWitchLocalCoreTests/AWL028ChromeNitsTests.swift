import XCTest
@testable import AgentWitchLocalCore

/// 279e425f — AWL 0.2.8 Mac nits.
final class AWL028ChromeNitsTests: XCTestCase {
    func testSyntheticAgentEmailGetsFriendlyName() {
        let email = "agt-c7f998a3-1b2c-4d5e-8f90-123456789abc@agents.agentwitch.com"
        XCTAssertTrue(LocalAccountName.isSyntheticAgentEmail(email))
        XCTAssertEqual(LocalAccountName.displayName(email: email), "AgentWitch agent")
        XCTAssertEqual(LocalAccountName.firstName(email: email), "Agent")
        XCTAssertEqual(LocalAccountName.initials(email: email), "AA")
    }

    func testSyntheticPreferredNameIsIgnored() {
        let email = "agt-c7f998a3-1b2c@agents.agentwitch.com"
        XCTAssertEqual(
            LocalAccountName.displayName(email: email, preferredName: "Agt-c7f998a3-1b2c"),
            "AgentWitch agent"
        )
    }

    func testSyntheticDisplayNameAsPreferredKeepsAgentChip() {
        let email = "agt-c7f998a3-1b2c@agents.agentwitch.com"
        XCTAssertEqual(
            LocalAccountName.firstName(email: email, preferredName: "AgentWitch agent"),
            "Agent"
        )
    }

    func testRealPreferredNameWins() {
        let email = "agt-c7f998a3-1b2c@agents.agentwitch.com"
        XCTAssertEqual(LocalAccountName.displayName(email: email, preferredName: "Testi"), "Testi")
        XCTAssertEqual(LocalAccountName.firstName(email: "a@b.com", preferredName: "Thien Nguyen"), "Thien")
    }

    func testPersonEmailKeepsNameFromEmail() {
        let email = "thien.nguyen@example.com"
        XCTAssertFalse(LocalAccountName.isSyntheticAgentEmail(email))
        XCTAssertEqual(LocalAccountName.displayName(email: email), "Thien Nguyen")
        XCTAssertEqual(LocalAccountName.firstName(email: email), "Thien")
        XCTAssertEqual(LocalAccountName.initials(email: email), "TN")
        XCTAssertFalse(LocalAccountName.isSyntheticAgentEmail("agathe@example.com"))
    }

    func testMissingEmailFallsBack() {
        XCTAssertEqual(LocalAccountName.displayName(email: nil), "Account")
        XCTAssertEqual(LocalAccountName.displayName(email: "  "), "Account")
        XCTAssertEqual(LocalAccountName.displayName(email: "x@y.z", preferredName: "You"), "X")
    }

    func testHistoryBadgeOnlyWhenOffline() {
        XCTAssertNil(resolveHistorySidebarBadge(chromeKind: .running, isOffline: false))
        XCTAssertNil(resolveHistorySidebarBadge(chromeKind: .stopped, isOffline: false))
        XCTAssertEqual(resolveHistorySidebarBadge(chromeKind: .waitingForInternet, isOffline: false), "Offline")
        XCTAssertEqual(resolveHistorySidebarBadge(chromeKind: .running, isOffline: true), "Offline")
    }

    func testSidebarAccessibilityLabel() {
        XCTAssertEqual(sidebarRowAccessibilityLabel(title: "History", badge: nil), "History")
        XCTAssertEqual(sidebarRowAccessibilityLabel(title: "History", badge: "Offline"), "History, offline")
    }

    func testMenuBarExtraWindowClassName() {
        XCTAssertTrue(isMenuBarExtraWindowClassName("SwiftUI.MenuBarExtraWindow"))
        XCTAssertFalse(isMenuBarExtraWindowClassName("SwiftUI.AppKitWindow"))
        XCTAssertFalse(isMenuBarExtraWindowClassName("NSStatusBarWindow"))
    }
}
