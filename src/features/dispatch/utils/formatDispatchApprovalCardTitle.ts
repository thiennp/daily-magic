import { DISPATCH_APPROVAL_CARD_COPY as C } from "@/features/dispatch/dispatchApprovalCardCopy.constant";

export type DispatchApprovalCardFields = {
  readonly requester: string | null;
  readonly tool?: string | null;
  readonly computerName?: string | null;
  readonly projectFolder?: string | null;
};

/** True when the live/list payload has both tool and computer to upgrade the card. */
export const hasRichDispatchApprovalCard = (
  fields: Pick<DispatchApprovalCardFields, "tool" | "computerName">,
): boolean => {
  const tool = fields.tool?.trim() ?? "";
  const computer = fields.computerName?.trim() ?? "";
  return tool.length > 0 && computer.length > 0;
};

/** Pure: card title — rich when tool+computer present, else S0-2 default. */
export const formatDispatchApprovalCardTitle = (
  fields: DispatchApprovalCardFields,
): string => {
  if (!hasRichDispatchApprovalCard(fields)) {
    return C.title;
  }
  const tool = fields.tool!.trim();
  const computer = fields.computerName!.trim();
  const name = fields.requester?.trim() ?? "";
  const template =
    name.length > 0 ? C.richTitle : C.richTitleNoRequester;
  return template
    .replace("{requester}", name)
    .replace("{tool}", tool)
    .replace("{computer}", computer);
};

/** Pure: optional folder line when projectFolder is non-empty. */
export const formatDispatchApprovalFolderLine = (
  projectFolder: string | null | undefined,
): string | null => {
  const folder = projectFolder?.trim() ?? "";
  if (folder.length === 0) return null;
  return C.folderLine.replace("{projectFolder}", folder);
};
