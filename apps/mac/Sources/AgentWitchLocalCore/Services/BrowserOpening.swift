import Foundation

public protocol BrowserOpening: Sendable {
    func open(_ url: URL) throws
}
