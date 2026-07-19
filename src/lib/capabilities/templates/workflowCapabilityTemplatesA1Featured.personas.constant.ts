import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { FREELANCER_CLIENT_PROPOSAL_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.freelancerClientProposal.constant";
import { JOB_APPLICATION_PACK_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.jobApplicationPack.constant";
import { LOCAL_BUSINESS_GOOGLE_POST_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.localBusinessGooglePost.constant";
import { SHOP_ORDER_SUPPORT_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.shopOrderSupport.constant";
import { TEACHER_LESSON_PLAN_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.teacherLessonPlan.constant";
import { TENANT_SUPPORT_REPLY_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.tenantSupportReply.constant";
import { VIBE_CODING_APP_FEATURE_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesA1Featured.vibeCodingAppFeature.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED_PERSONAS: readonly WorkflowCapabilityTemplate[] =
  [
    VIBE_CODING_APP_FEATURE_WORKFLOW,
    JOB_APPLICATION_PACK_WORKFLOW,
    SHOP_ORDER_SUPPORT_WORKFLOW,
    FREELANCER_CLIENT_PROPOSAL_WORKFLOW,
    TEACHER_LESSON_PLAN_WORKFLOW,
    LOCAL_BUSINESS_GOOGLE_POST_WORKFLOW,
    TENANT_SUPPORT_REPLY_WORKFLOW,
  ];
