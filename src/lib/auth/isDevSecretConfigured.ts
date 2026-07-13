const isDevSecretConfigured = (): boolean => {
  const configuredSecret = process.env.SECRET;
  return (
    typeof configuredSecret === "string" && configuredSecret.trim().length > 0
  );
};

export default isDevSecretConfigured;
