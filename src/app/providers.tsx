"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { useEngagementWatcher } from "@/hooks/use-user-engaged";

/** Site-wide client providers. Auth (Supabase) and toasts are scoped to the pages that use them. */
export function Providers({ children }: { children: ReactNode }) {
  useEngagementWatcher();
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}
