import Foundation
import AgentWitchLocalCore

#if os(macOS)
import AppKit

struct NSWorkspaceBrowserOpener: BrowserOpening {
    init() {}

    func open(_ url: URL) throws {
        let ok = NSWorkspace.shared.open(url)
        if !ok {
            throw NSError(
                domain: "AgentWitchLocal",
                code: 1,
                userInfo: [NSLocalizedDescriptionKey: "Failed to open browser."]
            )
        }
    }
}
#endif
