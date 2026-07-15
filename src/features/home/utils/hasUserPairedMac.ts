const hasUserPairedMac = (
  liveHasPairedDevice: boolean,
  dbMacPaired = false,
): boolean => dbMacPaired || liveHasPairedDevice;

export default hasUserPairedMac;
