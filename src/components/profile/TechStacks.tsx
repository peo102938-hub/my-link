"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechStacksProps {
  stacks: string[];
}

export function TechStacks({ stacks }: TechStacksProps) {
  if (!stacks || stacks.length === 0) return null;

  return (
    <Card className="rounded-[24px] border border-[#e5e8eb] bg-white p-5 shadow-[0_2px_8px_rgba(25,31,40,0.03)] ring-0">
      <h2 className="text-[14px] font-bold text-[#191f28] mb-3">
        기술 스택
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {stacks.map((stack) => (
          <Badge
            key={stack}
            variant="secondary"
            className="h-auto px-3 py-1.5 rounded-full bg-[#f2f4f6] hover:bg-[#e5e8eb] text-[#4e5968] text-[13px] font-medium border-transparent transition-colors"
          >
            {stack}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
