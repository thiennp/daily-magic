import Foundation

/// 279e425f (AWL 0.2.8): friendly account names for the popover and window.
/// Agent access accounts sign in with a synthetic `agt-<uuid>@agents.agentwitch.com`
/// email; turning its local part into a name showed "Agt-c7f998a3-…".
public enum LocalAccountName {
    public static let syntheticAgentEmailDomain = "agents.agentwitch.com"
    public static let syntheticAgentDisplayName = "AgentWitch agent"
    public static let fallbackDisplayName = "Account"

    /// True for `agt-…@agents.agentwitch.com` (or any `agt-<hex…>` local part).
    public static func isSyntheticAgentEmail(_ email: String) -> Bool {
        let lowered = email.trimmingCharacters(in: .whitespaces).lowercased()
        let pieces = lowered.split(separator: "@", maxSplits: 1).map(String.init)
        guard let local = pieces.first, local.hasPrefix("agt-") else { return false }
        if pieces.count == 2, pieces[1] == syntheticAgentEmailDomain { return true }
        let rest = local.dropFirst(4)
        return rest.count >= 8 && rest.allSatisfy { $0.isHexDigit || $0 == "-" }
    }

    /// Full name for headers: a real display name, else a name from the email.
    public static func displayName(email: String?, preferredName: String? = nil) -> String {
        if let name = usablePreferredName(preferredName, email: email) { return name }
        guard let email = trimmed(email) else { return fallbackDisplayName }
        if isSyntheticAgentEmail(email) { return syntheticAgentDisplayName }
        let words = localWords(email)
        return words.isEmpty ? fallbackDisplayName : words.joined(separator: " ")
    }

    /// Short name for the account chip ("Thien").
    public static func firstName(email: String?, preferredName: String? = nil) -> String {
        if let name = usablePreferredName(preferredName, email: email) {
            return name.split(separator: " ").first.map(String.init) ?? name
        }
        guard let email = trimmed(email) else { return fallbackDisplayName }
        if isSyntheticAgentEmail(email) { return "Agent" }
        return localWords(email).first ?? fallbackDisplayName
    }

    /// One or two letters for the avatar circle.
    public static func initials(email: String?, preferredName: String? = nil) -> String {
        let words = displayName(email: email, preferredName: preferredName)
            .split(separator: " ")
            .compactMap { $0.first }
        guard let first = words.first else { return "A" }
        let letters = words.count >= 2 ? [first, words[1]] : [first]
        return String(letters).uppercased()
    }

    private static func trimmed(_ value: String?) -> String? {
        let text = value?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return text.isEmpty ? nil : text
    }

    private static func usablePreferredName(_ name: String?, email: String?) -> String? {
        guard let name = trimmed(name), name != "You", name != syntheticAgentDisplayName,
              name.lowercased() != trimmed(email)?.lowercased(),
              !isSyntheticAgentEmail(name),
              !name.lowercased().hasPrefix("agt-") else { return nil }
        return name
    }

    private static func localWords(_ email: String) -> [String] {
        let local = email.split(separator: "@").first.map(String.init) ?? email
        return local.split(separator: ".").map { $0.prefix(1).uppercased() + $0.dropFirst() }
    }
}
