import Foundation

public func readLocalPortRangeFile(
    profileDir: URL,
    fileManager: FileManager = .default
) -> MacAppLocalPortRange? {
    let url = resolveLocalPortRangeFileURL(profileDir: profileDir)
    guard fileManager.fileExists(atPath: url.path),
          let data = try? Data(contentsOf: url),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let start = json["start"] as? Int,
          let end = json["end"] as? Int
    else {
        return nil
    }
    let range = MacAppLocalPortRange(start: start, end: end)
    return range.isValid ? range : nil
}

public func readLocalAppPortFile(
    profileDir: URL,
    fileManager: FileManager = .default
) -> Int? {
    let url = resolveLocalAppPortFileURL(profileDir: profileDir)
    guard fileManager.fileExists(atPath: url.path),
          let data = try? Data(contentsOf: url),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let port = json["localAppPort"] as? Int,
          port >= MacAppConstants.localAppPortRangeFloor,
          port <= MacAppConstants.localAppPortRangeCeiling
    else {
        return nil
    }
    return port
}

public func writeLocalPortRangeFile(
    profileDir: URL,
    range: MacAppLocalPortRange,
    fileManager: FileManager = .default
) throws {
    try fileManager.createDirectory(at: profileDir, withIntermediateDirectories: true)
    let obj: [String: Int] = ["start": range.start, "end": range.end]
    let data = try JSONSerialization.data(withJSONObject: obj, options: [.prettyPrinted, .sortedKeys])
    try data.write(to: resolveLocalPortRangeFileURL(profileDir: profileDir), options: .atomic)
}

/// Reads validated `{ "portsExhausted": true }` from local-app-port.json.
/// Used when the core could not bind any port in the account range (no /health).
public func readLocalAppPortsExhausted(
    profileDir: URL,
    fileManager: FileManager = .default
) -> Bool {
    let url = resolveLocalAppPortFileURL(profileDir: profileDir)
    guard fileManager.fileExists(atPath: url.path),
          let data = try? Data(contentsOf: url),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let exhausted = json["portsExhausted"] as? Bool
    else {
        return false
    }
    return exhausted
}

