export const readMessengerJson = async (
  response: Response,
): Promise<unknown | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};
