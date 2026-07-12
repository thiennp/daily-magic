import type { DispatchTargetGroup } from "@/features/dispatch/hooks/useDispatchTargets";

export const demoDispatchGroups: readonly DispatchTargetGroup[] = [
  {
    groupId: "group-demo-product",
    groupName: "Product team",
    dispatchPolicy: "approval",
    members: [
      {
        userId: "user-demo-jordan",
        email: "jordan@example.com",
        name: "Jordan Lee",
        isPaired: true,
        isOnline: true,
        capabilities: [
          {
            id: "cap-demo-jordan-research",
            ownerUserId: "user-demo-jordan",
            type: "agent",
            name: "Research assistant",
            description: "Finds sources and writes short briefs.",
            exampleRequest: "Research competitors for our onboarding flow.",
            visibility: "group",
            workflowFields: [],
          },
          {
            id: "cap-demo-jordan-invoice",
            ownerUserId: "user-demo-jordan",
            type: "workflow",
            name: "Invoice check",
            description: "Validates invoice PDFs against our checklist.",
            exampleRequest: "Check this invoice before approval.",
            visibility: "group",
            workflowFields: [
              {
                key: "vendor",
                label: "Vendor name",
                type: "text",
                required: true,
              },
            ],
          },
        ],
      },
      {
        userId: "user-demo-sam",
        email: "sam@example.com",
        name: "Sam Rivera",
        isPaired: true,
        isOnline: false,
        capabilities: [
          {
            id: "cap-demo-sam-assistant",
            ownerUserId: "user-demo-sam",
            type: "agent",
            name: "Ops assistant",
            description: "Helps with spreadsheets and file cleanup.",
            exampleRequest: "Organize downloads folder by date.",
            visibility: "group",
            workflowFields: [],
          },
        ],
      },
    ],
  },
];
