import AppKit
import SwiftUI
import WebKit
import AgentWitchLocalCore

/// Minimal WKWebView for in-app local pages (Prompt optimizer). Sets the Mac UA marker
/// so the local server serves PO HTML while plain browsers stay retired (AWL-H7 PM-3 b).
/// Reloads only when the requested URL *prop* changes (F-1); in-page navigation is kept.
/// Navigations are restricted to loopback + discovered port; https opens externally (F-2).
struct MacAppLocalWebView: NSViewRepresentable {
    let url: URL

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeNSView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.applicationNameForUserAgent = MacAppConstants.macWebViewUserAgentMarker
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        context.coordinator.lastRequested = url
        context.coordinator.allowedPort = url.port
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateNSView(_ webView: WKWebView, context: Context) {
        guard shouldReloadLocalWebView(
            requested: url,
            lastRequested: context.coordinator.lastRequested
        ) else {
            return
        }
        context.coordinator.lastRequested = url
        context.coordinator.allowedPort = url.port
        webView.load(URLRequest(url: url))
    }

    final class Coordinator: NSObject, WKNavigationDelegate {
        var lastRequested: URL?
        var allowedPort: Int?

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            guard let destination = navigationAction.request.url else {
                decisionHandler(.cancel)
                return
            }
            if let allowedPort,
               shouldAllowLocalWebViewNavigation(url: destination, allowedPort: allowedPort)
            {
                decisionHandler(.allow)
                return
            }
            if let scheme = destination.scheme?.lowercased(), scheme == "https" {
                NSWorkspace.shared.open(destination)
            }
            decisionHandler(.cancel)
        }
    }
}
