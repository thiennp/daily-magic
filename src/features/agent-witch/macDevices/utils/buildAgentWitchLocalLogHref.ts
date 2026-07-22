const buildAgentWitchLocalLogHref = (input: {
  readonly wakePort: number;
  readonly displayName: string;
}): string => {
  const params = new URLSearchParams({
    port: String(input.wakePort),
    name: input.displayName,
  });

  return `/local?${params.toString()}`;
};

export default buildAgentWitchLocalLogHref;
