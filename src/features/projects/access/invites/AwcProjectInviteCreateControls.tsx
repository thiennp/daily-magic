import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcBotToBotSupportList from "@/features/projects/access/invites/AwcBotToBotSupportList";
import {
  AWC_PROJECT_INVITE_PLATFORM_COPY,
  AWC_PROJECT_INVITE_PLATFORMS,
} from "@/features/projects/access/invites/awcProjectInvitePlatformCopy.constant";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

interface AwcProjectInviteCreateControlsProps {
  readonly onCreate: (platform: ProjectInvitePlatform) => void;
}

/** Create invite: one button per platform, plus the bot-to-bot support list. */
export default function AwcProjectInviteCreateControls({
  onCreate,
}: AwcProjectInviteCreateControlsProps) {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {AWC_PROJECT_INVITE_PLATFORMS.map((platform) => (
          <button
            key={platform}
            type="button"
            data-invite-platform={platform}
            className={AWC_PROJECT_ACCESS_CTA.primary}
            onClick={() => onCreate(platform)}
          >
            {AWC_PROJECT_INVITE_PLATFORM_COPY[platform].create}
          </button>
        ))}
      </div>
      <AwcBotToBotSupportList />
    </div>
  );
}
