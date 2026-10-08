import Foundation

public struct HostServiceAccountRow: Equatable, Sendable {
    public let email: String
    public let launchAgentLabel: String

    public init(email: String, launchAgentLabel: String) {
        self.email = email
        self.launchAgentLabel = launchAgentLabel
    }
}

/// Reads `~/.agent-witch/host-services.json` (version 1, mode per-account).
public func readHostServicesAccounts(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) -> [HostServiceAccountRow] {
    let path = installDir.appendingPathComponent(MacAppConstants.hostServicesFileName)
    guard let data = try? Data(contentsOf: path),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          json["version"] as? Int == 1,
          (json["mode"] as? String) == "per-account",
          let accounts = json["accounts"] as? [[String: Any]]
    else {
        return []
    }
    var rows: [HostServiceAccountRow] = []
    for row in accounts {
        guard let emailRaw = row["email"] as? String,
              let labelRaw = row["launchAgentLabel"] as? String
        else { continue }
        let email = normalizeAccountEmail(emailRaw)
        let label = labelRaw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !email.isEmpty, !label.isEmpty else { continue }
        rows.append(HostServiceAccountRow(email: email, launchAgentLabel: label))
    }
    return rows
}

public func readHostServicesLaunchAgentLabels(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) -> [String: String] {
    var map: [String: String] = [:]
    for row in readHostServicesAccounts(installDir: installDir, fileManager: fileManager) {
        map[row.email] = row.launchAgentLabel
    }
    return map
}
