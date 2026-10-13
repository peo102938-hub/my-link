"use client";

import { SocialLink } from "@/types/profile";
import { Mail, BookOpen, Globe } from "lucide-react";

interface SocialBarProps {
  socials: SocialLink[];
}

export function SocialBar({ socials }: SocialBarProps) {
  if (!socials || socials.length === 0) return null;

  const getPlatformIcon = (platform: SocialLink["platform"]) => {
    switch (platform) {
      case "github":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );
      case "blog":
        return <BookOpen className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getPlatformLabel = (platform: SocialLink["platform"]) => {
    switch (platform) {
      case "github":
        return "GitHub";
      case "blog":
        return "기술 블로그";
      case "email":
        return "이메일";
      case "twitter":
        return "X (구 트위터)";
      case "instagram":
        return "인스타그램";
      default:
        return platform;
    }
  };

  return (
    <section className="flex items-center justify-center gap-2.5 py-2">
      {socials.map((social) => (
        <a
          key={`${social.platform}-${social.url}`}
          href={social.url}
          target={social.url.startsWith("mailto:") ? undefined : "_blank"}
          rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="w-10 h-10 rounded-full bg-white border border-[#e5e8eb] hover:border-[#d1d6db] hover:bg-[#f2f4f6] text-[#4e5968] hover:text-[#191f28] active:scale-95 flex items-center justify-center shadow-[0_1px_3px_rgba(25,31,40,0.02)] transition-all cursor-pointer"
          aria-label={getPlatformLabel(social.platform)}
          title={getPlatformLabel(social.platform)}
        >
          {getPlatformIcon(social.platform)}
        </a>
      ))}
    </section>
  );
}
