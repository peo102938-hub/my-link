"use client";

import { Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";

interface QuickActionsProps {
  email: string;
  resumeUrl?: string | null;
  onShowToast: (message: string) => void;
}

export function QuickActions({
  email,
  resumeUrl,
  onShowToast,
}: QuickActionsProps) {
  const handleCopyEmail = async () => {
    const success = await copyToClipboard(email);
    if (success) {
      onShowToast("이메일 주소를 복사했어요");
    }
  };

  return (
    <section className="grid grid-cols-2 gap-2.5">
      {/* 이메일 복사 버튼 (보조 액션) */}
      <Button
        type="button"
        variant="outline"
        onClick={handleCopyEmail}
        className="h-12 rounded-[16px] border-[#e5e8eb] bg-white text-[#191f28] hover:bg-[#f2f4f6] active:scale-[0.98] text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_1px_3px_rgba(25,31,40,0.02)] transition-all cursor-pointer"
        aria-label="이메일 주소 복사하기"
      >
        <Mail className="w-4 h-4 text-[#4e5968]" />
        <span>이메일 복사</span>
      </Button>

      {/* 이력서 보기 버튼 (Primary CTA) */}
      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full"
        >
          <Button
            type="button"
            className="w-full h-12 rounded-[16px] bg-[#3182f6] hover:bg-[#1b64da] text-white active:scale-[0.98] text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(49,130,246,0.2)] transition-all cursor-pointer"
            aria-label="이력서 새 탭에서 보기"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>이력서 보기</span>
          </Button>
        </a>
      ) : (
        <Button
          type="button"
          disabled
          className="h-12 rounded-[16px] bg-[#f2f4f6] text-[#b0b8c1] text-[14px] font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <FileText className="w-4 h-4" />
          <span>이력서 준비 중</span>
        </Button>
      )}
    </section>
  );
}
