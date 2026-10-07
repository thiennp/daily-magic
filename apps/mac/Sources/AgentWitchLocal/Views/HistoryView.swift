import AppKit
import SwiftUI
import AgentWitchLocalCore

/// AWL-H4 — History offline fallback entry (Mac UX redo HTML).
/// Full history lives in each AgentWitch project; this is the on-computer fallback.
struct HistoryView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore

    private var isOffline: Bool { controller.isOfflineStub }
    private var isSignedIn: Bool { controller.signedInEmail != nil }

    /// UI stub rows shaped like the HTML history table (not cloud history).
    private var rows: [HistoryChromeRow] {
        [
            .init(day: "Today · Wed 7 Oct", time: "14:41", tool: "Claude Code", project: "Infusion",
                  what: "Refactored the intake form validation", took: "6 min", ok: true),
            .init(day: "Today · Wed 7 Oct", time: "13:02", tool: "Codex", project: "Website relaunch",
                  what: "Updated image sizes on the pricing page", took: "2 min", ok: true),
            .init(day: "Today · Wed 7 Oct", time: "11:20", tool: "Claude Code", project: "Infusion",
                  what: "Ran test suite before release", took: "11 min", ok: false),
            .init(day: "Yesterday · Tue 6 Oct", time: "17:55", tool: "Cursor CLI", project: "Website relaunch",
                  what: "Fixed broken links in the footer", took: "3 min", ok: true),
            .init(day: "Yesterday · Tue 6 Oct", time: "09:12", tool: "Claude Code", project: "Quarterly reports",
                  what: "Merged Q3 sheets into one summary", took: "8 min", ok: true),
        ]
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                offlineBanner
                historyTable
            }
            .padding(20)
        }
        .background(MacAppTheme.bg)
        .frame(minWidth: 480, minHeight: 520)
    }

    private var offlineBanner: some View {
        HStack(alignment: .center, spacing: 12) {
            Image(systemName: isOffline ? "wifi.slash" : "clock.arrow.circlepath")
                .foregroundStyle(isOffline ? MacAppTheme.warning : MacAppTheme.brand)
                .frame(width: 28, height: 28)
                .background(
                    Circle().fill(isOffline ? MacAppTheme.warningSoft : MacAppTheme.accentSoft)
                )
            VStack(alignment: .leading, spacing: 4) {
                Text(isOffline
                     ? "You are offline. This history is saved on this computer."
                     : "Saved on this computer")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Text(bannerSubtitle)
                    .font(.caption)
                    .foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            Button("Show in Finder") { showHistoryFolder() }
                .buttonStyle(.bordered)
        }
        .padding(14)
        .background(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .fill(isOffline ? MacAppTheme.warningSoft : MacAppTheme.accentSoft)
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(MacAppTheme.border, lineWidth: 1)
                )
        )
    }

    private var bannerSubtitle: String {
        var parts: [String] = []
        if isOffline {
            parts.append("It stays readable until the internet is back.")
        } else {
            parts.append("Use this when you are offline. Full history is in each project in AgentWitch.")
        }
        if !isSignedIn {
            parts.append("You are signed out; history stays here.")
        }
        return parts.joined(separator: " ")
    }

    private var historyTable: some View {
        let grouped = Dictionary(grouping: rows, by: \.day)
        let dayOrder = ["Today · Wed 7 Oct", "Yesterday · Tue 6 Oct"]
        return VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack(spacing: 0) {
                headerCell("Time", width: 64)
                headerCell("Assistant tool", flex: true)
                headerCell("Project", flex: true)
                headerCell("What happened", flex: true)
                headerCell("Took", width: 56)
                headerCell("Result", width: 72)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(MacAppTheme.tile)

            ForEach(dayOrder, id: \.self) { day in
                if let dayRows = grouped[day] {
                    Text(day)
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(MacAppTheme.fgSubtle)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(MacAppTheme.surface2)
                    ForEach(dayRows) { row in
                        historyRow(row)
                        Divider().background(MacAppTheme.border)
                    }
                }
            }
        }
        .background(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .fill(MacAppTheme.surface)
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(MacAppTheme.border, lineWidth: 1)
                )
        )
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private func historyRow(_ row: HistoryChromeRow) -> some View {
        HStack(spacing: 0) {
            Text(row.time)
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(MacAppTheme.fg)
                .frame(width: 64, alignment: .leading)
            Text(row.tool)
                .font(.caption)
                .foregroundStyle(MacAppTheme.fg)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(row.project)
                .font(.caption)
                .foregroundStyle(MacAppTheme.fgMuted)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(row.what)
                .font(.caption)
                .foregroundStyle(MacAppTheme.fg)
                .frame(maxWidth: .infinity, alignment: .leading)
                .lineLimit(2)
            Text(row.took)
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(MacAppTheme.fgSubtle)
                .frame(width: 56, alignment: .leading)
            Text(row.ok ? "Finished" : "Stopped")
                .font(.caption.weight(.semibold))
                .foregroundStyle(row.ok ? MacAppTheme.success : MacAppTheme.danger)
                .frame(width: 72, alignment: .leading)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(MacAppTheme.surface)
    }

    private func headerCell(_ title: String, width: CGFloat? = nil, flex: Bool = false) -> some View {
        Text(title)
            .font(.caption2.weight(.semibold))
            .foregroundStyle(MacAppTheme.fgSubtle)
            .frame(width: width, alignment: .leading)
            .frame(maxWidth: flex ? .infinity : nil, alignment: .leading)
    }

    private func showHistoryFolder() {
        let logs = FileManager.default.homeDirectoryForCurrentUser
            .appendingPathComponent("Library/Logs/AgentWitch Local", isDirectory: true)
        if !FileManager.default.fileExists(atPath: logs.path) {
            try? FileManager.default.createDirectory(at: logs, withIntermediateDirectories: true)
        }
        NSWorkspace.shared.activateFileViewerSelecting([logs])
    }
}

private struct HistoryChromeRow: Identifiable {
    var id: String { "\(day)-\(time)-\(what)" }
    var day: String
    var time: String
    var tool: String
    var project: String
    var what: String
    var took: String
    var ok: Bool
}
