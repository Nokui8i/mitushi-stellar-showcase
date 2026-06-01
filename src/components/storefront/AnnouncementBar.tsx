import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!atTop}
      className="overflow-hidden bg-crimson text-crimson-foreground transition-[height,opacity] duration-500 ease-out"
      style={{ height: atTop ? 36 : 0, opacity: atTop ? 1 : 0 }}
    >
      <div className="flex h-9 items-center overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-16 pl-8 text-[11px] font-medium uppercase tracking-[0.32em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              Free shipping on orders over $199
              <span aria-hidden className="opacity-60">✦</span>
              新作コレクション
              <span aria-hidden className="opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
