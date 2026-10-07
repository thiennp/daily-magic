import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

/** Title + body for the missing-computer Connect guide. */
export default function HomeConnectGuideHeroCopy(input: {
  readonly isLocalAppInstalled: boolean;
}) {
  return (
    <>
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>
        {MAC_WORKER_BENEFIT_COPY.setupEyebrow}
      </p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-awc-fg dark:text-white/90">
        {input.isLocalAppInstalled
          ? MAC_WORKER_BENEFIT_COPY.setupTitleAppReady
          : MAC_WORKER_BENEFIT_COPY.setupTitle}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {input.isLocalAppInstalled
          ? MAC_WORKER_BENEFIT_COPY.setupDescriptionAppReady
          : MAC_WORKER_BENEFIT_COPY.setupDescription}
      </p>
    </>
  );
}
