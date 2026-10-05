import Foundation

/// Compares the `/health` identity with this process's uid and expected install root.
/// Missing `osUid` (older AWL bundle) is `.unverified`, never `.ours`.
/// `installRootName` is checked only when present.
public func resolveLocalHealthOwnership(
    osUid: Int?,
    installRootName: String?,
    expectedUid: UInt32,
    expectedInstallRootName: String = MacAppConstants.productionInstallDirName
) -> LocalHealthOwnership {
    guard let osUid else {
        return .unverified
    }
    guard osUid == Int(expectedUid) else {
        return .foreign
    }
    if let installRootName, installRootName != expectedInstallRootName {
        return .foreign
    }
    return .ours
}
