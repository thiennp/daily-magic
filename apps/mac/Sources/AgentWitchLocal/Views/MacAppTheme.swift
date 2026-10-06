import SwiftUI

/// Claude Desktop v10 bright theme — light only, more colourful soft fills.
enum MacAppTheme {
    /// Page background (~#efeeeb / cream).
    static let cream = Color(red: 0.937, green: 0.933, blue: 0.922)
    static let surface = Color.white
    static let surface2 = Color(red: 0.980, green: 0.984, blue: 0.992)
    static let ink = Color(red: 0.063, green: 0.063, blue: 0.059)
    /// Primary brand blue #2457f0 (v10 brighter).
    static let accent = Color(red: 0.141, green: 0.341, blue: 0.941)
    static let accentSoft = Color(red: 0.882, green: 0.922, blue: 1.0)
    static let accentWarm = Color(red: 0.878, green: 0.541, blue: 0.0)
    static let success = Color(red: 0.039, green: 0.627, blue: 0.353)
    static let successSoft = Color(red: 0.875, green: 0.969, blue: 0.918)
    static let danger = Color(red: 0.706, green: 0.137, blue: 0.094)
    static let dangerSoft = Color(red: 0.992, green: 0.925, blue: 0.922)
    static let warningSoft = Color(red: 1.0, green: 0.945, blue: 0.816)
    static let botSoft = Color(red: 0.941, green: 0.910, blue: 1.0)
    static let agentSoft = Color(red: 0.851, green: 0.961, blue: 0.969)
    static let skillSoft = Color(red: 1.0, green: 0.941, blue: 0.839)
    static let playSoft = Color(red: 0.882, green: 0.922, blue: 1.0)
    static let border = Color(red: 0.878, green: 0.898, blue: 0.929)
    static let heroGradient = LinearGradient(
        colors: [
            Color(red: 0.141, green: 0.341, blue: 0.941),
            Color(red: 0.420, green: 0.280, blue: 0.960),
            Color(red: 0.180, green: 0.620, blue: 0.900),
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}
