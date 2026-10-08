import Foundation

public func normalizeAccountEmail(_ email: String) -> String {
    return email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
}

public func readLocalAppAccountsFilePorts(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) -> [String: Int] {
    let accountsFile = installDir.appendingPathComponent(MacAppConstants.localAppAccountsFileName)
    guard let data = try? Data(contentsOf: accountsFile),
          let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let accountsList = json["accounts"] as? [[String: Any]] else {
        return [:]
    }
    
    var ports: [String: Int] = [:]
    for accountRow in accountsList {
        if let emailRaw = accountRow["email"] as? String,
           let portRaw = accountRow["port"] as? Int,
           !emailRaw.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
           (1...65535).contains(portRaw) {
            let normalized = normalizeAccountEmail(emailRaw)
            if !normalized.isEmpty {
                ports[normalized] = portRaw
            }
        }
    }
    return ports
}

public func listLocalAppAccounts(
    installDir: URL = resolveAgentWitchInstallDir(),
    fileManager: FileManager = .default
) -> [LocalAppAccount] {
    let ports = readLocalAppAccountsFilePorts(installDir: installDir, fileManager: fileManager)
    var allEmails: Set<String> = Set(ports.keys)
    
    let profilesDir = resolveAgentWitchProfilesDir(installDir: installDir)
    if let subdirs = try? fileManager.contentsOfDirectory(atPath: profilesDir.path) {
        for subdir in subdirs {
            let configPath = profilesDir.appendingPathComponent(subdir).appendingPathComponent("config.json")
            var isDirectory: ObjCBool = false
            if fileManager.fileExists(atPath: configPath.path, isDirectory: &isDirectory), !isDirectory.boolValue {
                allEmails.insert(normalizeAccountEmail(subdir))
            }
        }
    }
    
    let sortedEmails = allEmails.sorted()
    return sortedEmails.map { email in
        LocalAppAccount(email: email, port: ports[email])
    }
}

public func resolveSelectedAccountEmail(
    selected: String?,
    activeProfileEmail: String?,
    accounts: [LocalAppAccount]
) -> String? {
    guard let activeEmail = activeProfileEmail else {
        return nil // signed out: never auto-pick
    }
    
    if let selected = selected {
        let normalized = normalizeAccountEmail(selected)
        if !normalized.isEmpty && accounts.contains(where: { $0.email == normalized }) {
            return normalized
        }
    }
    
    return normalizeAccountEmail(activeEmail)
}
