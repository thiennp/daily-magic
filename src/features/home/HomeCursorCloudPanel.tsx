"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectCursorCloudCard from "@/features/home/ConnectCursorCloudCard";

/** Design Cursor Cloud card on signed-in Home (not a Devices rail). */
export default function HomeCursorCloudPanel() {
  return (
    <AppPanel as="section" aria-labelledby="home-cursor-cloud-heading">
      <h2
        id="home-cursor-cloud-heading"
        className={APP_SURFACE_SECTION_TITLE_CLASS}
      >
        Cursor Cloud
      </h2>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Lets bots send tasks to Cursor Cloud.
      </p>
      <div className="mt-4">
        <ConnectCursorCloudCard />
      </div>
    </AppPanel>
  );
}
