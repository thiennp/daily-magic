import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const JOB_APPLICATION_PACK_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "job-application-pack-operator-job-posting",
      title: "Open the job posting and confirm facts",
      content: [
        "1. Open jobPostingUrl or paste jobDescription so requirements are visible.",
        "2. Skim must-have skills and flag anything missing from resumeFolderPath.",
        "3. Reply ready when targetRole and companyName are correct.",
      ].join("\n"),
    },
    {
      id: "job-application-pack-operator-approve",
      title: "Approve resume bullets and cover letter",
      content: [
        "1. Review tailored resume changes and cover letter for accuracy.",
        "2. Reject invented employers, dates, or skills you cannot defend.",
        "3. Reply approve when you are ready to submit the application.",
      ].join("\n"),
    },
    {
      id: "job-application-pack-operator-submit",
      title: "Submit the application yourself",
      content: [
        "1. Upload or paste the approved materials into the employer portal.",
        "2. The agent does not submit applications on your behalf.",
        "3. Ask the agent to log this application in applicationHistoryPath.",
      ].join("\n"),
    },
  ];
