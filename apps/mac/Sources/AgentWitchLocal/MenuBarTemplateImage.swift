import AppKit

enum MenuBarTemplateImage {
    /// 18pt menu-bar glyph (black + alpha). Filename ends in Template so AppKit
    /// treats it as a template; we also set `isTemplate` explicitly.
    static func load() -> NSImage? {
        let image = NSImage(size: NSSize(width: 18, height: 18))
        guard
            let url1x = Bundle.module.url(forResource: "MenuBarIconTemplate", withExtension: "png"),
            let url2x = Bundle.module.url(forResource: "MenuBarIconTemplate@2x", withExtension: "png"),
            let rep1x = NSBitmapImageRep(contentsOf: url1x),
            let rep2x = NSBitmapImageRep(contentsOf: url2x)
        else {
            return nil
        }
        image.addRepresentation(rep1x)
        image.addRepresentation(rep2x)
        image.isTemplate = true
        return image
    }
}
