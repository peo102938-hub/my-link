"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";

interface TopAppBarProps {
  displayName: string;
  onShowToast: (message: string) => void;
}

export function TopAppBar({ displayName, onShowToast }: TopAppBarProps) {
  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const success = await copyToClipboard(url);
      if (success) {
        onShowToast("링크를 복사했어요");
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full max-w-lg bg-[#f9fafb]/90 backdrop-blur-md border-b border-[#e5e8eb] px-5 h-14 flex items-center justify-between">
      <span className="text-[17px] font-bold tracking-tight text-[#191f28]">
        {displayName}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="rounded-full text-[13px] font-semibold text-[#4e5968] hover:text-[#191f28] hover:bg-[#f2f4f6] active:bg-[#e5e8eb] active:scale-95 transition-all cursor-pointer h-8 px-3"
        aria-label="링크 공유하기"
      >
        <Share2 className="w-4 h-4 mr-1.5" />
        <span>공유</span>
      </Button>
    </header>
  );
}
