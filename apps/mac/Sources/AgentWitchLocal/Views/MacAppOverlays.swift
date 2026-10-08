import AppKit
import SwiftUI
import AgentWitchLocalCore

/// Design toast: a dark capsule near the top of the window that confirms an action
/// ("Stopped. Assistants cannot use this computer.") and fades away by itself.
struct MacAppToastOverlay: ViewModifier {
    @ObservedObject var controller: MacAppMenuController

    func body(content: Content) -> some View {
        content
            .overlay(alignment: .top) {
                if let message = controller.toastMessage {
                    Text(message)
                        .font(.system(size: 13))
                        .foregroundStyle(MacAppTheme.surface2)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 9)
                        .background(Capsule().fill(MacAppTheme.fg))
                        .shadow(color: .black.opacity(0.2), radius: 10, y: 4)
                        .padding(.top, 60)
                        .transition(.move(edge: .top).combined(with: .opacity))
                        .allowsHitTesting(false)
                        .accessibilityElement(children: .ignore)
                        .accessibilityLabel(message)
                }
            }
            .animation(.easeOut(duration: 0.18), value: controller.toastMessage)
            .onChange(of: controller.toastMessage) { message in
                guard let message else { return }
                NSAccessibility.post(
                    element: NSApp as Any,
                    notification: .announcementRequested,
                    userInfo: [.announcement: message]
                )
            }
    }
}

extension View {
    func awlToastOverlay(_ controller: MacAppMenuController) -> some View {
        modifier(MacAppToastOverlay(controller: controller))
    }
}

/// Design modal "Setup and connection log": readable tail of the newest log, Copy log, Done.
struct MacAppLogSheet: View {
    @ObservedObject var controller: MacAppMenuController
    @State private var text = ""
    @State private var copied = false

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Setup and connection log")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
            ScrollView {
                Text(text.isEmpty ? "No log yet. It appears here after setup or the first connection." : text)
                    .font(.system(size: 11.5, design: .monospaced))
                    .foregroundStyle(MacAppTheme.fgMuted)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .textSelection(.enabled)
                    .padding(12)
            }
            .frame(height: 260)
            .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.tile))
            .accessibilityLabel("Log")
            HStack(spacing: 8) {
                Spacer()
                Button(copied ? "Copied" : "Copy log") { copyLog() }
                    .disabled(text.isEmpty)
                Button("Done") { controller.isLogSheetPresented = false }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brand)
                    .keyboardShortcut(.defaultAction)
            }
        }
        .padding(22)
        .frame(width: 620)
        .background(MacAppTheme.surface)
        .preferredColorScheme(.light)
        .onAppear { text = controller.currentLogURL.flatMap { Self.readTail($0) } ?? "" }
    }

    private func copyLog() {
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(text, forType: .string)
        copied = true
        controller.showToast("Log copied")
    }

    /// Last `maxBytes` of the file, starting on a whole line.
    private static func readTail(_ url: URL, maxBytes: Int = 64 * 1024) -> String? {
        guard let handle = try? FileHandle(forReadingFrom: url) else { return nil }
        defer { try? handle.close() }
        guard let size = try? handle.seekToEnd() else { return nil }
        let start = size > UInt64(maxBytes) ? size - UInt64(maxBytes) : 0
        guard (try? handle.seek(toOffset: start)) != nil,
              let data = try? handle.readToEnd() else { return nil }
        var tail = String(decoding: data, as: UTF8.self)
        if start > 0, let newline = tail.firstIndex(of: "\n") {
            tail = String(tail[tail.index(after: newline)...])
        }
        return tail.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

/// Plain-language banner used on History and Settings (design: stopped, problem, offline).
struct AWLNoticeBanner: View {
    enum Tone { case info, warning, danger }

    let tone: Tone
    let icon: String
    let title: String
    let message: String
    var actions: [(String, () -> Void)] = []

    private var colors: (fg: Color, bg: Color) {
        switch tone {
        case .info: return (MacAppTheme.fgMuted, MacAppTheme.tile)
        case .warning: return (MacAppTheme.warning, MacAppTheme.warningSoft)
        case .danger: return (MacAppTheme.danger, MacAppTheme.dangerSoft)
        }
    }

    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            Image(systemName: icon)
            VStack(alignment: .leading, spacing: 2) {
                Text(title).font(.system(size: 13, weight: .semibold))
                Text(message).font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            ForEach(Array(actions.enumerated()), id: \.offset) { _, action in
                Button(action.0, action: action.1).buttonStyle(.bordered)
            }
        }
        .foregroundStyle(colors.fg)
        .padding(.horizontal, 16).padding(.vertical, 12)
        .background(RoundedRectangle(cornerRadius: 10).fill(colors.bg))
        .accessibilityElement(children: .contain)
    }
}

/// Design "How to install": the command to run in a terminal, with Copy command.
struct AgentCliInstallHelpSheet: View {
    let kind: AgentCliKind
    @Environment(\.dismiss) private var dismiss
    @State private var copied = false

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text(kind.installTitle)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(MacAppTheme.fg)
            Text("Run this in a terminal, then check again.")
                .font(.system(size: 13))
                .foregroundStyle(MacAppTheme.fgMuted)
            Text(kind.installHint)
                .font(.system(size: 12, design: .monospaced))
                .textSelection(.enabled)
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.fill))
            Label("After that, choose Check again.", systemImage: "info.circle")
                .font(.system(size: 12))
                .foregroundStyle(MacAppTheme.fgSubtle)
            HStack(spacing: 8) {
                Spacer()
                Button(copied ? "Copied" : "Copy command") {
                    NSPasteboard.general.clearContents()
                    NSPasteboard.general.setString(kind.installHint, forType: .string)
                    copied = true
                }
                Button("Done") { dismiss() }
                    .buttonStyle(.borderedProminent)
                    .tint(MacAppTheme.brand)
                    .keyboardShortcut(.defaultAction)
            }
        }
        .padding(22)
        .frame(width: 460)
        .background(MacAppTheme.surface)
        .preferredColorScheme(.light)
    }
}
