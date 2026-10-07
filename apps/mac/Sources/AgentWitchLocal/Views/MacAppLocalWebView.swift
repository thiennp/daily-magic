import AppKit
import SwiftUI
import WebKit
import AgentWitchLocalCore

/// Minimal WKWebView for in-app local pages (Prompt optimizer). Sets the Mac UA marker
/// so the local server serves PO HTML while plain browsers stay retired (AWL-H7 PM-3 b).
/// Reloads only when the requested URL *prop* changes (F-1); in-page navigation is kept.
/// Navigations are restricted to loopback + discovered port; https opens externally (F-2).
/// Attachment responses / `<a download>` become WKDownloads saved to ~/Downloads (DF-013).
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

    final class Coordinator: NSObject, WKNavigationDelegate, WKDownloadDelegate {
        var lastRequested: URL?
        var allowedPort: Int?
        private var downloadDestinations: [ObjectIdentifier: URL] = [:]

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            guard let destination = navigationAction.request.url else {
                decisionHandler(.cancel)
                return
            }
            switch decideLocalWebViewNavigation(
                url: destination,
                allowedPort: allowedPort,
                shouldPerformDownload: navigationAction.shouldPerformDownload
            ) {
            case .allow:
                decisionHandler(.allow)
            case .download:
                decisionHandler(.download)
            case .openExternally:
                NSWorkspace.shared.open(destination)
                decisionHandler(.cancel)
            case .cancel:
                decisionHandler(.cancel)
            }
        }

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationResponse: WKNavigationResponse,
            decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void
        ) {
            let disposition = (navigationResponse.response as? HTTPURLResponse)?
                .value(forHTTPHeaderField: "Content-Disposition")
            if shouldDownloadLocalWebViewResponse(
                contentDisposition: disposition,
                canShowMIMEType: navigationResponse.canShowMIMEType
            ) {
                decisionHandler(.download)
                return
            }
            decisionHandler(.allow)
        }

        func webView(
            _ webView: WKWebView,
            navigationAction: WKNavigationAction,
            didBecome download: WKDownload
        ) {
            download.delegate = self
        }

        func webView(
            _ webView: WKWebView,
            navigationResponse: WKNavigationResponse,
            didBecome download: WKDownload
        ) {
            download.delegate = self
        }

        func download(
            _ download: WKDownload,
            decideDestinationUsing response: URLResponse,
            suggestedFilename: String,
            completionHandler: @escaping (URL?) -> Void
        ) {
            let fileManager = FileManager.default
            guard let directory = fileManager.urls(for: .downloadsDirectory, in: .userDomainMask).first else {
                completionHandler(nil)
                return
            }
            let destination = resolveLocalWebViewDownloadDestination(
                directory: directory,
                suggestedFilename: suggestedFilename,
                fileExists: { fileManager.fileExists(atPath: $0) }
            )
            downloadDestinations[ObjectIdentifier(download)] = destination
            completionHandler(destination)
        }

        func downloadDidFinish(_ download: WKDownload) {
            guard let destination = downloadDestinations.removeValue(forKey: ObjectIdentifier(download)) else {
                return
            }
            NSWorkspace.shared.activateFileViewerSelecting([destination])
        }

        func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
            downloadDestinations.removeValue(forKey: ObjectIdentifier(download))
            NSLog("AgentWitchLocal: local web view download failed: \(error.localizedDescription)")
            NSSound.beep()
        }
    }
}
