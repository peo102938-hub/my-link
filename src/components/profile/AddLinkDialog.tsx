"use client";

import { useState } from "react";
import { LinkItem } from "@/types/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddLinkDialogProps {
  onAddLink: (link: Omit<LinkItem, "id">) => void;
  onShowToast: (message: string) => void;
  triggerButton?: React.ReactNode;
}

const PRESET_ICONS = [
  { icon: "💼", label: "포트폴리오" },
  { icon: "🐙", label: "GitHub" },
  { icon: "✍️", label: "블로그" },
  { icon: "📄", label: "이력서" },
  { icon: "🌐", label: "웹사이트" },
  { icon: "📱", label: "SNS" },
  { icon: "🎨", label: "디자인" },
  { icon: "💡", label: "프로젝트" },
  { icon: "☕", label: "커피챗" },
  { icon: "🔗", label: "기타" },
];

const PRESET_BADGES = ["추천", "NEW", "HOT"];

export function AddLinkDialog({
  onAddLink,
  onShowToast,
  triggerButton,
}: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [icon, setIcon] = useState("🔗");
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [customBadge, setCustomBadge] = useState("");
  const [isCustomBadge, setIsCustomBadge] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setSubtitle("");
    setIcon("🔗");
    setSelectedBadge(null);
    setCustomBadge("");
    setIsCustomBadge(false);
    setErrors({});
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = "링크 제목을 입력해주세요.";
    }

    if (!url.trim()) {
      newErrors.url = "링크 URL을 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Auto-prepend https:// if protocol is missing
    let normalizedUrl = url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://") &&
      !normalizedUrl.startsWith("mailto:")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const badge = isCustomBadge
      ? customBadge.trim() || null
      : selectedBadge;

    onAddLink({
      title: title.trim(),
      url: normalizedUrl,
      subtitle: subtitle.trim(),
      icon: icon.trim() || "🔗",
      badge: badge || null,
      isActive: true,
    });

    onShowToast("새 링크를 추가했어요");
    setOpen(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          triggerButton ? (
            <>{triggerButton}</>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-[#3182f6] bg-[#e8f3ff] hover:bg-[#d5e8ff] active:scale-95 transition-all cursor-pointer"
              aria-label="새 링크 추가하기"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>링크 추가</span>
            </button>
          )
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 링크 추가</DialogTitle>
          <DialogDescription>
            프로필 페이지에 보여줄 새로운 링크 카드를 등록합니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* 1. 아이콘 선택 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#333d4b]">
              아이콘
            </label>
            <div className="flex items-center gap-3">
              {/* 현재 아이콘 미리보기 & 직접 입력 */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-[16px] bg-[#f2f4f6] border border-[#e5e8eb] shrink-0 text-2xl shadow-xs">
                <span>{icon || "🔗"}</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="직접 이모지 입력"
                  className="w-full h-10 px-3 rounded-[12px] border border-[#e5e8eb] bg-[#f9fafb] text-[13px] text-[#191f28] placeholder-[#8b95a1] focus:bg-white focus:border-[#3182f6] focus:outline-none transition-all"
                  maxLength={4}
                />
              </div>
            </div>

            {/* 빠른 추천 이모지 칩 */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESET_ICONS.map((preset) => {
                const isSelected = icon === preset.icon;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setIcon(preset.icon)}
                    title={preset.label}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-[12px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#3182f6] text-white font-medium shadow-xs"
                        : "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]"
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span className="text-[11px]">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. 링크 제목 (필수) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-title"
                className="text-[13px] font-semibold text-[#333d4b]"
              >
                링크 제목 <span className="text-[#f04452]">*</span>
              </label>
              {errors.title && (
                <span className="text-[11px] text-[#f04452] font-medium">
                  {errors.title}
                </span>
              )}
            </div>
            <input
              id="link-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }
              }}
              placeholder="예: 포트폴리오, 기술 블로그"
              className={`w-full h-11 px-3.5 rounded-[14px] border text-[14px] text-[#191f28] placeholder-[#8b95a1] bg-[#f9fafb] focus:bg-white focus:outline-none transition-all ${
                errors.title
                  ? "border-[#f04452] focus:border-[#f04452]"
                  : "border-[#e5e8eb] focus:border-[#3182f6] focus:ring-2 focus:ring-[#3182f6]/10"
              }`}
            />
          </div>

          {/* 3. 링크 URL (필수) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-url"
                className="text-[13px] font-semibold text-[#333d4b]"
              >
                연결 URL <span className="text-[#f04452]">*</span>
              </label>
              {errors.url && (
                <span className="text-[11px] text-[#f04452] font-medium">
                  {errors.url}
                </span>
              )}
            </div>
            <input
              id="link-url"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (errors.url) {
                  setErrors((prev) => ({ ...prev, url: undefined }));
                }
              }}
              placeholder="예: https://velog.io/@username"
              className={`w-full h-11 px-3.5 rounded-[14px] border text-[14px] text-[#191f28] placeholder-[#8b95a1] bg-[#f9fafb] focus:bg-white focus:outline-none transition-all ${
                errors.url
                  ? "border-[#f04452] focus:border-[#f04452]"
                  : "border-[#e5e8eb] focus:border-[#3182f6] focus:ring-2 focus:ring-[#3182f6]/10"
              }`}
            />
          </div>

          {/* 4. 보조 설명 (선택) */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="link-subtitle"
              className="text-[13px] font-semibold text-[#333d4b]"
            >
              보조 설명{" "}
              <span className="text-[11px] font-normal text-[#8b95a1]">
                (선택)
              </span>
            </label>
            <input
              id="link-subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="예: 진행했던 주요 프로젝트와 작업물이에요"
              className="w-full h-11 px-3.5 rounded-[14px] border border-[#e5e8eb] text-[14px] text-[#191f28] placeholder-[#8b95a1] bg-[#f9fafb] focus:bg-white focus:border-[#3182f6] focus:ring-2 focus:ring-[#3182f6]/10 focus:outline-none transition-all"
            />
          </div>

          {/* 5. 강조 뱃지 (선택) */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#333d4b]">
              강조 뱃지{" "}
              <span className="text-[11px] font-normal text-[#8b95a1]">
                (선택)
              </span>
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedBadge(null);
                  setIsCustomBadge(false);
                }}
                className={`px-3 py-1 rounded-[10px] text-[12px] transition-all cursor-pointer ${
                  !isCustomBadge && selectedBadge === null
                    ? "bg-[#333d4b] text-white font-medium"
                    : "bg-[#f2f4f6] text-[#6b7684] hover:bg-[#e5e8eb]"
                }`}
              >
                없음
              </button>

              {PRESET_BADGES.map((b) => {
                const isSelected = !isCustomBadge && selectedBadge === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setSelectedBadge(b);
                      setIsCustomBadge(false);
                    }}
                    className={`px-3 py-1 rounded-[10px] text-[12px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#e8f3ff] text-[#3182f6] font-bold border border-[#3182f6]/30 shadow-xs"
                        : "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setIsCustomBadge(true)}
                className={`px-3 py-1 rounded-[10px] text-[12px] transition-all cursor-pointer ${
                  isCustomBadge
                    ? "bg-[#e8f3ff] text-[#3182f6] font-bold border border-[#3182f6]/30"
                    : "bg-[#f2f4f6] text-[#6b7684] hover:bg-[#e5e8eb]"
                }`}
              >
                직접 입력
              </button>
            </div>

            {isCustomBadge && (
              <input
                type="text"
                value={customBadge}
                onChange={(e) => setCustomBadge(e.target.value)}
                placeholder="뱃지 문구 (예: 이벤트, 인기)"
                maxLength={8}
                className="w-full h-9 px-3 rounded-[10px] border border-[#e5e8eb] bg-[#f9fafb] text-[12px] text-[#191f28] placeholder-[#8b95a1] focus:bg-white focus:border-[#3182f6] focus:outline-none transition-all mt-1"
              />
            )}
          </div>

          {/* 다이얼로그 액션 버튼들 */}
          <DialogFooter className="mt-4 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOpenChange(false)}
              className="h-11 px-4 rounded-[14px] text-[14px] font-medium text-[#4e5968] bg-[#f2f4f6] hover:bg-[#e5e8eb] active:scale-[0.98] transition-all cursor-pointer"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-11 px-6 rounded-[14px] text-[14px] font-semibold text-white bg-[#3182f6] hover:bg-[#1b64da] active:scale-[0.98] shadow-sm transition-all cursor-pointer"
            >
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
