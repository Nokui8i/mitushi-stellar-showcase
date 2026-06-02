import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-model.jpg";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // 0 when section top at viewport top, grows as you scroll past
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setScrollY(progress);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px, y: py });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Parallax derived values
  const pY = scrollY * 120; // background drift
  const sunScale = 1 + scrollY * 0.35;
  const imgY = scrollY * -60;
  const titleY = scrollY * -180;
  const titleOpacity = 1 - scrollY * 1.2;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[92vh] w-full overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* radial backdrop (parallax) */}
      <div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${pY * 0.4}px, 0)`,
          background:
            "radial-gradient(55% 60% at 70% 50%, color-mix(in oklab, var(--crimson) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* grid bg (slow parallax) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] will-change-transform"
        style={{
          transform: `translate3d(0, ${pY * 0.15}px, 0)`,
          backgroundImage:
            "linear-gradient(var(--bone) 1px, transparent 1px), linear-gradient(90deg, var(--bone) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Big ghost type behind everything (parallax) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `translate3d(0, ${pY * 0.6}px, 0)`,
        }}
      >
        <div className="text-stroke font-display select-none text-[clamp(10rem,28vw,26rem)] leading-none opacity-[0.08]">
          MITUSHI
        </div>
      </div>

      {/* corner badges */}
      <div className="absolute left-6 top-6 z-20 text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/60">
        FW · 26 / Drop 03
      </div>
      <div className="absolute right-6 top-6 z-20 text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/60">
        Tokyo — Tel Aviv
      </div>

      {/* vertical jp text (parallax) */}
      <div
        className="pointer-events-none absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 font-jp text-[11px] tracking-[1em] text-foreground/40 [writing-mode:vertical-rl] md:block will-change-transform"
        style={{ transform: `translate3d(0, calc(-50% + ${pY * 0.5}px), 0)` }}
      >
        匠 · 二〇二六
      </div>

      <div className="relative z-10 mx-auto grid min-h-[92vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 pb-16 md:grid-cols-12 md:gap-12">
        {/* Left: copy with scroll parallax */}
        <div
          className="md:col-span-6 animate-rise will-change-transform"
          style={{
            transform: `translate3d(0, ${titleY * 0.5}px, 0)`,
            opacity: Math.max(0, titleOpacity),
          }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson crimson-glow animate-pulse" />
            New Drop · Live Now
          </div>
          <h1 className="font-display leading-[0.85] text-[clamp(3.5rem,9vw,8rem)]">
            <span
              className="block will-change-transform"
              style={{ transform: `translate3d(0, ${titleY * 0.2}px, 0)` }}
            >
              WEAR THE
            </span>
            <span
              className="block text-crimson will-change-transform"
              style={{ transform: `translate3d(0, ${titleY * 0.5}px, 0)` }}
            >
              LEGEND
            </span>
            <span
              className="block text-stroke will-change-transform"
              style={{ transform: `translate3d(0, ${titleY * 0.8}px, 0)` }}
            >
              IN SILENCE
            </span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
            Limited-edition anime streetwear engineered in Tokyo silhouettes.
            Heavyweight cotton, pigment-dyed, built to outlive the season.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group inline-flex items-center gap-3 bg-crimson px-7 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-crimson-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Shop the Drop
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#lookbook"
              className="story-link text-xs font-medium uppercase tracking-[0.3em] text-foreground/80"
            >
              View Lookbook
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
            <div>
              <div className="font-display text-2xl text-bone">03</div>
              Active Drops
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl text-bone">48H</div>
              Until Restock
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl text-crimson">夢</div>
              Dreams FW26
            </div>
          </div>
        </div>

        {/* Right: 3D tilt + scroll parallax image */}
        <div
          ref={stageRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative md:col-span-6"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-[520px] transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, ${imgY}px, 0) rotateX(${tilt.y * -8}deg) rotateY(${tilt.x * 12}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* red sun (deep layer) */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[78%] w-[78%] rounded-full bg-crimson will-change-transform"
              style={{
                transform: `translate3d(calc(-50% + ${tilt.x * -30}px), calc(-50% + ${tilt.y * -30}px), -80px) scale(${sunScale})`,
                filter: "blur(1px)",
              }}
            />
            {/* glow ring */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-crimson/40"
              style={{
                transform: `translate(-50%, -50%) translateZ(-40px) scale(${1 + scrollY * 0.2})`,
                boxShadow:
                  "0 0 80px color-mix(in oklab, var(--crimson) 35%, transparent)",
              }}
            />
            <img
              src={heroImg}
              alt="Mitushi anime streetwear model wearing FW26 drop"
              className="relative h-full w-full object-cover will-change-transform"
              style={{
                transform: `translateZ(40px) translate3d(${tilt.x * 12}px, ${tilt.y * 12}px, 0)`,
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            />
            {/* floating badges (front layer) */}
            <div
              className="absolute -left-4 bottom-10 hidden rotate-[-6deg] border border-border bg-card/80 px-4 py-3 backdrop-blur-md md:block will-change-transform"
              style={{
                transform: `translate3d(${tilt.x * 30}px, ${tilt.y * 30}px, 80px) rotate(-6deg)`,
              }}
            >
              <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">
                Drop 03
              </div>
              <div className="font-display text-xl">夢 DREAMS</div>
            </div>
            <div
              className="absolute -right-4 top-10 hidden rotate-[6deg] border border-crimson/60 bg-ink/80 px-4 py-3 backdrop-blur-md md:block will-change-transform"
              style={{
                transform: `translate3d(${tilt.x * 40}px, ${tilt.y * 40}px, 100px) rotate(6deg)`,
              }}
            >
              <div className="text-[9px] uppercase tracking-[0.3em] text-crimson">
                Limited
              </div>
              <div className="font-display text-xl">/ 300</div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/50"
        style={{ opacity: Math.max(0, 1 - scrollY * 2) }}
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="block h-8 w-px animate-pulse bg-crimson" />
        </div>
      </div>
    </section>
  );
}
