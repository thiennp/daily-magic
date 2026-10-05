import Foundation

public protocol BootstrapHttpClienting: Sendable {
    /// POST JSON body; returns response body and HTTP status.
    func postJson(url: URL, body: Data) async throws -> (Data, Int)
    /// GET body bytes (ephemeral session expected).
    func getData(url: URL) async throws -> Data
}
