# L6 Reports + Library copy

Product-locked EN for project layout v2 L6 Reports and Library tabs.
Constants: `projectPageReportsCopy.constant.ts`, `projectPageLibraryCopy.constant.ts`,
`projectPageLibraryActionsCopy.constant.ts`.

## Shared visibility

Member + Viewer can **see** project Library + Reports. Only the **owner** can
edit / delete / add / publish. Non-members keep the existing project 404.
Non-owners see **published-only**; drafts are owner-only.

| Key                      | Audience      | String                                                                                         |
| ------------------------ | ------------- | ---------------------------------------------------------------------------------------------- |
| `library.intro`          | all           | Playbooks, workflows, assistants, and skills for this project.                                 |
| `library.aria`           | all           | Library for this project                                                                       |
| `library.empty.owner`    | owner         | No playbooks or skills yet. Create one, or add one from another project.                       |
| `library.empty.member`   | member/viewer | Nothing in this project's library yet. The project owner adds items here.                      |
| `library.readOnlyNote`   | member/viewer | You can view this library. Only the project owner can change it.                               |
| `library.visibilityHint` | owner         | Members and viewers see published items. Drafts are visible only to you.                       |
| `library.publish.toast`  | owner         | Published. Everyone in this project can see it now.                                            |
| `reports.intro`          | all           | Finished work from this project's assistants and computers lands here.                         |
| `reports.aria`           | all           | Reports for this project                                                                       |
| `reports.empty`          | all           | No reports in this project yet. Finished work from its assistants and computers shows up here. |
| `disabled.new`           | member/viewer | Only the project owner can add items.                                                          |
| `disabled.addFrom`       | member/viewer | Only the project owner can add items.                                                          |
| `disabled.edit`          | member/viewer | Only the project owner can edit this.                                                          |
| `disabled.publish`       | member/viewer | Only the project owner can publish.                                                            |
| `disabled.delete`        | member/viewer | Only the project owner can delete this.                                                        |

Rules: disabled reason = visible helper **or** tooltip **and** `aria-describedby`;
button keeps its normal label. Non-member: no new copy. Member = Viewer copy.
