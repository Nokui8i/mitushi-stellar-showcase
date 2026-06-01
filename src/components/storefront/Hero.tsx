import heroImg from "@/assets/hero-model.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[88vh] w-full overflow-hidden">
      {/* radial backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 70% 50%, color-mix(in oklab, var(--crimson) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--bone) 1px, transparent 1px), linear-gradient(90deg, var(--bone) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* corner badges */}
      <div className="absolute left-6 top-6 z-20 text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/60">
        FW · 26 / Drop 03
      </div>
      <div className="absolute right-6 top-6 z-20 text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/60">
        Tokyo — Tel Aviv
      </div>

      {/* vertical jp text */}
      <div className="pointer-events-none absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 font-jp text-[11px] tracking-[1em] text-foreground/40 [writing-mode:vertical-rl] md:block">
        匠 · 二〇二六
      </div>

      <div className="relative z-10 mx-auto grid min-h-[88vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 pb-16 md:grid-cols-12 md:gap-12">
        {/* Left: copy */}
        <div className="md:col-span-6 animate-rise">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson crimson-glow" />
            New Drop · Live Now
          </div>
          <h1 className="font-display leading-[0.85] text-[clamp(3.5rem,9vw,8rem)]">
            WEAR THE
            <br />
            <span className="text-crimson">LEGEND</span>
            <br />
            <span className="text-stroke">IN SILENCE</span>
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
              <span className="transition-transform group-hover:translate-x-1">→</span>
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

        {/* Right: image */}
        <div className="relative md:col-span-6">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
            {/* red sun */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson"
              style={{ filter: "blur(1px)" }}
            />
            <img
              src={heroImg}
              alt="Mitushi anime streetwear model wearing FW26 drop"
              className="relative h-full w-full object-cover"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            />
            {/* floating badge */}
            <div className="absolute -left-4 bottom-10 hidden rotate-[-6deg] border border-border bg-card/80 px-4 py-3 backdrop-blur-md md:block">
              <div className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">Drop 03</div>
              <div className="font-display text-xl">夢 DREAMS</div>
            </div>
            <div className="absolute -right-4 top-10 hidden rotate-[6deg] border border-crimson/60 bg-ink/80 px-4 py-3 backdrop-blur-md md:block">
              <div className="text-[9px] uppercase tracking-[0.3em] text-crimson">Limited</div>
              <div className="font-display text-xl">/ 300</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
