import { joinType as chatgpt } from "@/features/projects/access/invites/joinTypes/chatgpt";
import { joinType as claude } from "@/features/projects/access/invites/joinTypes/claude";
import { joinType as codex } from "@/features/projects/access/invites/joinTypes/codex";
import { joinType as copilot } from "@/features/projects/access/invites/joinTypes/copilot";
import { joinType as cursor } from "@/features/projects/access/invites/joinTypes/cursor";
import { joinType as customHttps } from "@/features/projects/access/invites/joinTypes/customHttps";
import { joinType as gemini } from "@/features/projects/access/invites/joinTypes/gemini";
import { joinType as grokBot } from "@/features/projects/access/invites/joinTypes/grokBot";
import { joinType as messengers } from "@/features/projects/access/invites/joinTypes/messengers";
import { joinType as mistral } from "@/features/projects/access/invites/joinTypes/mistral";
import { joinType as n8nZapier } from "@/features/projects/access/invites/joinTypes/n8nZapier";
import { joinType as openclaw } from "@/features/projects/access/invites/joinTypes/openclaw";
import { joinType as other } from "@/features/projects/access/invites/joinTypes/other";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

/**
 * Bot types on /join, in match order: first match wins, `other` is last. The
 * page index and the JSON types[] follow this order. Edit one type = edit its module.
 */
export const PROJECT_INVITE_JOIN_TYPES: readonly ProjectInviteJoinType[] = [
  grokBot,
  claude,
  chatgpt,
  cursor,
  codex,
  gemini,
  copilot,
  mistral,
  openclaw,
  n8nZapier,
  messengers,
  customHttps,
  other,
];
