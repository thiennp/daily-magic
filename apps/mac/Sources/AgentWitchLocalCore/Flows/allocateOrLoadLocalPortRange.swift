import Foundation

public func localPortRangeBlockCount() -> Int {
    (MacAppConstants.localAppPortRangeCeiling
        - MacAppConstants.localAppPortRangeFloor
        + 1) / MacAppConstants.localAppPortRangeSize
}

public func localPortRangeForBlockIndex(_ blockIndex: Int) -> MacAppLocalPortRange {
    let start = MacAppConstants.localAppPortRangeFloor
        + blockIndex * MacAppConstants.localAppPortRangeSize
    return MacAppLocalPortRange(
        start: start,
        end: start + MacAppConstants.localAppPortRangeSize - 1
    )
}

public func listTakenLocalPortRangeStarts(
    profilesDir: URL,
    fileManager: FileManager = .default
) -> Set<Int> {
    var taken = Set<Int>()
    guard let entries = try? fileManager.contentsOfDirectory(
        at: profilesDir,
        includingPropertiesForKeys: nil,
        options: [.skipsHiddenFiles]
    ) else {
        return taken
    }
    for entry in entries {
        if let range = readLocalPortRangeFile(profileDir: entry, fileManager: fileManager) {
            taken.insert(range.start)
        }
    }
    return taken
}

/// Reuse persisted range, else pick a free random 16-port block not used by other profiles.
public func allocateOrLoadLocalPortRange(
    profileDir: URL,
    profilesDir: URL,
    fileManager: FileManager = .default,
    random: () -> Double = { Double.random(in: 0..<1) }
) throws -> MacAppLocalPortRange {
    if let existing = readLocalPortRangeFile(profileDir: profileDir, fileManager: fileManager) {
        return existing
    }
    let taken = listTakenLocalPortRangeStarts(profilesDir: profilesDir, fileManager: fileManager)
    let blocks = localPortRangeBlockCount()
    let startIndex = Int(random() * Double(blocks)) % max(blocks, 1)
    for offset in 0..<blocks {
        let blockIndex = (startIndex + offset) % blocks
        let range = localPortRangeForBlockIndex(blockIndex)
        if !taken.contains(range.start) {
            try writeLocalPortRangeFile(profileDir: profileDir, range: range, fileManager: fileManager)
            return range
        }
    }
    let fallback = localPortRangeForBlockIndex(0)
    try writeLocalPortRangeFile(profileDir: profileDir, range: fallback, fileManager: fileManager)
    return fallback
}
