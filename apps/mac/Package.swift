// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "AgentWitchLocal",
    platforms: [
        .macOS(.v13),
    ],
    products: [
        .library(name: "AgentWitchLocalCore", targets: ["AgentWitchLocalCore"]),
        .executable(name: "AgentWitchLocal", targets: ["AgentWitchLocal"]),
    ],
    targets: [
        .target(
            name: "AgentWitchLocalCore",
            path: "Sources/AgentWitchLocalCore"
        ),
        .executableTarget(
            name: "AgentWitchLocal",
            dependencies: ["AgentWitchLocalCore"],
            path: "Sources/AgentWitchLocal",
            resources: [
                .process("Resources"),
            ]
        ),
        .testTarget(
            name: "AgentWitchLocalCoreTests",
            dependencies: ["AgentWitchLocalCore"],
            path: "Tests/AgentWitchLocalCoreTests"
        ),
    ]
)
