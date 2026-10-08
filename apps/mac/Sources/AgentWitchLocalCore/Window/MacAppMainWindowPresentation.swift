import Foundation

public enum MacAppActivationPolicyRequest: Equatable {
    case regular
    case accessory
}

/// AppKit side effects for raising the main window (fakes in tests).
@MainActor
public protocol MacAppWindowPresenting: AnyObject {
    func setActivationPolicy(_ policy: MacAppActivationPolicyRequest)
    func activateApp()
    func focusExistingMainWindow() -> Bool
    func openMainWindowScene()
    func selectPage(_ rawPage: String)
}

/// AWL 0.2.3: a menu-bar (.accessory) app must become .regular and activate
/// before SwiftUI can bring up its Window scene; Open window and Settings…
/// both route here. Drops back to .accessory when the last main window closes.
@MainActor
public final class MacAppMainWindowPresenter {
    private weak var presenter: MacAppWindowPresenting?
    public private(set) var pendingPageRawValue: String?

    public init(presenter: MacAppWindowPresenting) {
        self.presenter = presenter
    }

    public func present(pageRawValue: String) {
        pendingPageRawValue = pageRawValue
        presenter?.setActivationPolicy(.regular)
        presenter?.activateApp()
        
        let found = presenter?.focusExistingMainWindow() ?? false
        if !found {
            presenter?.openMainWindowScene()
        }
        
        presenter?.selectPage(pageRawValue)
    }

    public func mainWindowsDidChange(visibleMainWindowCount: Int) {
        if visibleMainWindowCount == 0 {
            presenter?.setActivationPolicy(.accessory)
        }
    }

    public func consumePendingPage() -> String? {
        let page = pendingPageRawValue
        pendingPageRawValue = nil
        return page
    }
}
