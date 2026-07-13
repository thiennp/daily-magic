import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { APP_SURFACE_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface LocalTerminalPreProps extends ComponentPropsWithoutRef<"pre"> {
  readonly children: ReactNode;
}

const LocalTerminalPre = forwardRef<HTMLPreElement, LocalTerminalPreProps>(
  ({ children, className, ...rest }, ref) => (
    <pre
      ref={ref}
      className={twMerge(APP_SURFACE_TERMINAL_PRE_CLASS, className)}
      {...rest}
    >
      {children}
    </pre>
  ),
);

LocalTerminalPre.displayName = "LocalTerminalPre";

export default LocalTerminalPre;
