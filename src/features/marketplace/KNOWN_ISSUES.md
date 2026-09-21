# Marketplace — known issues

| ID              | Symptom                                                                                   | Fix / test                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| MARKETPLACE-001 | After install, primary button still showed clickable "Installed"                          | Success panel replaces install form; `resolveMarketplaceInstallEligibility.test.ts`                                           |
| MARKETPLACE-002 | Offline / recent Mac: Install stuck on "Installing…", `/api/marketplace/install` HTTP 500 | Require live dispatch before install; 409 + UI error; component slug upsert; `validateMarketplaceInstallTargetOnline.test.ts` |
