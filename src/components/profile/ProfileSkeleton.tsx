"use client";

export function ProfileSkeleton() {
  return (
    <div className="w-full max-w-lg px-5 pt-7 pb-16 flex flex-col gap-4 animate-pulse">
      {/* Hero Card Skeleton */}
      <div className="bg-white rounded-[24px] border border-[#e5e8eb] p-6 shadow-[0_2px_8px_rgba(25,31,40,0.02)]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f2f4f6] shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-24 h-6 rounded-md bg-[#f2f4f6]" />
            <div className="w-36 h-4 rounded-md bg-[#f2f4f6]" />
          </div>
        </div>
        <div className="mt-4 p-4 rounded-[16px] bg-[#f9fafb] flex flex-col gap-2">
          <div className="w-full h-4 rounded bg-[#f2f4f6]" />
          <div className="w-4/5 h-4 rounded bg-[#f2f4f6]" />
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="h-12 rounded-[16px] bg-[#f2f4f6]" />
        <div className="h-12 rounded-[16px] bg-[#e8f3ff]" />
      </div>

      {/* Links Section Skeleton */}
      <div className="flex flex-col gap-2.5 mt-2">
        <div className="w-16 h-3 rounded bg-[#f2f4f6] mb-1" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[72px] rounded-[20px] bg-white border border-[#e5e8eb] p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5 flex-1">
              <div className="w-10 h-10 rounded-[14px] bg-[#f2f4f6] shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-28 h-4 rounded bg-[#f2f4f6]" />
                <div className="w-44 h-3 rounded bg-[#f2f4f6]" />
              </div>
            </div>
            <div className="w-4 h-4 rounded bg-[#f2f4f6]" />
          </div>
        ))}
      </div>

      {/* Tech Stacks Skeleton */}
      <div className="bg-white rounded-[24px] border border-[#e5e8eb] p-5">
        <div className="w-20 h-4 rounded bg-[#f2f4f6] mb-3" />
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-16 h-7 rounded-full bg-[#f2f4f6]" />
          ))}
        </div>
      </div>
    </div>
  );
}
