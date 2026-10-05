import Foundation

/// Directory of `node` from `$SHELL -lc 'command -v node'` output.
/// Login shells may print banners first, so the last absolute `.../node` line wins.
public func parseLoginShellNodeDirectory(output: String) -> String? {
    let lines = output
        .split(whereSeparator: \.isNewline)
        .map { $0.trimmingCharacters(in: .whitespaces) }
    guard let nodePath = lines.last(where: { $0.hasPrefix("/") && $0.hasSuffix("/node") }) else {
        return nil
    }
    let directory = (nodePath as NSString).deletingLastPathComponent
    return directory.isEmpty ? nil : directory
}
