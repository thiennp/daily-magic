import Foundation

/// Classifies `GET /health`: non-2xx is `.unhealthy`; a 2xx body must carry this user's
/// `osUid` (and, if present, `installRootName`) to be `.ours`.
public func parseLocalHealthResponse(
    statusCode: Int,
    body: Data,
    expectedUid: UInt32,
    expectedInstallRootName: String = MacAppConstants.productionInstallDirName
) -> LocalHealthOwnership {
    guard (200..<300).contains(statusCode) else {
        return .unhealthy
    }
    guard let json = try? JSONSerialization.jsonObject(with: body) as? [String: Any] else {
        return .unverified
    }
    let osUid: Int?
    if let number = json["osUid"] as? NSNumber, CFGetTypeID(number) != CFBooleanGetTypeID() {
        osUid = number.intValue
    } else {
        osUid = nil
    }
    return resolveLocalHealthOwnership(
        osUid: osUid,
        installRootName: json["installRootName"] as? String,
        expectedUid: expectedUid,
        expectedInstallRootName: expectedInstallRootName
    )
}
