# Tasks tab: the Planned group

Design note (Product). Plan items are intentions that are not work yet; they turn into tasks through `planItemId`.

## Model

- A plan item is a task with status `planned`. It has no owner requirement and no start time.
- Starting a plan item creates (or moves) a task with `planItemId` pointing at it and status `in_progress`; the plan item keeps its row so you can see what became of it.
- A plan item can be started by anyone who can write to the project; the starter becomes the owner.

## List

- A **Planned** group sits under the active groups, collapsed by default when there are more than five items, with a count (`Planned 12`).
- Order inside the group: priority (p0 first), then oldest created.
- Each row shows title, one-line description, priority chip, and a **Start** button. No status chip (it is always Planned).
- Planned items never count toward the open-task badge on the Tasks tab.

## Detail

- Planned item: title, description, priority, who created it, **Start**, **Cancel**.
- Started item: a link "Started as {task}" and, on the task, "From plan: {title}".

## Rules

- A plan item with unfinished `dependsOn` shows "Waits on {title}" and cannot be started until they are done.
- Plan items obey the same 200 character description cap as tasks.
- Cancelled plan items disappear from the group and stay in history.

## Not now

- Drag to reorder, plan items with sub-tasks, and capacity planning.
