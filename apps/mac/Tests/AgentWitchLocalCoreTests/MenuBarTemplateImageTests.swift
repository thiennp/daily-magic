import AppKit
import XCTest
@testable import AgentWitchLocalCore

final class MenuBarTemplateImageTests: XCTestCase {
    func testLoadReturnsNilWhenBundleHasNoTemplatePNGs() throws {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("awl-menubar-empty-\(UUID().uuidString)", isDirectory: true)
        try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: dir) }

        guard let bundle = Bundle(url: dir) else {
            return XCTFail("expected Bundle(url:) for empty directory")
        }
        XCTAssertNil(
            MenuBarTemplateImage.load(from: bundle),
            "Missing MenuBarIconTemplate PNGs must yield nil (SF Symbol fallback), not crash"
        )
    }

    func testLoadReturnsTemplateImageWhenPNGsPresent() throws {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("awl-menubar-full-\(UUID().uuidString)", isDirectory: true)
        try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: dir) }

        // Tiny 1x1 + 2x2 black PNGs are enough for NSBitmapImageRep to decode.
        let png1x = try XCTUnwrap(minimalPNG(width: 1, height: 1))
        let png2x = try XCTUnwrap(minimalPNG(width: 2, height: 2))
        try png1x.write(to: dir.appendingPathComponent("MenuBarIconTemplate.png"))
        try png2x.write(to: dir.appendingPathComponent("MenuBarIconTemplate@2x.png"))

        guard let bundle = Bundle(url: dir) else {
            return XCTFail("expected Bundle(url:) for resource directory")
        }
        let image = MenuBarTemplateImage.load(from: bundle)
        XCTAssertNotNil(image)
        XCTAssertEqual(image?.isTemplate, true)
        XCTAssertEqual(image?.representations.count, 2)
    }

    /// Minimal valid RGBA PNG via NSBitmapImageRep (no fixture files needed).
    private func minimalPNG(width: Int, height: Int) -> Data? {
        guard let rep = NSBitmapImageRep(
            bitmapDataPlanes: nil,
            pixelsWide: width,
            pixelsHigh: height,
            bitsPerSample: 8,
            samplesPerPixel: 4,
            hasAlpha: true,
            isPlanar: false,
            colorSpaceName: .deviceRGB,
            bytesPerRow: 0,
            bitsPerPixel: 0
        ) else {
            return nil
        }
        return rep.representation(using: .png, properties: [:])
    }
}
