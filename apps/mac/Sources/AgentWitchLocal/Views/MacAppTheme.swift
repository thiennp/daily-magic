import SwiftUI

enum MacAppTheme {
    static let cream = Color(red: 0.98, green: 0.976, blue: 0.96)
    static let ink = Color(red: 0.08, green: 0.08, blue: 0.075)
    static let accent = Color(red: 0.22, green: 0.55, blue: 0.95)
    static let accentWarm = Color(red: 0.95, green: 0.45, blue: 0.18)
    static let success = Color(red: 0.12, green: 0.62, blue: 0.38)
    static let heroGradient = LinearGradient(
        colors: [
            Color(red: 0.20, green: 0.48, blue: 0.98),
            Color(red: 0.45, green: 0.28, blue: 0.95),
        ],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}
