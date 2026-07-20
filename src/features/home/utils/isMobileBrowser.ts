const MOBILE_USER_AGENT_PATTERN =
  /android|iphone|ipad|ipod|mobile|webos|blackberry|opera mini|iemobile/i;

const isMobileBrowser = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const navigatorWithUserAgentData = navigator as Navigator & {
    readonly userAgentData?: { readonly mobile?: boolean };
  };

  if (navigatorWithUserAgentData.userAgentData?.mobile === true) {
    return true;
  }

  return MOBILE_USER_AGENT_PATTERN.test(navigator.userAgent);
};

export default isMobileBrowser;
