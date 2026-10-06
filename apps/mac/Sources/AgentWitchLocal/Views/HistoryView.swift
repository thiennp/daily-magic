import SwiftUI

struct HistoryView: View {
    @ObservedObject var store: MacAppLocalUIStore
    @State private var query: String = ""

    private var filtered: [LocalHistoryStubItem] {
        let q = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !q.isEmpty else { return store.historyItems }
        return store.historyItems.filter {
            $0.title.lowercased().contains(q)
                || $0.bot.lowercased().contains(q)
                || $0.project.lowercased().contains(q)
                || $0.summary.lowercased().contains(q)
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header
            if !store.historyEnabled {
                historyOffEmpty
            } else if filtered.isEmpty {
                emptySearch
            } else {
                List(filtered) { item in
                    historyRow(item)
                }
                .listStyle(.inset)
            }
            footer
        }
        .background(MacAppTheme.cream)
        .frame(minWidth: 440, minHeight: 480)
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 10) {
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
            Text("v1 stub list (local JSON / UserDefaults) — not cloud history; S5 local store not wired on this base.")
                .font(.caption2)
                .foregroundStyle(MacAppTheme.accentWarm)
        }
        .padding(16)
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
            Text("No tasks match")
                .font(.headline)
            Text("Try other words or clear the filters.")
                .font(.caption)
                .foregroundStyle(.secondary)
            Button("Clear filters") { query = "" }
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
                        .background(Capsule().fill(MacAppTheme.accentWarm.opacity(0.25)))
                }
            }
            Text("\(item.bot) · \(item.project) · \(item.whenLabel)")
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(item.summary)
                .font(.caption)
            Text(item.status.capitalized)
                .font(.caption2)
                .foregroundStyle(item.status == "failed" ? .red : MacAppTheme.success)
        }
        .padding(.vertical, 4)
    }

    private var footer: some View {
        HStack {
            Text("Keep for \(store.historyKeepDays) days")
                .font(.caption)
                .foregroundStyle(.secondary)
            Spacer()
            DownloadAwlLink(style: .compactFooter)
        }
        .padding(12)
        .background(Color.white.opacity(0.7))
    }
}
