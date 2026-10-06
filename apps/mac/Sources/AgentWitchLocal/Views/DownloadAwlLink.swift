import AppKit
import SwiftUI
import AgentWitchLocalCore

/// HARD product rule: Download AWL must ALWAYS be visible, even when connected/installed/running.
struct DownloadAwlLink: View {
    var style: Style = .button
    var openURL: (URL) -> Void = { NSWorkspace.shared.open($0) }

    enum Style {
        case button
        case prominent
        case compactFooter
    }

    var body: some View {
        switch style {
        case .button:
            Button {
                openURL(resolveDownloadAwlUrl())
            } label: {
                Label("Download AWL", systemImage: "arrow.down.circle.fill")
            }
            .help("Open https://www.agentwitch.com/download")
        case .prominent:
            Button {
                openURL(resolveDownloadAwlUrl())
            } label: {
                Label("Download AWL", systemImage: "arrow.down.circle.fill")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .tint(MacAppTheme.accent)
            .help("Open https://www.agentwitch.com/download")
        case .compactFooter:
            Button {
                openURL(resolveDownloadAwlUrl())
            } label: {
                Label("Download AWL", systemImage: "arrow.down.circle")
                    .font(.caption.weight(.semibold))
            }
            .buttonStyle(.borderless)
            .foregroundStyle(MacAppTheme.accent)
            .help("Open https://www.agentwitch.com/download")
        }
    }
}
