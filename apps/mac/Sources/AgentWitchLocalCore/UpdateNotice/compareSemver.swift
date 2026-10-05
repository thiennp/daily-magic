import Foundation

/// Compares plain `major.minor.patch` versions. Nil when either side is invalid.
public func compareSemver(_ a: String, _ b: String) -> Int? {
    guard let ap = parseSemverParts(a), let bp = parseSemverParts(b) else {
        return nil
    }
    for i in 0..<3 {
        if ap[i] < bp[i] { return -1 }
        if ap[i] > bp[i] { return 1 }
    }
    return 0
}

public func isNewerSemver(candidate: String, current: String) -> Bool {
    guard let cmp = compareSemver(candidate, current) else {
        return false
    }
    return cmp > 0
}

func isPlainSemver(_ ver: String) -> Bool {
    parseSemverParts(ver) != nil
}

func parseSemverParts(_ ver: String) -> [Int]? {
    let parts = ver.split(separator: ".", omittingEmptySubsequences: false).map(String.init)
    guard parts.count == 3 else {
        return nil
    }
    var out: [Int] = []
    out.reserveCapacity(3)
    for p in parts {
        guard !p.isEmpty,
              !p.hasPrefix("-"),
              p.allSatisfy({ $0.isNumber }),
              let n = Int(p),
              n >= 0
        else {
            return nil
        }
        out.append(n)
    }
    return out
}
