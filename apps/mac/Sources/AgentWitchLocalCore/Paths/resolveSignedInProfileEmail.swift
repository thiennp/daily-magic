import Foundation

/// Reads only the non-secret `email` from `active-profile.json`. Never opens config/keypair.
public func resolveSignedInProfileEmail(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) -> String? {
    let url = installDir.appendingPathComponent(
        MacAppConstants.activeProfileFileName,
        isDirectory: false
    )
    guard fileManager.fileExists(atPath: url.path),
          let data = try? Data(contentsOf: url),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let email = json["email"] as? String
    else {
        return nil
    }
    let trimmed = email.trimmingCharacters(in: .whitespacesAndNewlines)
    return trimmed.isEmpty ? nil : trimmed
}

/// Clears the active-profile pointer so the Mac app treats the user as signed out.
/// Profile folders and files under `profiles/` stay on disk (design: files stay).
public func clearSignedInProfilePointer(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) throws {
    let url = installDir.appendingPathComponent(
        MacAppConstants.activeProfileFileName,
        isDirectory: false
    )
    if fileManager.fileExists(atPath: url.path) {
        try fileManager.removeItem(at: url)
    }
}
