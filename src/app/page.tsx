export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900 text-neutral-800 dark:text-neutral-100">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-800/80 p-8 shadow-sm border border-neutral-200/80 dark:border-neutral-700/60 backdrop-blur-sm text-center transition-all">
        {/* 프로필 이미지 / 아바타 영역 */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 font-bold text-3xl shadow-inner">
          홍
        </div>

        {/* 이름 */}
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
          홍길동
        </h1>

        {/* 한 줄 태그 / 뱃지 */}
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-neutral-700 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          <span>Student & Developer</span>
        </div>

        {/* 소개글 */}
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>

        {/* 추가 링크 또는 소셜 버튼 영역 (심플 스타일) */}
        <div className="mt-8 flex justify-center gap-3">
          <div className="h-1.5 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </div>
      </div>
    </main>
  );
}
