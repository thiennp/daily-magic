import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { EMAIL_INBOX_REPLY_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.emailInboxReply";
import { FACEBOOK_PAGE_POST_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.facebookPagePost";
import { FINANCE_SHEET_QA_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.financeSheetQa";
import { DROPSHIP_PRODUCT_LISTING_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dropshipProductListing";
import { FREELANCER_CLIENT_PROPOSAL_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.freelancerClientProposal";
import { JOB_APPLICATION_PACK_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.jobApplicationPack";
import { LOCAL_BUSINESS_GOOGLE_POST_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.localBusinessGooglePost";
import { SHOP_ORDER_SUPPORT_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.shopOrderSupport";
import { TEACHER_LESSON_PLAN_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.teacherLessonPlan";
import { TENANT_SUPPORT_REPLY_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tenantSupportReply";
import { TIKTOK_SERIES_EPISODE_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tiktokSeriesEpisode";

export const WORKFLOW_A1_PART1: readonly PresetHarnessSeed[] = [
  JOB_APPLICATION_PACK_PRESET,
  SHOP_ORDER_SUPPORT_PRESET,
  FREELANCER_CLIENT_PROPOSAL_PRESET,
  TEACHER_LESSON_PLAN_PRESET,
  LOCAL_BUSINESS_GOOGLE_POST_PRESET,
  TENANT_SUPPORT_REPLY_PRESET,
  DROPSHIP_PRODUCT_LISTING_PRESET,
  TIKTOK_SERIES_EPISODE_PRESET,
  FINANCE_SHEET_QA_PRESET,
  EMAIL_INBOX_REPLY_PRESET,
  FACEBOOK_PAGE_POST_PRESET,
];
