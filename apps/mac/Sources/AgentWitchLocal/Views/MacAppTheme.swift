import AgentWitchLocalCore
import SwiftUI

/// Product palette tokens from AWL Mac UX redo (EN PASS). Light sand + brand Pine `#1f6656`.
/// No clay, no purple. HN-H1 primary swap (PALETTE-LOCK amended 16:33).
enum MacAppTheme {
    // Exact tokens from Product SoT
    static let bg = Color(hex: 0xe8e6e1)           // --bg
    static let surface = Color(hex: 0xffffff)      // --surface
    static let surface2 = Color(hex: 0xf7f6f4)     // --surface-2
    static let tile = Color(hex: 0xf4f3f0)         // --tile
    static let tile2 = Color(hex: 0xebe9e4)        // --tile-2
    static let fill = Color(hex: 0xe9e7e2)         // --fill
    static let accentSoft = Color(hex: 0xdde8e3)   // --accent-soft (Pine tint)
    static let accentSoft2 = Color(hex: 0xc8ddd6)  // --accent-soft-2 (Pine soft companion)
    static let border = Color(hex: 0xddd9d2)       // --border
    static let borderStrong = Color(hex: 0xc9c4bb) // --border-strong
    static let controlBorder = Color(hex: 0x8a8478)// --control-border
    static let fg = Color(hex: 0x101828)           // --fg
    static let fgMuted = Color(hex: 0x4b5567)      // --fg-muted
    static let fgSubtle = Color(hex: 0x566073)     // --fg-subtle
    static let brand = Color(hex: 0x1f6656)        // --brand / --primary (Pine)
    static let brandInk = Color(hex: 0x19564a)     // --brand-ink / --primary-hover
    static let brandPressed = Color(hex: 0x13463c) // --primary-pressed
    /// Pine accent for Prompt optimizer chrome (AWL-H7 PM-3 b). Alias of `brand` since HN-H1 Pine swap.
    static let pine = brand

    // Semantic (status pills)
    static let success = Color(hex: 0x24784A)
    static let successSoft = Color(hex: 0xDFEFE5)
    static let danger = Color(hex: 0xBA2F2F)
    static let dangerSoft = Color(hex: 0xF7E0DF)
    static let warning = Color(hex: 0x7A6400)
    static let warningSoft = Color(hex: 0xF4EDCC)

    // Aliases used by existing views (map to new tokens — no clay/purple)
    static let cream = bg
    static let ink = fg
    static let accent = brand
    static let accentWarm = Color(hex: 0x7A6400)
    static let botSoft = accentSoft
    static let agentSoft = accentSoft2
    static let skillSoft = tile2
    static let playSoft = accentSoft
    static let surfaceLegacy = surface
    static let heroGradient = LinearGradient(
        colors: [brand, brandInk],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )

    static func pillColors(for kind: MacAppChromeKind) -> (fg: Color, bg: Color) {
        switch kind {
        case .running:
            return (success, successSoft)
        case .settingUp, .starting:
            return (brand, accentSoft)
        case .problem:
            return (danger, dangerSoft)
        case .waitingForInternet:
            return (warning, warningSoft)
        case .notSetUp, .signedOut, .stopped:
            return (fgMuted, fill)
        }
    }
}

extension Color {
    init(hex: UInt32, opacity: Double = 1) {
        let r = Double((hex >> 16) & 0xff) / 255
        let g = Double((hex >> 8) & 0xff) / 255
        let b = Double(hex & 0xff) / 255
        self.init(.sRGB, red: r, green: g, blue: b, opacity: opacity)
    }
}
