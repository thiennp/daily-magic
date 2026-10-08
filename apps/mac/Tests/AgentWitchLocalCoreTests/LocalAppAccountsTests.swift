import XCTest
@testable import AgentWitchLocalCore

final class LocalAppAccountsTests: XCTestCase {
    var tempDir: URL!
    
    override func setUp() {
        super.setUp()
        tempDir = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try? FileManager.default.createDirectory(at: tempDir, withIntermediateDirectories: true)
    }
    
    override func tearDown() {
        try? FileManager.default.removeItem(at: tempDir)
        super.tearDown()
    }
    
    func testReadLocalAppAccountsFilePorts() throws {
        // missing file
        XCTAssertEqual(readLocalAppAccountsFilePorts(installDir: tempDir), [:])
        
        let accountsFile = tempDir.appendingPathComponent("local-app-accounts.json")
        let jsonStr = """
        {
            "accounts": [
                { "email": " alice@example.com ", "port": 12345 },
                { "email": "BOB@example.com", "port": 0 },
                { "email": "charlie@example.com", "port": 65536 },
                { "email": "", "port": 11111 },
                { "email": "dave@example.com", "port": 50000 }
            ]
        }
        """
        try jsonStr.write(to: accountsFile, atomically: true, encoding: .utf8)
        
        let ports = readLocalAppAccountsFilePorts(installDir: tempDir)
        XCTAssertEqual(ports, [
            "alice@example.com": 12345,
            "dave@example.com": 50000
        ])
    }
    
    func testListLocalAppAccounts() throws {
        let profilesDir = tempDir.appendingPathComponent("profiles")
        try FileManager.default.createDirectory(at: profilesDir, withIntermediateDirectories: true)
        
        // Profile without config.json (should be ignored)
        try FileManager.default.createDirectory(at: profilesDir.appendingPathComponent("ignored@example.com"), withIntermediateDirectories: true)
        
        // Profile with config.json
        let profile1 = profilesDir.appendingPathComponent("Alice@example.com ")
        try FileManager.default.createDirectory(at: profile1, withIntermediateDirectories: true)
        try "{}".write(to: profile1.appendingPathComponent("config.json"), atomically: true, encoding: .utf8)
        
        let profile2 = profilesDir.appendingPathComponent("eve@example.com")
        try FileManager.default.createDirectory(at: profile2, withIntermediateDirectories: true)
        try "{}".write(to: profile2.appendingPathComponent("config.json"), atomically: true, encoding: .utf8)
        
        let accountsFile = tempDir.appendingPathComponent("local-app-accounts.json")
        let jsonStr = """
        {
            "accounts": [
                { "email": "alice@example.com", "port": 12345 },
                { "email": "BOB@example.com", "port": 20000 }
            ]
        }
        """
        try jsonStr.write(to: accountsFile, atomically: true, encoding: .utf8)
        
        let accounts = listLocalAppAccounts(installDir: tempDir)
        XCTAssertEqual(accounts.count, 3)
        
        XCTAssertEqual(accounts[0].email, "alice@example.com")
        XCTAssertEqual(accounts[0].port, 12345)
        
        XCTAssertEqual(accounts[1].email, "bob@example.com")
        XCTAssertEqual(accounts[1].port, 20000)
        
        XCTAssertEqual(accounts[2].email, "eve@example.com")
        XCTAssertEqual(accounts[2].port, nil)
    }
    
    func testResolveSelectedAccountEmail() {
        let accounts = [
            LocalAppAccount(email: "alice@example.com", port: 100),
            LocalAppAccount(email: "bob@example.com", port: 200)
        ]
        
        // Signed out -> nil
        XCTAssertNil(resolveSelectedAccountEmail(selected: "alice@example.com", activeProfileEmail: nil, accounts: accounts))
        
        // Valid selected wins
        XCTAssertEqual(
            resolveSelectedAccountEmail(selected: " bOB@example.com ", activeProfileEmail: "alice@example.com", accounts: accounts),
            "bob@example.com"
        )
        
        // Unknown selected falls back to active
        XCTAssertEqual(
            resolveSelectedAccountEmail(selected: "unknown@example.com", activeProfileEmail: " ALICE@example.com ", accounts: accounts),
            "alice@example.com"
        )
        
        // Empty selected falls back to active
        XCTAssertEqual(
            resolveSelectedAccountEmail(selected: "   ", activeProfileEmail: "alice@example.com", accounts: accounts),
            "alice@example.com"
        )
    }
}
