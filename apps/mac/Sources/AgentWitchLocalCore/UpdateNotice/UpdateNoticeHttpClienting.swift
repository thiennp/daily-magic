import Foundation

public protocol UpdateNoticeHttpClienting: Sendable {
    func getData(url: URL) async throws -> Data
}

#if os(macOS)
extension EphemeralBootstrapHttpClient: UpdateNoticeHttpClienting {}
#endif
