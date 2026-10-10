# Feedback

Run feedback and capability-owner inbox.

## Registry

- **Slug:** `feedback`
- **Feature path:** `src/features/feedback`
- **Lib path:** `src/lib/feedback`
- **Migration:** migrated

## Routes

_None wired in this feature folder._

## APIs

- `/api/capabilities/feedback`

## Dependencies

- `improvements`
- `capabilities`

Query: `npm run feature-knowledge:query -- "..." --feature=feedback`

## Public API

Other features import only from `public-api/presentation` (`AgentRunFeedbackForm`, `FeedbackInboxPanel`, `FeedbackSubmittedNotice`).
