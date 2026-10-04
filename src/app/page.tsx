"use client";

import { useState } from "react";

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  url: string;
  icon: string;
}

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("링크를 복사했어요");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("gildong@example.com");
    showToast("이메일 주소를 복사했어요");
  };

  const links: LinkItem[] = [
    {
      id: "portfolio",
      title: "포트폴리오",
      subtitle: "진행했던 주요 프로젝트와 작업물이에요",
      badge: "추천",
      url: "https://github.com",
      icon: "💼",
    },
    {
      id: "github",
      title: "GitHub",
      subtitle: "오픈소스 기여와 개발 기록을 볼 수 있어요",
      url: "https://github.com",
      icon: "🐙",
    },
    {
      id: "blog",
      title: "기술 블로그",
      subtitle: "웹 성능 최적화와 프론트엔드 이야기를 써요",
      url: "https://velog.io",
      icon: "✍️",
    },
    {
      id: "resume",
      title: "이력서",
      subtitle: "상세한 기술 스택과 경력 사항이에요",
      url: "#resume",
      icon: "📄",
    },
  ];

  const stacks = ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "UI/UX"];

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#191f28] flex flex-col items-center">
      {/* 1. TOP APP BAR (56px) */}
      <header className="sticky top-0 z-20 w-full max-w-lg bg-[#f9fafb]/90 backdrop-blur-md border-b border-[#e5e8eb] px-5 h-14 flex items-center justify-between">
        <span className="text-[17px] font-bold tracking-tight text-[#191f28]">
          홍길동
        </span>
        <button
          onClick={handleShare}
          className="p-2 -mr-2 rounded-full hover:bg-[#f2f4f6] active:bg-[#e5e8eb] transition-colors cursor-pointer text-[#4e5968]"
          aria-label="공유하기"
          title="공유하기"
        >
          {/* Share Icon */}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </header>

      {/* 2. MAIN CONTENT CONTAINER (Mobile-First single column, max-w-lg) */}
      <main className="w-full max-w-lg px-5 pt-7 pb-36 flex flex-col gap-5">
        
        {/* PROFILE HERO CARD */}
        <section className="bg-white rounded-[24px] border border-[#e5e8eb] p-6 shadow-[0_2px_8px_rgba(25,31,40,0.03)]">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#e8f3ff] text-[#3182f6] font-bold text-2xl flex items-center justify-center shrink-0 border border-[#d1e6ff]">
              홍
            </div>
            <div>
              {/* Status Chip */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e8f3ff] text-[#3182f6] text-xs font-semibold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3182f6]" />
                <span>함께 일할 기회를 열어두고 있어요</span>
              </div>
              <h1 className="text-[22px] font-bold text-[#191f28] tracking-tight">
                홍길동
              </h1>
              <p className="text-[14px] text-[#4e5968] font-normal">
                Frontend Developer
              </p>
            </div>
          </div>

          {/* Bio text (해요체) */}
          <p className="mt-4 text-[15px] leading-relaxed text-[#4e5968] font-normal break-keep">
            사용자가 더 쉽게 서비스를 이용할 수 있도록 직관적인 인터페이스를 설계해요. 복잡한 문제를 기술로 단순화하고, 단단한 프로덕트를 만드는 과정에 몰입해요.
          </p>

          {/* Stacks Chips */}
          <div className="mt-4 pt-4 border-t border-[#f2f4f6] flex flex-wrap gap-1.5">
            {stacks.map((stack) => (
              <span
                key={stack}
                className="px-2.5 py-1 rounded-lg bg-[#f2f4f6] text-[#4e5968] text-[13px] font-medium"
              >
                {stack}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURED LINKS (ListRow pattern) */}
        <section className="bg-white rounded-[24px] border border-[#e5e8eb] overflow-hidden shadow-[0_2px_8px_rgba(25,31,40,0.03)]">
          <div className="px-5 pt-5 pb-2">
            <h2 className="text-[17px] font-bold text-[#191f28]">
              주요 링크
            </h2>
          </div>

          <div className="divide-y divide-[#f2f4f6]">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="px-5 py-4 flex items-center justify-between hover:bg-[#f9fafb] active:bg-[#f2f4f6] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* 44px Icon Container */}
                  <div className="w-11 h-11 rounded-[14px] bg-[#f2f4f6] flex items-center justify-center text-xl shrink-0 group-hover:bg-[#e8f3ff] transition-colors">
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-semibold text-[#191f28] truncate">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded-[6px] bg-[#e8f3ff] text-[#3182f6] text-[11px] font-semibold">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[#6b7684] truncate mt-0.5">
                      {link.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Chevron Icon */}
                <svg className="w-5 h-5 text-[#b0b8c1] shrink-0 group-hover:text-[#4e5968] group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* CURRENT WORK CARD (Now Building) */}
        <section className="bg-white rounded-[24px] border border-[#e5e8eb] p-5 shadow-[0_2px_8px_rgba(25,31,40,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#3182f6] uppercase tracking-wider">
              지금 만들고 있어요
            </span>
            <span className="text-[13px] text-[#8b95a1] tabular-nums font-semibold">
              진행률 75%
            </span>
          </div>

          <h3 className="text-[16px] font-bold text-[#191f28] mt-2">
            차세대 링크 인 바이오 서비스
          </h3>
          <p className="text-[14px] text-[#4e5968] mt-1 leading-normal">
            누구나 간편하게 자신만의 개성 있는 링크를 만들 수 있는 웹 서비스를 구축하고 있어요.
          </p>

          {/* TDS Progress Bar */}
          <div className="mt-3.5 w-full bg-[#f2f4f6] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#3182f6] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: "75%" }}
            />
          </div>
        </section>

        {/* CONNECT & CONTACT CARD */}
        <section className="bg-white rounded-[24px] border border-[#e5e8eb] p-5 shadow-[0_2px_8px_rgba(25,31,40,0.03)]">
          <h2 className="text-[16px] font-bold text-[#191f28] mb-3">
            더 많은 곳에서 만나요
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "LinkedIn", desc: "이력 및 경력 연결", url: "https://linkedin.com" },
              { label: "Twitter / X", desc: "생각과 일상 기록", url: "https://twitter.com" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-[16px] bg-[#f9fafb] hover:bg-[#f2f4f6] active:bg-[#e5e8eb] border border-[#e5e8eb] transition-colors cursor-pointer flex flex-col justify-between"
              >
                <span className="text-[14px] font-semibold text-[#191f28]">
                  {item.label}
                </span>
                <span className="text-[12px] text-[#8b95a1] mt-1">
                  {item.desc}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={handleCopyEmail}
            className="mt-3 w-full py-3 px-4 rounded-[16px] bg-[#f2f4f6] hover:bg-[#e5e8eb] active:bg-[#d1d6db] text-[#191f28] text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#4e5968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>이메일 주소 복사하기</span>
          </button>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-4 text-[13px] text-[#8b95a1] leading-relaxed">
          <p>© 2026 홍길동. 토스 디자인 시스템(TDS) 가이드라인을 바탕으로 제작되었어요.</p>
        </footer>

      </main>

      {/* 3. TDS BOTTOM-CTA (56px 토스 블루 단일 강조 액션 + 보호 그라디언트) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none flex justify-center">
        <div className="w-full max-w-lg px-5 pb-6 pt-6 pointer-events-auto bg-gradient-to-t from-[#f9fafb] via-[#f9fafb]/90 to-transparent">
          <a
            href="mailto:gildong@example.com"
            className="w-full h-14 rounded-[16px] bg-[#3182f6] hover:bg-[#1b64da] active:opacity-90 text-white font-bold text-[17px] flex items-center justify-center shadow-[0_4px_12px_rgba(49,130,246,0.25)] transition-all cursor-pointer"
          >
            커피챗 신청하기
          </a>
        </div>
      </div>

      {/* 4. TDS TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[#191f28] text-white text-[14px] font-medium shadow-[0_8px_24px_rgba(25,31,40,0.16)]">
            <span className="w-5 h-5 rounded-full bg-[#00b569] text-white flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
