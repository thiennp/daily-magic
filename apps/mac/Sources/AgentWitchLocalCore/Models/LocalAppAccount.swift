import Foundation

public struct LocalAppAccount: Equatable, Sendable {
    public let email: String
    public let port: Int?

    public init(email: String, port: Int?) {
        self.email = email
        self.port = port
    }
}
