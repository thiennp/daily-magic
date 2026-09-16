import EmptyStatePanel from "@/features/empty-states/EmptyStatePanel";
import {
  CREATE_FREE_ACCOUNT_HREF,
  buildSignInHref,
  marketplaceFreeStartersSectionHref,
} from "@/features/empty-states/buildGuestAuthHrefs";
import { MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY } from "@/features/empty-states/signedOutPageEmptyCopy.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export function MarketplaceFreeStartersGuestEmptyPanel() {
  return (
    <EmptyStatePanel
      density="section"
      title="No free starters right now"
      body="Check back soon, or create an account to build your own from New task."
      primaryCta={{
        label: "Create free account",
        href: CREATE_FREE_ACCOUNT_HREF,
      }}
      secondaryCta={{ label: "See showcases", href: "/showcases" }}
    />
  );
}

export function MarketplaceFreeStartersSignedInEmptyPanel() {
  return (
    <EmptyStatePanel
      density="section"
      title="No free starters right now"
      body="Check back soon, or build your own from New task."
      primaryCta={{
        label: "New task",
        href: buildAgentComposerHref({ customTask: true }),
      }}
      secondaryCta={{ label: "See showcases", href: "/showcases" }}
    />
  );
}

export function MarketplaceTeammatesGuestEmptyPanel() {
  return (
    <EmptyStatePanel
      density="section"
      title={MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY.title}
      body="Shared workflows from your organization show up here after you sign in."
      primaryCta={{
        label: MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY.primaryCtaLabel,
        href: buildSignInHref("/marketplace"),
      }}
      secondaryCta={{
        label: MARKETPLACE_TEAMMATES_GUEST_EMPTY_COPY.secondaryCtaLabel,
        href: CREATE_FREE_ACCOUNT_HREF,
      }}
    />
  );
}

export function MarketplaceTeammatesTeamEmptyPanel() {
  return (
    <EmptyStatePanel
      density="section"
      title="No teammate listings yet"
      body="When teammates share workflows with your organization, they appear here."
      primaryCta={{
        label: "Browse free starters",
        href: marketplaceFreeStartersSectionHref(),
      }}
      secondaryCta={{
        label: "New task",
        href: buildAgentComposerHref({ customTask: true }),
      }}
    />
  );
}

export function MarketplaceTeammatesSoloUpsellPanel() {
  return (
    <EmptyStatePanel
      density="section"
      title="Working with a team?"
      body="Shared listings show up here when you use Agent Witch with teammates — shared runners and named approvers. For now, browse free starters or build your own."
      primaryCta={{
        label: "Browse free starters",
        href: marketplaceFreeStartersSectionHref(),
      }}
      secondaryCta={{
        label: "New task",
        href: buildAgentComposerHref({ customTask: true }),
      }}
    />
  );
}
