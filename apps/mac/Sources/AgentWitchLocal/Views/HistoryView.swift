import SwiftUI

struct HistoryView: View {
    @ObservedObject var store: MacAppLocalUIStore
    @State private var query: String = ""
    @State private var projectFilter: String = "all"
    @State private var statusFilter: String = "all"
    @State private var toolFilter: String = "all"
    @State private var whenFilter: String = "any"
    @State private var sortNewest = true
    @State private var shown = 15
    @State private var showClearConfirm = false

    private var projects: [String] {
        Array(Set(store.historyItems.map(\.project))).sorted()
    }

    private var filtered: [LocalHistoryStubItem] {
        let q = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        var items = store.historyItems.filter { item in
            if projectFilter != "all", item.project != projectFilter { return false }
            if statusFilter != "all", item.status != statusFilter { return false }
            if toolFilter != "all", item.cli != toolFilter { return false }
            if whenFilter == "today", item.whenLabel != "Today" { return false }
            if whenFilter == "7d" {
                let recent = ["Today", "Yesterday", "2 days ago", "3 days ago", "4 days ago", "5 days ago", "6 days ago"]
                if !recent.contains(item.whenLabel) { return false }
            }
            // "30d" / "any" keep all stub rows (local stub list).
            if !q.isEmpty {
                let hay = "\(item.title) \(item.bot) \(item.project) \(item.summary) \(item.cli)".lowercased()
                if !hay.contains(q) { return false }
            }
            return true
        }
        if sortNewest {
            // seed order is newest-first already
        } else {
            items = Array(items.reversed())
        }
        return items
    }

    private var visible: [LocalHistoryStubItem] {
        Array(filtered.prefix(shown))
    }

    private var anyFilter: Bool {
        projectFilter != "all" || statusFilter != "all" || toolFilter != "all"
            || whenFilter != "any" || !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header
            filters
            if !store.historyEnabled {
                historyOffEmpty
            } else if filtered.isEmpty {
                emptySearch
            } else {
                List(visible) { item in
                    historyRow(item)
                }
                .listStyle(.inset)
                if filtered.count > shown {
                    Button("Show more") { shown += 15 }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 6)
                }
            }
            footer
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 480, minHeight: 520)
        .alert("Clear history?", isPresented: $showClearConfirm) {
            Button("Cancel", role: .cancel) {}
            Button("Clear", role: .destructive) {
                store.clearHistory(projectFilter: projectFilter == "all" ? nil : projectFilter)
            }
        } message: {
            Text("Removes tasks from this computer only. It cannot be undone.")
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "clock.arrow.circlepath")
                    .foregroundStyle(MacAppTheme.accent)
                Text("History")
                    .font(.title2.bold())
                Spacer()
                Text(store.historySpaceUsedLabel)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            Text("Past tasks of your projects, saved on this computer only.")
                .font(.caption)
                .foregroundStyle(.secondary)
            TextField("Search History", text: $query)
                .textFieldStyle(.roundedBorder)
            Text("Local stub list — cloud History and S5 index stay on Soft LOCK tip-move; no invented backend.")
                .font(.caption2)
                .foregroundStyle(MacAppTheme.accentWarm)
        }
        .padding(16)
        .background(MacAppTheme.playSoft.opacity(0.45))
    }

    private var filters: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Picker("Project", selection: $projectFilter) {
                    Text("All projects").tag("all")
                    ForEach(projects, id: \.self) { p in
                        Text(p).tag(p)
                    }
                }
                .frame(maxWidth: 160)
                Picker("Status", selection: $statusFilter) {
                    Text("Any status").tag("all")
                    Text("Done").tag("done")
                    Text("Failed").tag("failed")
                }
                .frame(maxWidth: 130)
                Picker("Tool", selection: $toolFilter) {
                    Text("Any tool").tag("all")
                    Text("Claude").tag("claude")
                    Text("Cursor").tag("cursor")
                    Text("Codex").tag("codex")
                    Text("Gemini").tag("gemini")
                }
                .frame(maxWidth: 130)
            }
            HStack {
                Picker("When", selection: $whenFilter) {
                    Text("Any time").tag("any")
                    Text("Today").tag("today")
                    Text("Last 7 days").tag("7d")
                    Text("Last 30 days").tag("30d")
                }
                .frame(maxWidth: 150)
                Picker("Sort", selection: $sortNewest) {
                    Text("Newest first").tag(true)
                    Text("Oldest first").tag(false)
                }
                .frame(maxWidth: 150)
                if anyFilter {
                    Button("Clear filters") {
                        query = ""
                        projectFilter = "all"
                        statusFilter = "all"
                        toolFilter = "all"
                        whenFilter = "any"
                        shown = 15
                    }
                    .controlSize(.small)
                }
                Spacer()
                Text("\(filtered.count) task\(filtered.count == 1 ? "" : "s")\(anyFilter ? " found" : "")")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.horizontal, 16)
        .padding(.bottom, 8)
        .controlSize(.small)
    }

    private var historyOffEmpty: some View {
        VStack(spacing: 12) {
            Spacer()
            Image(systemName: "eye.slash")
                .font(.largeTitle)
                .foregroundStyle(.secondary)
            Text("History is off")
                .font(.headline)
            Text("New tasks are not saved. Items already here stay until you delete them.")
                .font(.caption)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            Button("Turn on History") {
                store.historyEnabled = true
            }
            .buttonStyle(.borderedProminent)
            .tint(MacAppTheme.accent)
            Spacer()
        }
        .frame(maxWidth: .infinity)
    }

    private var emptySearch: some View {
        VStack(spacing: 10) {
            Spacer()
            Text(anyFilter ? "Nothing matches." : "No tasks yet")
                .font(.headline)
            Text(anyFilter ? "Try other words or clear the filters." : "Past tasks will show here when History is on.")
                .font(.caption)
                .foregroundStyle(.secondary)
            if anyFilter {
                Button("Clear filters") {
                    query = ""
                    projectFilter = "all"
                    statusFilter = "all"
                    toolFilter = "all"
                    whenFilter = "any"
                }
            }
            Spacer()
        }
        .frame(maxWidth: .infinity)
    }

    private func historyRow(_ item: LocalHistoryStubItem) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(item.title)
                    .font(.subheadline.weight(.semibold))
                Spacer()
                if item.isStub {
                    Text("STUB")
                        .font(.caption2.weight(.bold))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Capsule().fill(MacAppTheme.skillSoft))
                }
            }
            Text("\(item.bot) · \(item.project) · \(item.cli) · \(item.whenLabel)")
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(item.summary)
                .font(.caption)
            if let err = item.errorDetail {
                Text(err)
                    .font(.caption2)
                    .foregroundStyle(MacAppTheme.danger)
                    .padding(6)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(RoundedRectangle(cornerRadius: 6).fill(MacAppTheme.dangerSoft))
            }
            Text(item.status.capitalized)
                .font(.caption2.weight(.semibold))
                .foregroundStyle(item.status == "failed" ? MacAppTheme.danger : MacAppTheme.success)
        }
        .padding(.vertical, 4)
        .listRowBackground(MacAppTheme.surface)
    }

    private var footer: some View {
        HStack {
            Text("Keep for \(store.historyKeepDays) days")
                .font(.caption)
                .foregroundStyle(.secondary)
            Button("Clear history…") {
                showClearConfirm = true
            }
            .controlSize(.small)
            .disabled(store.historyItems.isEmpty)
            Spacer()
        }
        .padding(12)
        .background(MacAppTheme.surface.opacity(0.92))
    }
}
