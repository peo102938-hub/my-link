"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HeroCardProps {
  displayName: string;
  role: string;
  bio: string;
  avatarText?: string;
  avatarUrl?: string | null;
}

export function HeroCard({
  displayName,
  role,
  bio,
  avatarText,
  avatarUrl,
}: HeroCardProps) {
  return (
    <Card className="rounded-[24px] border border-[#e5e8eb] bg-white p-6 shadow-[0_2px_8px_rgba(25,31,40,0.03)] ring-0">
      <div className="flex items-center gap-4">
        {/* Avatar (64x64px) */}
        {avatarUrl ? (
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#e5e8eb]">
            <Image
              src={avatarUrl}
              alt={displayName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#e8f3ff] text-[#3182f6] font-bold text-2xl flex items-center justify-center shrink-0 border border-[#d1e6ff]">
            {avatarText || displayName.slice(0, 1)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[20px] font-bold text-[#191f28] tracking-tight truncate">
              {displayName}
            </h1>
            <CheckCircle2
              className="w-4 h-4 text-[#3182f6] shrink-0"
              aria-label="Verified"
            />
          </div>
          <p className="text-[14px] text-[#4e5968] font-medium mt-0.5 truncate">
            {role}
          </p>
        </div>
      </div>

      {/* Bio text box */}
      <div className="mt-4 p-4 rounded-[16px] bg-[#f9fafb] text-[15px] leading-relaxed text-[#4e5968] break-words">
        {bio}
      </div>
    </Card>
  );
}
