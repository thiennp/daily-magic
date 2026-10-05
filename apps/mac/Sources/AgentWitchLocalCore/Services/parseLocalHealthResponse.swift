import Foundation

/// Treats HTTP 2xx as healthy for `GET /health`.
public func parseLocalHealthResponse(statusCode: Int) -> Bool {
    (200..<300).contains(statusCode)
}
