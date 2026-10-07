import Foundation

/// Per-account local HTTP port range (16 ports in the IANA dynamic range).
public struct MacAppLocalPortRange: Equatable, Sendable {
    public let start: Int
    public let end: Int

    public init(start: Int, end: Int) {
        self.start = start
        self.end = end
    }

    public var closedRange: ClosedRange<Int> { start...end }

    /// Settings / Connect display (en dash), e.g. `49152–49167`.
    public var displayString: String { "\(start)–\(end)" }

    public var isValid: Bool {
        end - start + 1 == MacAppConstants.localAppPortRangeSize
            && start >= MacAppConstants.localAppPortRangeFloor
            && end <= MacAppConstants.localAppPortRangeCeiling
            && start <= end
    }
}
