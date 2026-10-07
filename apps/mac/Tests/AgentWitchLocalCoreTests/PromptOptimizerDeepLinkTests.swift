import XCTest
@testable import AgentWitchLocalCore

final class PromptOptimizerDeepLinkTests: XCTestCase {
    func testPromptOptimizerDeepLinkAccepts() {
        XCTAssertTrue(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "agentwitch-local://prompt-optimizer")!
            )
        )
        XCTAssertTrue(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "agentwitch-local://prompt-optimizer/guide")!
            )
        )
        XCTAssertTrue(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "agentwitch-local:///prompt-optimizer")!
            )
        )
        XCTAssertTrue(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "agentwitch-local://prompt-optimizer?example=support-reply")!
            )
        )
    }

    func testPromptOptimizerDeepLinkRejectsOthers() {
        XCTAssertFalse(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "agentwitch-local://status")!
            )
        )
        XCTAssertFalse(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "agentwitch-local://install?code=a&state=b")!
            )
        )
        XCTAssertFalse(
            isAgentWitchLocalPromptOptimizerDeepLink(
                URL(string: "https://www.agentwitch.com/prompt-optimizer")!
            )
        )
    }

    func testParsePromptOptimizerDeepLinkPaths() {
        let page = parseAgentWitchLocalPromptOptimizerDeepLink(
            URL(string: "agentwitch-local://prompt-optimizer")!
        )
        XCTAssertEqual(page?.path, "/prompt-optimizer")
        XCTAssertNil(page?.query)

        let guide = parseAgentWitchLocalPromptOptimizerDeepLink(
            URL(string: "agentwitch-local://prompt-optimizer/guide")!
        )
        XCTAssertEqual(guide?.path, "/prompt-optimizer/guide")

        let sample = parseAgentWitchLocalPromptOptimizerDeepLink(
            URL(string: "agentwitch-local://prompt-optimizer?example=support-reply")!
        )
        XCTAssertEqual(sample?.path, "/prompt-optimizer")
        XCTAssertEqual(sample?.query, "example=support-reply")
    }

    func testResolvePromptOptimizerUrlUsesDiscoveredPort() {
        let url = resolveAgentWitchLocalPromptOptimizerUrl(
            port: 51234,
            path: "/prompt-optimizer",
            query: "example=support-reply"
        )
        XCTAssertEqual(url.absoluteString, "http://127.0.0.1:51234/prompt-optimizer?example=support-reply")
        XCTAssertNotEqual(url.port, MacAppConstants.localAppPort)
    }
}
