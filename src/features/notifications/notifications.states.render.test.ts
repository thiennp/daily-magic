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

describe("notifications render (states)", () => {
  it("covers loading, error, older, signed-out, footer", () => {
    expect(
      renderToStaticMarkup(createElement(NotificationsSkeleton)),
    ).toContain('aria-busy="true"');
    expect(
      renderToStaticMarkup(
        createElement(NotificationsLoadError, { onRetry: noop }),
      ),
    ).toContain("Check your connection, then try again. Nothing was lost.");
    const older = (state: "idle" | "loading" | "error" | "done") =>
      renderToStaticMarkup(
        createElement(NotificationsOlderSection, { state, onLoad: noop }),
      );
    expect(older("idle")).toContain("Show older");
    expect(older("loading")).toContain("Loading older notifications…");
    expect(older("error")).toContain("Could not load older notifications");
    expect(older("done")).toContain(
      "That is everything from the last 30 days.",
    );
    const out = renderToStaticMarkup(createElement(NotificationsSignedOutView));
    expect(out).toContain("Download AgentWitch Local");
    expect(out).toContain("(opens in a new tab)");
    expect(
      renderToStaticMarkup(createElement(NotificationsPageFooter)),
    ).toContain("Want fewer emails?");
  });

  it("builds subtitle, counts and bell badge", () => {
    expect(subtitleText(5, 2)).toBe("5 unread · 2 waiting for your approval");
    expect(subtitleText(0, 0)).toBe("Nothing unread");
    expect(countPendingApprovals(NOTIFICATIONS_DEMO_ITEMS)).toBeGreaterThan(0);
    expect(formatBellBadge(12)).toBe("9+");
    const bell = renderToStaticMarkup(
      createElement(NotificationBellButton, {
        unreadCount: 12,
        pendingCount: 3,
        isOpen: false,
        onClick: noop,
      }),
    );
    expect(bell).toContain(
      'aria-label="Notifications, 12 unread, 3 waiting for approval"',
    );
    expect(bell).toContain('aria-expanded="false"');
    expect(bell).toContain("9+");
  });
});
