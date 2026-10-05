import Foundation

private struct GitHubReleaseJSON: Decodable {
    let tagName: String
    let htmlURL: String
    let draft: Bool
    let prerelease: Bool

    enum CodingKeys: String, CodingKey {
        case tagName = "tag_name"
        case htmlURL = "html_url"
        case draft
        case prerelease
    }
}

public func parseReleasesJSON(_ data: Data) -> [ReleaseEntry]? {
    let decoder = JSONDecoder()
    guard let raw = try? decoder.decode([GitHubReleaseJSON].self, from: data) else {
        return nil
    }
    return raw.map {
        ReleaseEntry(
            tagName: $0.tagName,
            htmlURL: $0.htmlURL,
            draft: $0.draft,
            prerelease: $0.prerelease
        )
    }
}
