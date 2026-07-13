import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import {
  APP_SURFACE_HERO_BRAND_CLASS,
  APP_SURFACE_HERO_NEUTRAL_CLASS,
  APP_SURFACE_HERO_PLAIN_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

const HERO_VARIANT_CLASS_NAME = {
  neutral: APP_SURFACE_HERO_NEUTRAL_CLASS,
  brand: APP_SURFACE_HERO_BRAND_CLASS,
  plain: APP_SURFACE_HERO_PLAIN_CLASS,
} as const;

interface AppHeroProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly variant?: keyof typeof HERO_VARIANT_CLASS_NAME;
}

export default function AppHero({
  children,
  className,
  variant = "neutral",
}: AppHeroProps) {
  return (
    <section className={twMerge(HERO_VARIANT_CLASS_NAME[variant], className)}>
      {children}
    </section>
  );
}
