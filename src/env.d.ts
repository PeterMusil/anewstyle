/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.css";
declare module "*.scss";

declare module "@fancyapps/ui" {
  export const Fancybox: {
    bind: (selector: string, options?: Record<string, unknown>) => void;
  };
}

interface Window {
  __fancyboxBound?: boolean;
}

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    command?: string;
    commandfor?: string;
    popovertarget?: string;
    popovertargetaction?: string;
  }

  interface ButtonHTMLAttributes {
    command?: string;
    commandfor?: string;
    popovertarget?: string;
    popovertargetaction?: string;
  }
}
