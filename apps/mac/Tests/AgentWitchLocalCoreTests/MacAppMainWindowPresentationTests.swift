import XCTest
@testable import AgentWitchLocalCore

@MainActor
final class MacAppMainWindowPresentationTests: XCTestCase {
    
    final class FakeMacAppWindowPresenting: MacAppWindowPresenting {
        var calls: [String] = []
        var existingWindowFound = false
        
        func setActivationPolicy(_ policy: MacAppActivationPolicyRequest) {
            calls.append("setPolicy(\(policy == .regular ? "regular" : "accessory"))")
        }
        
        func activateApp() {
            calls.append("activate")
        }
        
        func focusExistingMainWindow() -> Bool {
            calls.append("focusExisting")
            return existingWindowFound
        }
        
        func openMainWindowScene() {
            calls.append("openScene")
        }
        
        func selectPage(_ rawPage: String) {
            calls.append("selectPage(\(rawPage))")
        }
    }

    func testPresentWithoutExistingWindow() {
        let fake = FakeMacAppWindowPresenting()
        fake.existingWindowFound = false
        
        let presenter = MacAppMainWindowPresenter(presenter: fake)
        presenter.present(pageRawValue: "settings")
        
        XCTAssertEqual(fake.calls, [
            "setPolicy(regular)",
            "activate",
            "focusExisting",
            "openScene",
            "selectPage(settings)"
        ])
        
        XCTAssertEqual(presenter.pendingPageRawValue, "settings")
        XCTAssertEqual(presenter.consumePendingPage(), "settings")
        XCTAssertNil(presenter.pendingPageRawValue)
        XCTAssertNil(presenter.consumePendingPage())
    }

    func testPresentWithExistingWindow() {
        let fake = FakeMacAppWindowPresenting()
        fake.existingWindowFound = true
        
        let presenter = MacAppMainWindowPresenter(presenter: fake)
        presenter.present(pageRawValue: "history")
        
        XCTAssertEqual(fake.calls, [
            "setPolicy(regular)",
            "activate",
            "focusExisting",
            "selectPage(history)"
        ])
    }
    
    func testMainWindowsDidChange() {
        let fake = FakeMacAppWindowPresenting()
        let presenter = MacAppMainWindowPresenter(presenter: fake)
        
        presenter.mainWindowsDidChange(visibleMainWindowCount: 0)
        XCTAssertEqual(fake.calls, ["setPolicy(accessory)"])
        
        fake.calls.removeAll()
        presenter.mainWindowsDidChange(visibleMainWindowCount: 1)
        XCTAssertEqual(fake.calls, [])
    }
    
    func testTranslocationPaths() {
        XCTAssertTrue(isAppTranslocated(bundlePath: "/private/var/folders/12/34/AppTranslocation/56/AgentWitch Local.app"))
        XCTAssertFalse(isAppTranslocated(bundlePath: "/Applications/AgentWitch Local.app"))
        
        XCTAssertTrue(isAppInApplicationsFolder(bundlePath: "/Applications/AgentWitch Local.app", homeDirectory: "/Users/test"))
        XCTAssertTrue(isAppInApplicationsFolder(bundlePath: "/Users/test/Applications/AgentWitch Local.app", homeDirectory: "/Users/test"))
        XCTAssertFalse(isAppInApplicationsFolder(bundlePath: "/Users/test/Downloads/AgentWitch Local.app", homeDirectory: "/Users/test"))
    }
}
