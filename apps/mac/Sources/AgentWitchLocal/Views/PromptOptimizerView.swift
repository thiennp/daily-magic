import SwiftUI
import AgentWitchLocalCore

/// AWL-H7 PM-3 (b): Prompt optimizer surface — sand chrome + Pine accent, WKWebView on discovered port.
struct PromptOptimizerView: View {
    @ObservedObject var controller: MacAppMenuController

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 10) {
                Circle()
                    .fill(MacAppTheme.pine)
                    .frame(width: 8, height: 8)
                Text("Prompt optimizer")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(MacAppTheme.fg)
                Spacer()
                if let port = controller.localAppPort {
                    Text("127.0.0.1:\(port)")
                        .font(.caption2.monospaced())
                        .foregroundStyle(MacAppTheme.fgMuted)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(MacAppTheme.surface)
            Divider().background(MacAppTheme.border)

            if let port = controller.localAppPort {
                let url = resolveAgentWitchLocalPromptOptimizerUrl(
                    port: port,
                    path: controller.promptOptimizerPath,
                    query: controller.promptOptimizerQuery
                )
                MacAppLocalWebView(url: url)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Start AgentWitch Local to open Prompt optimizer.")
                        .font(.body)
                        .foregroundStyle(MacAppTheme.fg)
                    Text("The wizard runs on this computer inside the Mac app — not in a browser.")
                        .font(.caption)
                        .foregroundStyle(MacAppTheme.fgMuted)
                    Button("Start") { controller.startOrRepairSetup() }
                        .buttonStyle(.borderedProminent)
                        .tint(MacAppTheme.pine)
                }
                .padding(24)
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                .background(MacAppTheme.cream)
            }
        }
        .background(MacAppTheme.cream)
        .onAppear { controller.refreshInstallAndHealth() }
    }
}
