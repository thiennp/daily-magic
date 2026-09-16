import { type Page } from "@playwright/test";

export const signInTestAccount = async (
  page: Page,
  email: string,
): Promise<void> => {
  const response = await page.request.post("/api/auth/test-login", {
    data: { email },
  });

  if (!response.ok()) {
    throw new Error(
      `test-login failed for ${email}: ${response.status()} ${await response.text()}`,
    );
  }
};

export const saveAuthStorageState = async (
  page: Page,
  filePath: string,
): Promise<void> => {
  await page.context().storageState({ path: filePath });
};
