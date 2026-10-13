"use client";

import { useState } from "react";
import { useProfileStorage } from "@/hooks/useProfileStorage";
import { TopAppBar } from "@/components/profile/TopAppBar";
import { HeroCard } from "@/components/profile/HeroCard";
import { QuickActions } from "@/components/profile/QuickActions";
import { LinkCardList } from "@/components/profile/LinkCardList";
import { TechStacks } from "@/components/profile/TechStacks";
import { SocialBar } from "@/components/profile/SocialBar";
import { Footer } from "@/components/profile/Footer";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { Toast } from "@/components/ui/Toast";

export default function Home() {
  const { data, isLoading } = useProfileStorage();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#191f28] flex flex-col items-center">
      {/* 1. 상단 고정 앱 바 (PAGE-02) */}
      <TopAppBar
        displayName={data?.displayName ?? "마이링크"}
        onShowToast={showToast}
      />

      {/* 2. 메인 콘텐츠 (PAGE-01 Mobile-First 520px 중앙 정렬) */}
      {isLoading || !data ? (
        <ProfileSkeleton />
      ) : (
        <main className="w-full max-w-lg px-5 pt-6 pb-12 flex flex-col gap-4">
          {/* 프로필 히어로 카드 (PAGE-03) */}
          <HeroCard
            displayName={data.displayName}
            role={data.role}
            bio={data.bio}
            avatarText={data.avatarText}
            avatarUrl={data.avatarUrl}
          />

          {/* 빠른 액션 바 (PAGE-04) */}
          <QuickActions
            email={data.email}
            resumeUrl={data.resumeUrl}
            onShowToast={showToast}
          />

          {/* 주요 링크 카드 리스트 (PAGE-05) */}
          <LinkCardList links={data.links} />

          {/* 기술 스택 / 태그 칩 (PAGE-06) */}
          <TechStacks stacks={data.stacks} />

          {/* 소셜 아이콘 바 (PAGE-07) */}
          <SocialBar socials={data.socials} />

          {/* 바텀 푸터 (PAGE-08) */}
          <Footer />
        </main>
      )}

      {/* 하단 토스트 알림 (PRD 4.3 사양) */}
      <Toast message={toastMessage} />
    </div>
  );
}
