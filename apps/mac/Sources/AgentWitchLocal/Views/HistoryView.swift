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

    /// No fake rows: this computer does not keep a run log the app can read yet.
    /// Real history lives in each project in AgentWitch.
    private var rows: [HistoryChromeRow] { [] }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                offlineBanner
                if isSignedIn && controller.chromeStatus.kind == .stopped {
                    AWLNoticeBanner(
                        tone: .info,
                        icon: "info.circle",
                        title: "AgentWitch Local is stopped.",
                        message: "You can still read History.",
                        actions: [("Start", { controller.startOrRepairSetup() })]
                    )
                }
                if rows.isEmpty { emptyState } else { historyTable }
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

    private var emptyState: some View {
        VStack(spacing: 10) {
            Image(systemName: "clock")
                .font(.system(size: 22))
                .foregroundStyle(MacAppTheme.fgSubtle)
            Text("Nothing saved on this computer yet")
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
            Text("What assistants did with your tools shows in each project in AgentWitch.")
                .font(.system(size: 12.5))
                .foregroundStyle(MacAppTheme.fgMuted)
                .multilineTextAlignment(.center)
            HStack(spacing: 10) {
                Button("Open AgentWitch") { controller.openAgentWitch(path: "/projects") }
                    .buttonStyle(.bordered)
                Button("See log") { controller.openLogs() }
                    .buttonStyle(.borderless)
            }
            .padding(.top, 4)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 36)
        .background(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .fill(MacAppTheme.surface)
                .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(MacAppTheme.border, lineWidth: 1))
        )
    }

    private var historyTable: some View {
        let grouped = Dictionary(grouping: rows, by: \.day)
        var dayOrder: [String] = []
        for row in rows where !dayOrder.contains(row.day) { dayOrder.append(row.day) }
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
