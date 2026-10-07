import SwiftUI
import WebKit
import AgentWitchLocalCore

/// Minimal WKWebView for in-app local pages (Prompt optimizer). Sets the Mac UA marker
/// so the local server serves PO HTML while plain browsers stay retired (AWL-H7 PM-3 b).
struct MacAppLocalWebView: NSViewRepresentable {
    let url: URL

    func makeNSView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.applicationNameForUserAgent = MacAppConstants.macWebViewUserAgentMarker
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateNSView(_ webView: WKWebView, context: Context) {
        if webView.url != url {
            webView.load(URLRequest(url: url))
        }
    }
}
