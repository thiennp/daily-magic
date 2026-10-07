import Foundation

/// Whether `MacAppLocalWebView` should call `load` for a new requested URL prop.
/// Compares the *requested* prop only — never `webView.url` — so in-page navigation
/// (`history.replaceState`, form POST, guide links) does not bounce back to the start URL
/// when the SwiftUI parent re-renders (AWL-H7 Arch review 5 B-1 / F-1).
public func shouldReloadLocalWebView(requested: URL, lastRequested: URL?) -> Bool {
    guard let lastRequested else {
        return true
    }
    return requested != lastRequested
}

/// Whether a WKWebView navigation target is the discovered local AWL loopback port.
/// Allows only `http` + `127.0.0.1` + `allowedPort` (AWL-H7 Arch review 5 F-2).
public func shouldAllowLocalWebViewNavigation(url: URL, allowedPort: Int) -> Bool {
    guard let scheme = url.scheme?.lowercased(), scheme == "http" else {
        return false
    }
    guard url.host == MacAppConstants.localAppHost else {
        return false
    }
    guard let port = url.port, port == allowedPort else {
        return false
    }
    return true
}
