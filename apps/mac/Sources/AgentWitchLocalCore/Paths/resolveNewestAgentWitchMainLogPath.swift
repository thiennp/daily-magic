import Foundation

/// Picks the newest `agent-witch.log` under `profiles/*/logs/`, else `<install>/logs/`.
public func resolveNewestAgentWitchMainLogPath(
    installDir: URL,
    fileManager: FileManager = .default
) -> URL? {
    let profilesDir = installDir.appendingPathComponent(
        MacAppConstants.profilesDirName,
        isDirectory: true
    )
    var candidates: [(url: URL, modified: Date)] = []

    if let profileDirs = try? fileManager.contentsOfDirectory(
        at: profilesDir,
        includingPropertiesForKeys: nil,
        options: [.skipsHiddenFiles]
    ) {
        for profileDir in profileDirs {
            let logURL = profileDir
                .appendingPathComponent(MacAppConstants.logsDirName, isDirectory: true)
                .appendingPathComponent(MacAppConstants.mainLogFileName, isDirectory: false)
            if let modified = modificationDate(of: logURL, fileManager: fileManager) {
                candidates.append((logURL, modified))
            }
        }
    }

    if let newest = candidates.max(by: { $0.modified < $1.modified }) {
        return newest.url
    }

    let legacy = installDir
        .appendingPathComponent(MacAppConstants.logsDirName, isDirectory: true)
        .appendingPathComponent(MacAppConstants.mainLogFileName, isDirectory: false)
    return fileManager.fileExists(atPath: legacy.path) ? legacy : nil
}

private func modificationDate(of url: URL, fileManager: FileManager) -> Date? {
    guard fileManager.fileExists(atPath: url.path) else {
        return nil
    }
    let values = try? url.resourceValues(forKeys: [.contentModificationDateKey])
    return values?.contentModificationDate
}
