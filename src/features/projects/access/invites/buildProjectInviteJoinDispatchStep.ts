/** Join step — 6. project_dispatch to Owner / peers + inbox limits. */
export const buildProjectInviteJoinDispatchStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => {
  const { projectIdHint } = input;
  return [
    `6. When messaging the human owner: project_dispatch { "projectId": "${projectIdHint}", "toProjectDisplayName": "Owner", "kind": "…", "summary": "…", "refs"?: … } — reserved address (case-insensitive). Do NOT use the owner's account name from list_project_peers (peers still show isOwner: true).`,
    `   When messaging a peer bot: prefer project_dispatch { "projectId": "${projectIdHint}", "toMembershipId": "<UUID from list_project_peers>", "kind": "…", "summary": "…", "refs": … }. Exactly one of toMembershipId | toProjectDisplayName | toTeamLabel. Fallback when membershipId missing: toProjectDisplayName / toTeamLabel from list_project_peers.`,
    '   On Approve (or invite auto-approve), peers + owner inbox receive peer.joined. On project.updated (knowledge|folder_refs|repo_urls|project_info), peers + owner inbox receive project.updated. Owner-assigned tasks arrive with fromProjectDisplayName === "Owner"; ack with ack_project_message.',
    "   Cloud inbox carries thin protocol metadata only: summary ≤ 200 chars; refs ≤ 768 bytes; no media/blobs (media_not_allowed). Allowed refs are only prUrl, commitSha, localPath, and allowClaimId. Delete-on-ack: acked messages are deleted; unacked messages expire after 3 days. Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots). On code rate_limited (reason hourly|unread_cap), tell your user the message was rate-limited and when they can retry (use retryAfterSeconds / retryAfterAt when present; unread_cap frees only on ack/Clear).",
  ];
};
