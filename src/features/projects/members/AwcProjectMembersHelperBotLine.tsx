"use client";

import AwcProjectMembersHelperBotClaim from "@/features/projects/members/AwcProjectMembersHelperBotClaim";
import AwcProjectMembersHelperBotControls from "@/features/projects/members/AwcProjectMembersHelperBotControls";

type Props = Parameters<typeof AwcProjectMembersHelperBotControls>[0] &
  Parameters<typeof AwcProjectMembersHelperBotClaim>[0];

/** Status + controls under an assistant row: guidance / block, then claim. */
export default function AwcProjectMembersHelperBotLine(props: Props) {
  return (
    <>
      <AwcProjectMembersHelperBotControls {...props} />
      <AwcProjectMembersHelperBotClaim {...props} />
    </>
  );
}
