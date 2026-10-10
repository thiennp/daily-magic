import AppKit
import SwiftUI
import AgentWitchLocalCore

/// Computer pane — AWL Mac UX redo (design screens 2–7).
/// Thin AWL: plain-language status of the connection (AWB) and the assistant
/// tools runner (AWI) on this computer. Projects, assistants and tool access
/// are managed in AgentWitch (cloud); this pane links there instead.
struct ComputerView: View {
    @ObservedObject var controller: MacAppMenuController
    @ObservedObject var store: MacAppLocalUIStore
    @State private var isScanning = false
    @State private var installHelp: AgentCliKind?

    enum Pane: Equatable {
        case notSetUp, settingUp, setupFailed, signingInBrowser, signIn, connect, connected
    }

    private var pane: Pane {
        if case .failed = controller.setupSession { return .setupFailed }
        if case .error? = controller.bootstrapState { return .setupFailed }
        if controller.bootstrapState == .signingIn { return .signingInBrowser }
        if controller.setupSession.isInProgress { return .settingUp }
        switch controller.bootstrapState {
        case .checking?, .installing?, .settingUp?: return .settingUp
        default: break
        }
        if case .notInstalled = controller.state { return .notSetUp }
        if controller.signedInEmail == nil || controller.chromeSignInPhase != .none { return .signIn }
        if !controller.isComputerBoundStub { return .connect }
        return .connected
    }

    var body: some View {
        Group {
            switch pane {
            case .notSetUp: centered { notSetUpPanel }
            case .settingUp: centered { settingUpPanel }
            case .setupFailed: centered { setupFailedPanel }
            case .signingInBrowser, .signIn: AWLSignInView(controller: controller)
            case .connect: AWLConnectGateView(controller: controller, store: store)
            case .connected: connectedPane
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(MacAppTheme.bg)
        .sheet(item: $installHelp) { kind in
            AgentCliInstallHelpSheet(kind: kind)
        }
        .onAppear {
            controller.refreshInstallAndHealth()
            if controller.signedInEmail == nil
                && controller.chromeSignInPhase == .none
                && controller.bootstrapState == nil
                && controller.state != .notInstalled {
                controller.showSignInPromptGate()
            }
        }
    }

    // MARK: - Setup panels (self-heal, never a raw exit code)

    private var notSetUpPanel: some View {
        VStack(spacing: 18) {
            emblem("desktopcomputer", tint: MacAppTheme.brand, fill: MacAppTheme.accentSoft)
            title("Set up this computer")
            bodyText("AgentWitch Local lets assistants in your projects use tools on this computer. Setup takes about a minute and repairs itself if anything is missing.")
            Button("Start setup") { controller.startOrRepairSetup() }
                .buttonStyle(.borderedProminent).tint(MacAppTheme.brand).controlSize(.large)
            AWLConnectGateInline(afterSetupHint: true)
        }
    }

    private var settingUpPanel: some View {
        VStack(spacing: 18) {
            emblem("arrow.down.circle", tint: MacAppTheme.brand, fill: MacAppTheme.accentSoft)
            title("Setting up this computer")
            ProgressView(value: Double(progressPercent), total: 100)
                .progressViewStyle(.linear).tint(MacAppTheme.brand)
            VStack(spacing: 0) {
                ForEach(MacAppSetupProgressStep.allCases, id: \.rawValue) { step in
                    stepRow(step)
                }
            }
            .padding(.vertical, 6)
            .background(card)
            bodyText("You can close this window. Setup keeps going in the menu bar.")
        }
    }

    private var setupFailedPanel: some View {
        VStack(spacing: 18) {
            emblem("exclamationmark.triangle", tint: MacAppTheme.danger, fill: MacAppTheme.dangerSoft)
            title(MacAppSetupFailureKind.couldNotFinishTitle)
            bodyText(failureDetail)
            HStack(spacing: 10) {
                Button("Try again") { controller.retryFromProblem() }
                    .buttonStyle(.borderedProminent).tint(MacAppTheme.brand).controlSize(.large)
                if needsSystemSettings {
                    Button("Open System Settings") { openSystemSettings() }
                        .buttonStyle(.bordered).controlSize(.large)
                }
                Button("See log") { controller.openLogs() }
                    .buttonStyle(.borderless).foregroundStyle(MacAppTheme.brandInk)
            }
        }
    }

    private var needsSystemSettings: Bool {
        guard let kind = controller.setupSession.failureKind else { return false }
        return kind == .disk || kind == .permission
    }

    private func openSystemSettings() {
        let pane = controller.setupSession.failureKind == .disk
            ? "x-apple.systempreferences:com.apple.settings.Storage"
            : "x-apple.systempreferences:com.apple.preference.security"
        if let url = URL(string: pane) { NSWorkspace.shared.open(url) }
    }

    private var progressPercent: Int {
        if case .running(_, let percent) = controller.setupSession { return percent }
        switch controller.bootstrapState {
        case .installing?: return 46
        case .settingUp?: return 86
        default: return 8
        }
    }

    private var currentStep: MacAppSetupProgressStep {
        if case .running(let step, _) = controller.setupSession { return step }
        switch controller.bootstrapState {
        case .installing?: return .installingAssistantTools
        case .settingUp?: return .checkingEverythingWorks
        default: return .checkingThisComputer
        }
    }

    private var failureDetail: String {
        if let kind = controller.setupSession.failureKind { return kind.userFacingDetailText }
        if case .error(let reason)? = controller.bootstrapState { return sanitizeChromeMessage(reason) }
        return MacAppSetupFailureKind.generic.userFacingDetail
    }

    private func stepRow(_ step: MacAppSetupProgressStep) -> some View {
        let done = step.rawValue < currentStep.rawValue
        let now = step == currentStep
        return HStack(spacing: 10) {
            ZStack {
                if done {
                    Circle().fill(MacAppTheme.success)
                    Image(systemName: "checkmark").font(.system(size: 9, weight: .bold)).foregroundStyle(.white)
                } else if now {
                    ProgressView().controlSize(.small).scaleEffect(0.6)
                } else {
                    Circle().strokeBorder(MacAppTheme.border, lineWidth: 1.5)
                }
            }
            .frame(width: 18, height: 18)
            Text(step.title)
                .font(.system(size: 13))
                .foregroundStyle(done || now ? MacAppTheme.fg : MacAppTheme.fgSubtle)
            Spacer()
            Text(done ? "Done" : now ? "…" : "")
                .font(.system(size: 12, design: .monospaced))
                .foregroundStyle(MacAppTheme.fgSubtle)
        }
        .padding(.horizontal, 16).padding(.vertical, 9)
    }

    // MARK: - Connected (Running · Computer pane)

    private var chrome: MacAppChromeStatus { controller.chromeStatus }
    private var isRunning: Bool { controller.state == .running }

    private var connectedPane: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                if let guidance = installGuidance { installGuidanceBanner(guidance) }
                if controller.portsInUse { portsBanner }
                if chrome.kind == .waitingForInternet { offlineBanner }
                if isRunning && controller.connectionNotLinked { notLinkedBanner }
                if isRunning && !controller.connectionNotLinked,
                   let notice = controller.connectionDisconnect, notice.kind.isCloudSideOutage {
                    cloudUnreachableBanner(notice)
                }
                heroCard
                thisComputerCard
                toolsCard
                projectsCard
            }
            .padding(.horizontal, 40).padding(.vertical, 32)
            .frame(maxWidth: 880, alignment: .leading)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    /// Running from the disk image, a temporary copy or any non-Applications folder.
    private var installGuidance: AppInstallGuidance? {
        resolveAppInstallGuidance(bundlePath: Bundle.main.bundlePath, homeDirectory: NSHomeDirectory())
    }

    private func installGuidanceBanner(_ guidance: AppInstallGuidance) -> some View {
        HStack(spacing: 12) {
            Image(systemName: "externaldrive.badge.exclamationmark")
            VStack(alignment: .leading, spacing: 2) {
                Text(guidance.title).font(.system(size: 13, weight: .semibold))
                Text(guidance.message)
                    .font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
                    .fixedSize(horizontal: false, vertical: true)
            }
            Spacer()
            Button("Show Applications") {
                NSWorkspace.shared.open(URL(fileURLWithPath: "/Applications"))
            }.buttonStyle(.bordered)
        }
        .foregroundStyle(MacAppTheme.warning)
        .padding(.horizontal, 16).padding(.vertical, 12)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.warningSoft))
        .accessibilityElement(children: .combine)
    }

    private var portsBanner: some View {
        HStack(spacing: 12) {
            Image(systemName: "exclamationmark.triangle")
            VStack(alignment: .leading, spacing: 2) {
                Text(MacAppConstants.portsInUseReason).font(.system(size: 13, weight: .semibold))
                Text("Another app is using part of \(controller.localPortRangeDisplayStub). Close it or try again.")
                    .font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            Button("Try again") { controller.startOrRepairSetup() }.buttonStyle(.bordered)
            Button("See log") { controller.openLogs() }.buttonStyle(.borderless)
        }
        .foregroundStyle(MacAppTheme.danger)
        .padding(.horizontal, 16).padding(.vertical, 12)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.dangerSoft))
    }

    private var offlineBanner: some View {
        HStack(spacing: 12) {
            Image(systemName: "wifi.slash")
            VStack(alignment: .leading, spacing: 2) {
                Text("Waiting for internet").font(.system(size: 13, weight: .semibold))
                Text("Projects and assistants reconnect automatically. History still works offline.")
                    .font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            Button("Try now") { controller.refreshInstallAndHealth() }.buttonStyle(.bordered)
        }
        .foregroundStyle(MacAppTheme.warning)
        .padding(.horizontal, 16).padding(.vertical, 12)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.warningSoft))
        .accessibilityElement(children: .combine)
    }

    /// Cloud revoked or replaced this computer. It cannot recover by itself, so offer the
    /// same browser sign-in the first-run flow uses (no Terminal).
    private var notLinkedBanner: some View {
        HStack(spacing: 12) {
            Image(systemName: "link.badge.plus")
            VStack(alignment: .leading, spacing: 2) {
                Text("This computer is not linked to your account")
                    .font(.system(size: 13, weight: .semibold))
                Text("It was replaced or removed in AgentWitch. Sign in again to reconnect it.")
                    .font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            Button("Reconnect") { controller.beginAccountSignIn() }
                .buttonStyle(.borderedProminent).tint(MacAppTheme.brand)
        }
        .foregroundStyle(MacAppTheme.danger)
        .padding(.horizontal, 16).padding(.vertical, 12)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.dangerSoft))
    }

    /// The cloud, not this computer, is down: no sign-in or reinstall helps, AWL retries by itself.
    private func cloudUnreachableBanner(_ notice: LocalDisconnectNotice) -> some View {
        HStack(spacing: 12) {
            Image(systemName: "icloud.slash")
            VStack(alignment: .leading, spacing: 2) {
                Text("AgentWitch cloud is unreachable")
                    .font(.system(size: 13, weight: .semibold))
                Text("Nothing is wrong on this computer. Your link is kept and it reconnects by itself when the cloud is back.")
                    .font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
        }
        .foregroundStyle(MacAppTheme.fg)
        .padding(.horizontal, 16).padding(.vertical, 12)
        .background(RoundedRectangle(cornerRadius: 10).fill(MacAppTheme.dangerSoft))
        .accessibilityElement(children: .combine)
    }

    private var heroCard: some View {
        let colors = MacAppTheme.pillColors(for: chrome.kind)
        return HStack(spacing: 18) {
            Image(systemName: "desktopcomputer")
                .font(.system(size: 24, weight: .medium))
                .foregroundStyle(colors.fg)
                .frame(width: 52, height: 52)
                .background(RoundedRectangle(cornerRadius: 14).fill(colors.bg))
            VStack(alignment: .leading, spacing: 4) {
                Text(heroTitle).font(.system(size: 22, weight: .semibold)).foregroundStyle(MacAppTheme.fg)
                Text(heroSubtitle).font(.system(size: 13)).foregroundStyle(MacAppTheme.fgMuted)
                connectedAsLine
                    .font(.system(size: 13)).foregroundStyle(MacAppTheme.fgSubtle)
                    .padding(.top, 2)
            }
            Spacer()
            if !controller.portsInUse { startStopButton }
        }
        .padding(.horizontal, 24).padding(.vertical, 22)
        .background(card)
    }

    private var connectedAsLine: Text {
        let email = controller.signedInEmail ?? ""
        if let name = controller.signedInDisplayName, !name.isEmpty, name != email, name != "You" {
            return Text("Connected as ") + Text(name).bold().foregroundColor(MacAppTheme.fg) + Text(" · \(email)")
        }
        return Text("Connected as ") + Text(email).bold().foregroundColor(MacAppTheme.fg)
    }

    private var heroTitle: String {
        switch chrome.kind {
        case .running: return "Running"
        case .starting: return "Starting…"
        case .problem: return "Problem"
        case .waitingForInternet: return "Waiting for internet"
        default: return "Stopped"
        }
    }

    private var heroSubtitle: String {
        switch chrome.kind {
        case .running:
            if controller.connectionNotLinked {
                return "Running, but this computer is not linked to your account."
            }
            return controller.connectionLive == false
                ? "Running, but AgentWitch cannot reach this computer yet."
                : "Assistants in your projects can use this computer."
        case .starting: return "Opening the connection for your account."
        case .problem: return chrome.detailSubtitle
        case .waitingForInternet: return "AgentWitch Local reconnects by itself when the internet is back."
        default: return "Assistants cannot use this computer until you start it."
        }
    }

    @ViewBuilder
    private var startStopButton: some View {
        switch chrome.kind {
        case .running:
            HStack(spacing: 8) {
                Button { controller.restartCore() } label: {
                    Label("Restart", systemImage: "arrow.clockwise")
                }
                .buttonStyle(.bordered).controlSize(.large)
                .help("Restart AgentWitch for this account only")
                Button { controller.stopCore() } label: { Label("Stop", systemImage: "stop.fill") }
                    .buttonStyle(.bordered).controlSize(.large)
            }
        case .starting:
            Button("Starting…") {}.disabled(true).controlSize(.large)
        default:
            Button { controller.startOrRepairSetup() } label: { Label("Start", systemImage: "play.fill") }
                .buttonStyle(.borderedProminent).tint(MacAppTheme.brand).controlSize(.large)
        }
    }

    private var thisComputerCard: some View {
        cardSection(title: "On this computer", trailing: store.computerName) {
            serviceRow(
                icon: "cable.connector",
                title: "Connection to AgentWitch",
                detail: connectionDetail,
                pill: connectionPill
            )
            Divider()
            serviceRow(
                icon: "wrench.and.screwdriver",
                title: "Assistant tools runner",
                detail: runnerDetail,
                pill: isRunning ? ("Running", MacAppChromeKind.running) : ("Stopped", MacAppChromeKind.stopped)
            )
            if isRunning, let folder = controller.projectFolderSummary {
                Divider()
                HStack(spacing: 14) {
                    Image(systemName: "folder")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(MacAppTheme.brand)
                        .frame(width: 28, height: 28)
                        .background(RoundedRectangle(cornerRadius: 8).fill(MacAppTheme.accentSoft))
                    Text(folder)
                        .font(.system(size: 12.5))
                        .foregroundStyle(MacAppTheme.fgMuted)
                        .lineLimit(2)
                        .textSelection(.enabled)
                    Spacer()
                }
                .padding(.horizontal, 18).padding(.vertical, 12)
                .accessibilityLabel(folder)
            }
        }
    }

    private var connectionDetail: String {
        if !isRunning { return "Lets your projects reach this computer" }
        if controller.connectionNotLinked {
            return "Not linked to your account. Use Reconnect to sign in again."
        }
        switch controller.connectionLive {
        case true?: return "Lets your projects reach this computer · connected"
        case false?: return "Not connected to AgentWitch yet. It retries by itself."
        case nil: return "Checking the connection…"
        }
    }

    private var connectionPill: (String, MacAppChromeKind) {
        if chrome.kind == .waitingForInternet { return ("Waiting for internet", .waitingForInternet) }
        if controller.portsInUse { return ("Problem", .problem) }
        if !isRunning { return ("Stopped", .stopped) }
        if controller.connectionNotLinked { return ("Not linked", .problem) }
        switch controller.connectionLive {
        case true?: return ("Connected", .running)
        case false?: return ("Not connected", .problem)
        case nil: return ("Checking…", .starting)
        }
    }

    private var runnerDetail: String {
        var parts = ["Runs the tools your assistants use"]
        if let port = controller.localAppPort { parts.append("port \(port)") }
        if let version = controller.installBundleVersion { parts.append("version \(version)") }
        parts.append("\(store.toolsReadyCount) tools found")
        return parts.joined(separator: " · ")
    }

    private var toolsCard: some View {
        cardSection(title: "Assistant tools found", trailing: nil, action: (isScanning ? "Checking…" : "Check again", rescan)) {
            ForEach(Array(AgentCliKind.allCases.enumerated()), id: \.element) { index, kind in
                if index > 0 { Divider() }
                let found = store.cliInstalled[kind] ?? false
                HStack(spacing: 14) {
                    Text(kind.displayName.split(separator: " ").map { String($0.prefix(1)) }.joined())
                        .font(.system(size: 11, weight: .bold)).foregroundStyle(MacAppTheme.fgMuted)
                        .frame(width: 28, height: 28)
                        .background(RoundedRectangle(cornerRadius: 7).fill(MacAppTheme.tile2))
                    VStack(alignment: .leading, spacing: 1) {
                        Text(kind.displayName).font(.system(size: 13, weight: .medium)).foregroundStyle(MacAppTheme.fg)
                        Text(found ? "On this computer" : "Not installed on this computer")
                            .font(.system(size: 12)).foregroundStyle(MacAppTheme.fgSubtle)
                    }
                    Spacer()
                    if !found {
                        Button("How to install") { installHelp = kind }
                            .buttonStyle(.bordered).controlSize(.small)
                            .accessibilityLabel("How to install \(kind.displayName)")
                    }
                    pillView(found ? "Found" : "Not found", kind: found ? .running : .stopped)
                }
                .padding(.horizontal, 18).padding(.vertical, 12)
            }
            Divider()
            footerLink("Which project may use which tool is set in AgentWitch.", button: "Open AgentWitch") {
                controller.openAgentWitch(path: "/projects")
            }
        }
    }

    private var projectsCard: some View {
        cardSection(title: "Projects and assistants", trailing: nil) {
            footerLink("Chat, tasks, projects and assistants live in AgentWitch. This app only keeps this computer available to them.", button: "Open AgentWitch") {
                controller.openAgentWitch(path: "/projects")
            }
        }
    }

    private func rescan() {
        guard !isScanning else { return }
        isScanning = true
        store.markToolsRescanned {
            isScanning = false
            let ready = store.toolsReadyCount
            controller.showToast("Checked. \(ready) \(ready == 1 ? "tool" : "tools") ready.")
        }
    }

    // MARK: - Building blocks

    private var card: some View {
        RoundedRectangle(cornerRadius: 12)
            .fill(MacAppTheme.surface)
            .overlay(RoundedRectangle(cornerRadius: 12).strokeBorder(MacAppTheme.border))
    }

    private func centered<Content: View>(@ViewBuilder _ content: () -> Content) -> some View {
        ScrollView {
            content()
                .frame(maxWidth: 460)
                .multilineTextAlignment(.center)
                .padding(40)
                .frame(maxWidth: .infinity, minHeight: 560)
        }
    }

    private func emblem(_ systemName: String, tint: Color, fill: Color) -> some View {
        Image(systemName: systemName)
            .font(.system(size: 30, weight: .medium))
            .foregroundStyle(tint)
            .frame(width: 72, height: 72)
            .background(RoundedRectangle(cornerRadius: 20).fill(fill))
    }

    private func title(_ text: String) -> some View {
        Text(text).font(.system(size: 26, weight: .bold)).foregroundStyle(MacAppTheme.fg)
    }

    private func bodyText(_ text: String) -> some View {
        Text(text).font(.system(size: 14)).foregroundStyle(MacAppTheme.fgMuted).fixedSize(horizontal: false, vertical: true)
    }

    private func cardSection<Content: View>(
        title: String,
        trailing: String?,
        action: (String, () -> Void)? = nil,
        @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text(title).font(.system(size: 13.5, weight: .semibold)).foregroundStyle(MacAppTheme.fg)
                Spacer()
                if let trailing { Text(trailing).font(.system(size: 12)).foregroundStyle(MacAppTheme.fgSubtle) }
                if let action { Button(action.0, action: action.1).buttonStyle(.borderless).controlSize(.small) }
            }
            .padding(.horizontal, 18).padding(.vertical, 14)
            Divider()
            content()
        }
        .background(card)
    }

    private func serviceRow(icon: String, title: String, detail: String, pill: (String, MacAppChromeKind)) -> some View {
        let colors = MacAppTheme.pillColors(for: pill.1)
        return HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(colors.fg)
                .frame(width: 28, height: 28)
                .background(RoundedRectangle(cornerRadius: 8).fill(colors.bg))
            VStack(alignment: .leading, spacing: 1) {
                Text(title).font(.system(size: 13, weight: .semibold)).foregroundStyle(MacAppTheme.fg)
                Text(detail).font(.system(size: 12)).foregroundStyle(MacAppTheme.fgMuted)
            }
            Spacer()
            pillView(pill.0, kind: pill.1)
        }
        .padding(.horizontal, 18).padding(.vertical, 12)
    }

    private func pillView(_ label: String, kind: MacAppChromeKind) -> some View {
        let colors = MacAppTheme.pillColors(for: kind)
        return HStack(spacing: 6) {
            Circle().fill(colors.fg).frame(width: 7, height: 7)
            Text(label).font(.system(size: 12, weight: .semibold))
        }
        .padding(.horizontal, 10).padding(.vertical, 3)
        .background(Capsule().fill(colors.bg))
        .foregroundStyle(colors.fg)
    }

    private func footerLink(_ text: String, button: String, action: @escaping () -> Void) -> some View {
        HStack(spacing: 12) {
            Text(text).font(.system(size: 12.5)).foregroundStyle(MacAppTheme.fgMuted)
            Spacer()
            Button(button, action: action).buttonStyle(.bordered)
        }
        .padding(.horizontal, 18).padding(.vertical, 12)
    }
}

private extension MacAppSetupFailureKind {
    var userFacingDetailText: String { userFacingDetail }
}
