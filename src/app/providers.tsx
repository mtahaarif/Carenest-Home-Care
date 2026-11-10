"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <AuthProvider>
        <SmoothScroll>
          {children}
          <Toaster />
          <Sonner />
        </SmoothScroll>
      </AuthProvider>
    </TooltipProvider>
  );
}
