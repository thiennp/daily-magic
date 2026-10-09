"use client";

import AwcProjectMembersHelperBotControls from "@/features/projects/members/AwcProjectMembersHelperBotControls";
import AwcProjectMembersHelperBotManage from "@/features/projects/members/AwcProjectMembersHelperBotManage";

type Props = Parameters<typeof AwcProjectMembersHelperBotControls>[0] &
  Parameters<typeof AwcProjectMembersHelperBotManage>[0] & {
    /** Align under a row that has a leading chevron. */
    readonly indent?: boolean;
  };

/** Under an assistant row: status chips, then one Manage disclosure. */
export default function AwcProjectMembersHelperBotLine({
  indent = false,
  ...props
}: Props) {
  return (
    <div
      className={`flex flex-col gap-1.5 pb-2 pr-3.5 empty:hidden ${indent ? "pl-[2.75rem]" : "pl-3.5"}`}
    >
      <AwcProjectMembersHelperBotControls {...props} />
      <AwcProjectMembersHelperBotManage {...props} />
    </div>
  );
}
