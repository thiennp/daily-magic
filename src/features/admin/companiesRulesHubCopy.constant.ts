/**
 * User-facing copy for the Companies & rules hub (/admin/groups).
 * Plain English only. Product name is AgentWitch (one word).
 */
import {
  COMPANIES_ENTITY_LABEL,
  COMPANY_ENTITY_LABEL,
  COMPANY_MEMBERS_LABEL,
  COMPANY_RULES_NAV_LABEL,
} from "@/lib/admin/companyGroupCopy.constant";

export const COMPANIES_RULES_HUB_COPY = {
  navLabel: COMPANY_RULES_NAV_LABEL,
  title: COMPANIES_ENTITY_LABEL,
  lede:
    "A company is your team's shared workspace. Here you add teammates and decide who can send tasks to this computer. Safety rules stay inside each project.",
  whatIsCompanyTip:
    "A company is the top-level workspace for your team. Projects, people and computers belong to it.",
  createHeading: "Create company",
  createBody:
    "Create a company to invite teammates and set who can send tasks to this computer.",
  companyNameLabel: "Company name",
  companyNamePlaceholder: "e.g. Infusion Labs",
  createCta: "Create company",
  joinHonestyHeading: "Joining your team's company?",
  joinHonestyBody:
    "You can't join a company yourself. Ask a company admin to add you with this email:",
  joinHonestyFollowUp: "You'll see the company here as soon as they add you.",
  copyEmail: "Copy your email",
  managingCompany: "Managing company",
  newCompany: "New company",
  companySettings: "Company settings",
  companySettingsGearAria: "Company settings",
  dispatchLegend: "When a teammate sends a task to this computer",
  dispatchSectionTitle: `${COMPANY_ENTITY_LABEL} dispatch policy`,
  dispatchTip:
    "Decides what happens when a teammate in this company sends a task to this computer.",
  approvalLabel: "Approval required",
  approvalHelper:
    "Each task waits until it is approved in the browser and on this computer.",
  approvalTip:
    "This computer is the computer connected with AgentWitch Local. Approval needs a click in the browser and a confirm on this computer.",
  openLabel: "Open dispatch",
  openHelper: "Tasks from teammates start on this computer right away.",
  changePolicy: "Change policy",
  viewPolicy: "View policy",
  savePolicy: "Save",
  savingPolicy: "Saving…",
  policySaved: "Policy saved.",
  policySaveFail: "Could not save the dispatch policy.",
  tryAgain: "Try again",
  onlyAdminsChange: "Only company admins can change this.",
  dangerZone: "Danger zone",
  deleteCompany: "Delete company",
  deleteBody:
    "Removes the company, its members and its dispatch policy. This cannot be undone.",
  deleteConfirmHint: "Projects stay with their owners. This cannot be undone.",
  membersTitle: COMPANY_MEMBERS_LABEL,
  inviteEmailPlaceholder: "name@company.com",
  inviteEmailAria: "Email",
  inviteRoleAria: "Role",
  inviteCta: "Invite",
  roleMember: "Member",
  roleAdmin: "Admin",
  roleOwner: "Owner",
  roleTip:
    "Admins can invite people, change roles and change the dispatch policy. Members can send tasks and see activity.",
  removeMemberTitle: "Remove member?",
  removeMemberConfirm: "Remove",
  runsTitle: "Recent company agent runs",
  runsEmptyTitle: "No runs yet",
  runsEmptyBody:
    "When a teammate sends a task to a company computer, it shows up here.",
  runsLoading: "Loading recent runs…",
  runsError:
    "Couldn't load recent runs. Check your connection, then try again.",
  runsRefresh: "Refresh runs",
  safetyKicker: "Safety rules",
  safetyTip:
    "Safety rules are traps assistants must avoid. Each project keeps its own list, so you edit them on the project page.",
  safetyValue: "Set per project",
  safetyBody: "Open a project to see or edit its Safety rules.",
  safetyOpenCta: "Open Safety rules",
  safetyProjectSelectAria: "Project",
  safetyNoProjects: "Create a project first to open Safety rules.",
  rulesStripTitle: "Rules",
} as const;

export type CompaniesRulesHubCopy = typeof COMPANIES_RULES_HUB_COPY;
