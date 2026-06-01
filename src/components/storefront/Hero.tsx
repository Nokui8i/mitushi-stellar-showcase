import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-model.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0 -> 1 progress within section

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scale = 1 - p * 0.45;
  const rotate = p * 14;

  const lines = [
    { txt: "WEAR THE", at: 0.05 },
    { txt: "LEGEND", at: 0.25, crimson: true },
    { txt: "IN SILENCE", at: 0.5 },
    { txt: "夢 · DREAMS", at: 0.75, small: true },
  ];

  return (
    <section ref={ref} id="home" className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* radial backdrop */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, var(--crimson) 18%, transparent) 0%, transparent 70%)",
          }}
        />
        {/* grid bg */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(var(--bone) 1px, transparent 1px), linear-gradient(90deg, var(--bone) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        {/* pinned 3D-style central element (model + red sun) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ transform: `translate(-50%,-50%) scale(${scale}) rotate(${rotate}deg)` }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson"
              style={{ filter: "blur(2px)", opacity: 0.95 }}
            />
            <img
              src={heroImg}
              alt="Mitushi anime streetwear model"
              width={520}
              height={650}
              className="relative h-[78vh] w-auto object-cover"
              style={{
                maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* japanese vertical text */}
        <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 font-jp text-[11px] tracking-[1em] text-foreground/40 [writing-mode:vertical-rl]">
          ミツシ・ストリート・ウェア
        </div>
        <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 font-jp text-[11px] tracking-[1em] text-foreground/40 [writing-mode:vertical-rl]">
          匠 · 二〇二六
        </div>

        {/* overlay typography layers */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {lines.map((l, i) => {
            const localStart = l.at;
            const localEnd = l.at + 0.22;
            const localP = Math.min(Math.max((p - localStart) / (localEnd - localStart), 0), 1);
            const opacity = localP < 0.5 ? localP * 2 : (1 - localP) * 2;
            const translate = (1 - localP) * 80 - 40;
            return (
              <div
                key={i}
                className="absolute"
                style={{ opacity, transform: `translateY(${translate}px)` }}
              >
                <span
                  className={`font-display block text-center leading-[0.85] ${
                    l.small
                      ? "text-stroke text-[clamp(3rem,8vw,7rem)]"
                      : l.crimson
                      ? "text-crimson text-[clamp(6rem,18vw,18rem)]"
                      : "text-bone text-[clamp(6rem,18vw,18rem)]"
                  }`}
                >
                  {l.txt}
                </span>
              </div>
            );
          })}
        </div>

        {/* HUD */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <div className="text-[10px] font-medium uppercase tracking-[0.5em] text-foreground/50">
            scroll · スクロール
          </div>
          <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-crimson to-transparent" />
        </div>

        {/* corner badges */}
        <div className="absolute left-6 top-6 text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/60">
          FW · 26 / Drop 03
        </div>
        <div className="absolute right-6 top-6 text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/60">
          Tokyo — Tel Aviv
        </div>
      </div>
    </section>
  );
}
