import Foundation

/// Constant-time equality for equal-length UTF-8 strings; unequal lengths return false.
public func constantTimeStringEquals(_ lhs: String, _ rhs: String) -> Bool {
    let left = Array(lhs.utf8)
    let right = Array(rhs.utf8)
    guard left.count == right.count else {
        return false
    }
    var diff: UInt8 = 0
    for index in left.indices {
        diff |= left[index] ^ right[index]
    }
    return diff == 0
}
