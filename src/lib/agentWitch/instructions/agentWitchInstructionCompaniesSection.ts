import {
  COMPANIES_ENTITY_LABEL,
  COMPANY_ENTITY_LABEL,
  COMPANY_MEMBERS_LABEL,
} from "@/lib/admin/companyGroupCopy.constant";
import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_COMPANIES_SECTION: AgentWitchInstructionSection =
  {
    id: "companies",
    title: COMPANIES_ENTITY_LABEL,
    summary: `${COMPANIES_ENTITY_LABEL} group people, dispatch rules, and shared playbooks. In the product UI a company is the top-level team — not a department.`,
    topics: [
      {
        id: "create-company",
        title: `Creating a ${COMPANY_ENTITY_LABEL.toLowerCase()}`,
        body: `An admin creates a ${COMPANY_ENTITY_LABEL.toLowerCase()} and invites members by email. New members cannot self-join an existing ${COMPANY_ENTITY_LABEL.toLowerCase()} without an invite.`,
      },
      {
        id: "member-roles",
        title: "Member roles",
        body: "Members have company roles that control admin actions such as inviting users, changing dispatch policy, or deleting the company.",
      },
      {
        id: "company-directory",
        title: "Company directory",
        body: `Home and Marketplace surface what ${COMPANY_MEMBERS_LABEL.toLowerCase()} published so you can request or run teammate playbooks.`,
      },
      {
        id: "dispatch-policy",
        title: "Who can send tasks to your Mac",
        body: "Dispatch policy controls whether teammates can run tasks on your computer immediately or must wait for your approval.",
        bullets: [
          "open — company members can dispatch without asking",
          "approval — the Mac owner must approve each dispatch",
          "inherit — use the company default",
        ],
      },
      {
        id: "policy-layers",
        title: "How policy is resolved",
        body: "Effective policy considers device override, user preference, company default, and product default. The Companies & rules screen includes a preview of which layer wins.",
      },
      {
        id: "approval-flow",
        title: "Approval flow",
        body: "When approval is required, the browser shows a dispatch approval request. The Mac owner accepts or declines before the writer CLI starts.",
      },
    ],
  };
