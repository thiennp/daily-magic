/**
 * A project task changed (status / owner / priority). Sent to the agents and
 * bots it affects; wakes them like any normal kind. Never sent to the actor.
 */
export const PROJECT_MESSAGE_KIND_TASK_UPDATED = "task.updated";
