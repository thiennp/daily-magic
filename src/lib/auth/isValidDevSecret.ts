const isValidDevSecret = (candidate: string | null | undefined): boolean => {
  const configuredSecret = process.env.SECRET?.trim();
  const normalizedCandidate = candidate?.trim();

  if (!configuredSecret || !normalizedCandidate) {
    return false;
  }

  return normalizedCandidate === configuredSecret;
};

export default isValidDevSecret;
