# Workflow builder — known issues

| ID            | Symptom                                                                                                | Fix / test                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| WORKFLOWS-001 | Workflow inputs were caption paragraphs beside unnamed textboxes, so the fields had no accessible name | `WorkflowTaskFieldBlock` uses `<label htmlFor>`; `WorkflowTaskFieldBlock.test.ts`                                                     |
| WORKFLOWS-002 | Freelancer “Portfolio folder on your Mac” was a hidden project field filled with the project folder    | Field type is `text`; the operator types the portfolio path; `workflowCapabilityTemplatesA1Featured.freelancerClientProposal.test.ts` |
