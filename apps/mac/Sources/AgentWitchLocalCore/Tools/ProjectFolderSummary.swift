import Foundation

/// GET /api/local/projects/folder on the local server (bundle ≥ 271).
public enum ProjectFolderSummary {
    public static let path = "/api/local/projects/folder"

    /// Top-level plain summary, e.g. "AgentWitch uses ~/daily-magic (git repo)."
    /// nil when missing, empty, not ok, or unparsable.
    public static func parse(_ data: Data) -> String? {
        guard
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
            (json["ok"] as? Bool) != false,
            let raw = json["summary"] as? String
        else { return nil }
        let line = raw
            .split(whereSeparator: \.isNewline)
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .first { !$0.isEmpty } ?? ""
        guard !line.isEmpty else { return nil }
        return line.count > 200 ? String(line.prefix(197)) + "…" : line
    }
}
