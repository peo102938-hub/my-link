"use client";

import { Check } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-[#191f28]/95 backdrop-blur-md text-white text-[14px] font-medium shadow-[0_8px_24px_rgba(25,31,40,0.18)]">
        <span className="w-5 h-5 rounded-full bg-[#00b569] text-white flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 stroke-[3]" />
        </span>
        <span className="tracking-tight">{message}</span>
      </div>
    </div>
  );
}
