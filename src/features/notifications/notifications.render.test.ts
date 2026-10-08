import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import NotificationBellButton, {
  formatBellBadge,
} from "@/features/notifications/header/NotificationBellButton";
import NotificationsFilterBar from "@/features/notifications/NotificationsFilterBar";
import NotificationsItemCard from "@/features/notifications/NotificationsItemCard";
import NotificationsLoadError from "@/features/notifications/NotificationsLoadError";
import NotificationsOlderSection from "@/features/notifications/NotificationsOlderSection";
import NotificationsPageFooter from "@/features/notifications/NotificationsPageFooter";
import NotificationsSignedOutView from "@/features/notifications/NotificationsSignedOutView";
import NotificationsSkeleton from "@/features/notifications/NotificationsSkeleton";
import { subtitleText } from "@/features/notifications/NotificationsPageSubtitle";
import {
  NOTIFICATIONS_DEMO_ITEMS,
  type NotificationItem,
} from "@/features/notifications/notificationsDemoItems.constant";
import { countPendingApprovals } from "@/features/notifications/notificationsSelectors";

const noop = () => undefined;
const find = (id: string): NotificationItem => {
  const item = NOTIFICATIONS_DEMO_ITEMS.find((i) => i.id === id);
  if (!item) throw new Error(id);
  return item;
};
const card = (item: NotificationItem) =>
  renderToStaticMarkup(
    createElement(NotificationsItemCard, {
      item,
      onDecide: noop,
      onMarkRead: noop,
    }),
  );

describe("notifications render", () => {
  it("renders Also on / Also in links on approval cards", () => {
    expect(card(find("r1"))).toContain("Also on");
    expect(card(find("r1"))).toContain("This computer");
    const join = card(find("j1"));
    expect(join).toContain("Also in");
    expect(join).toContain("infusion");
    expect(join).toContain("› Access");
  });

  it("renders done lines and timed-out copy", () => {
    const run = {
      ...find("r1"),
      state: "approved",
      doneAtLabel: "just now",
    } as NotificationItem;
    expect(card(run)).toContain(
      "Approved by you just now. It is running on This computer.",
    );
    const denied = {
      ...find("r1"),
      state: "denied",
      doneAtLabel: "just now",
    } as NotificationItem;
    expect(card(denied)).toContain("Denied by you just now. Nothing ran.");
    expect(card(find("j3"))).toContain("Jonas Weber can now open infusion.");
    expect(card(find("r2"))).toContain(
      "Nobody answered within 30 min, so it stopped at 02:30. Nothing ran.",
    );
  });

  it("labels actions and shows unread dot", () => {
    const html = card(find("j1"));
    expect(html).toContain(
      'aria-label="Approve: Maya Chen asked to join infusion"',
    );
    expect(html).toContain(
      'aria-label="Deny: Maya Chen asked to join infusion"',
    );
    expect(html).toContain(
      'aria-label="Mark as read: Maya Chen asked to join infusion"',
    );
    expect(html).toContain("notifications-unread-dot");
    expect(html).toContain("Unread.");
  });

  it("filter bar is a group of pressed buttons with counts", () => {
    const html = renderToStaticMarkup(
      createElement(NotificationsFilterBar, {
        activeFilter: "all",
        onFilterChange: noop,
        counts: { all: 12, unread: 5, approvals: 3 },
      }),
    );
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Filter notifications"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).not.toContain('role="tab');
    expect(html).toContain("(3)");
    expect(html).toContain('data-warn="true"');
  });
});
