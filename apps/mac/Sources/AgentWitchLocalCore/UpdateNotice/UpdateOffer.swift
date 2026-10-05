import Foundation

public struct UpdateOffer: Equatable, Sendable {
    public let version: String
    public let url: URL

    public init(version: String, url: URL) {
        self.version = version
        self.url = url
    }
}

public struct ReleaseEntry: Equatable, Sendable {
    public let tagName: String
    public let htmlURL: String
    public let draft: Bool
    public let prerelease: Bool

    public init(tagName: String, htmlURL: String, draft: Bool, prerelease: Bool) {
        self.tagName = tagName
        self.htmlURL = htmlURL
        self.draft = draft
        self.prerelease = prerelease
    }
}

public enum UpdateCheckResult: Equatable, Sendable {
    /// Network/HTTP/parse failure — callers stay silent (no menu item change required beyond leaving prior offer).
    case failed
    /// Successful check; offer is nil when up to date.
    case checked(UpdateOffer?)
}
