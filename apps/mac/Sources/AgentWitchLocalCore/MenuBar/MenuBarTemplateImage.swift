import AppKit
import Foundation

/// Loads the menu-bar template glyph from an app bundle's Resources.
/// PNGs are staged into Contents/Resources by `scripts/mac/build-awl-mac-dmg.sh`
/// (not SPM `Bundle.module`, which fatalErrors when the resource bundle is missing).
public enum MenuBarTemplateImage {
    /// 18pt black+alpha template. Returns nil when the PNGs are absent so the
    /// caller can fall back to an SF Symbol without crashing.
    public static func load(from bundle: Bundle = .main) -> NSImage? {
        guard
            let url1x = bundle.url(forResource: "MenuBarIconTemplate", withExtension: "png"),
            let url2x = bundle.url(forResource: "MenuBarIconTemplate@2x", withExtension: "png"),
            let data1x = try? Data(contentsOf: url1x),
            let data2x = try? Data(contentsOf: url2x),
            let rep1x = NSBitmapImageRep(data: data1x),
            let rep2x = NSBitmapImageRep(data: data2x)
        else {
            return nil
        }
        let image = NSImage(size: NSSize(width: 18, height: 18))
        image.addRepresentation(rep1x)
        image.addRepresentation(rep2x)
        image.isTemplate = true
        return image
    }
}
