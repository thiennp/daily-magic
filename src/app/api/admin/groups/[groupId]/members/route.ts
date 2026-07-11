import { deleteGroupMember } from "@/app/api/admin/groups/[groupId]/members/deleteGroupMember";
import { getGroupMembers } from "@/app/api/admin/groups/[groupId]/members/getGroupMembers";
import { patchGroupMember } from "@/app/api/admin/groups/[groupId]/members/patchGroupMember";
import { postGroupMember } from "@/app/api/admin/groups/[groupId]/members/postGroupMember";

export async function GET(
  _request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await context.params;
  return getGroupMembers(groupId);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await context.params;
  return postGroupMember(groupId, request);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await context.params;
  return patchGroupMember(groupId, request);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await context.params;
  return deleteGroupMember(groupId, request);
}
