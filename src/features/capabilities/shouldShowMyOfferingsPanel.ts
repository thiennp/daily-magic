const shouldShowMyOfferingsPanel = (
  groupCount: number,
  userCreatedCapabilityCount: number,
): boolean => groupCount > 0 && userCreatedCapabilityCount > 0;

export default shouldShowMyOfferingsPanel;
