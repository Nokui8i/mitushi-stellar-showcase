import { useEffect, useRef, useState } from "react";
import { Instagram, ShieldCheck, Sparkles, Zap, Check } from "lucide-react";

export function WaitlistLanding() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: px, y: py });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setError("Enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-background text-foreground">
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--bone) 1px, transparent 1px), linear-gradient(90deg, var(--bone) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      {/* Crimson radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--crimson) 0%, transparent 60%)" }}
      />
      {/* Ghost text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display opacity-[0.08]"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)", lineHeight: 0.85 }}
      >
        MITUSHI
      </div>

      {/* Corner micro-badges */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground sm:left-6 sm:top-6">
        <span className="h-1 w-1 rounded-full bg-crimson" />
        DROP 01 · IN PRODUCTION
      </div>
      <div className="absolute right-4 top-4 z-20 text-[10px] tracking-[0.2em] text-muted-foreground sm:right-6 sm:top-6">
        TOKYO — USA
      </div>

      {/* Vertical JP accent */}
      <div
        aria-hidden
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 font-jp text-xs tracking-[0.6em] text-muted-foreground/60 [writing-mode:vertical-rl] md:block"
      >
        匠 · 二〇二六
      </div>

      {/* Wordmark */}
      <header className="relative z-20 flex items-center justify-center pt-14 sm:pt-10">
        <a href="/" className="font-display text-xl tracking-[0.3em] text-foreground">
          MITUSHI
        </a>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pb-16 pt-8 sm:px-8 md:pt-14">
        <div className="grid w-full items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          {/* Left column */}
          <div className="animate-rise text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
              </span>
              <span className="text-[10px] font-medium tracking-[0.25em] text-foreground/90">
                DROP 01 — COMING SOON
              </span>
            </div>

            <h1
              className="mt-6 font-display uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
            >
              <span className="block">Wear the</span>
              <span className="block text-crimson">Legend</span>
              <span className="block">In Silence</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground md:mx-0">
              First drop in production. Join the list for early access — no payment required.
            </p>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-7 max-w-md md:mx-0"
              noValidate
            >
              {status === "success" ? (
                <div className="rounded-lg border border-crimson/40 bg-crimson/10 p-5 text-left">
                  <div className="flex items-center gap-2 font-display tracking-wider">
                    <Check className="h-5 w-5 text-crimson" />
                    You're on the list.
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We'll email you before anyone else.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-md border border-border bg-card/60 px-4 text-[16px] text-foreground placeholder:text-muted-foreground/70 outline-none backdrop-blur transition focus:border-crimson focus:ring-2 focus:ring-crimson/40"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-crimson px-6 font-display tracking-[0.2em] text-crimson-foreground transition hover:brightness-110 hover:shadow-[0_0_30px_-6px_var(--crimson)] active:scale-[0.98] disabled:opacity-60"
                    >
                      {status === "loading" ? "Joining…" : "Get Early Access"}
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-crimson">{error}</p>
                  )}
                  <p className="mt-3 text-[11px] tracking-wide text-muted-foreground/80">
                    No spam. Unsubscribe anytime. Launch updates only.
                  </p>
                </>
              )}
            </form>

            {/* Trust chips */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {[
                { icon: ShieldCheck, label: "No payment" },
                { icon: Zap, label: "Early access first" },
                { icon: Sparkles, label: "Limited drop" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-3 py-1.5 text-[11px] tracking-wide text-foreground/90 backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5 text-crimson" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: abstract mood panel */}
          <div
            ref={stageRef}
            className="relative mx-auto hidden aspect-[4/5] w-full max-w-md md:block"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${tilt.y * -8}deg) rotateY(${tilt.x * 12}deg)`,
                transition: "transform 200ms ease-out",
              }}
            >
              {/* dark gradient */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 30% 20%, color-mix(in oklab, var(--crimson) 35%, transparent), transparent 60%), linear-gradient(160deg, #1b1b1d 0%, #28282b 60%, #131315 100%)",
                }}
              />
              {/* crimson ring glow */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, transparent 52%, color-mix(in oklab, var(--crimson) 55%, transparent) 55%, transparent 62%)",
                  filter: "blur(8px)",
                }}
              />
              {/* faint fabric texture */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 4px)",
                  filter: "blur(0.4px)",
                }}
              />
              {/* grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--bone) 1px, transparent 1px), linear-gradient(90deg, var(--bone) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Floating badges */}
              <div
                className="absolute left-5 top-5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-[10px] tracking-[0.25em] backdrop-blur"
                style={{ transform: `translate3d(${tilt.x * 20}px, ${tilt.y * 20}px, 60px)` }}
              >
                LIMITED / TBA
              </div>
              <div
                className="absolute bottom-5 right-5 rounded-md border border-crimson/40 bg-crimson/10 px-2.5 py-1 text-[10px] tracking-[0.25em] text-foreground backdrop-blur"
                style={{ transform: `translate3d(${tilt.x * 28}px, ${tilt.y * 28}px, 80px)` }}
              >
                DROP 01 · 夢
              </div>

              {/* Ghost label */}
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center font-display text-[22vmin] leading-none text-foreground/[0.05]"
              >
                夢
              </div>
            </div>
          </div>

          {/* Mobile abstract */}
          <div className="relative mx-auto h-40 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card/40 md:hidden">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 80% at 50% 30%, color-mix(in oklab, var(--crimson) 35%, transparent), transparent 65%), linear-gradient(160deg, #1b1b1d, #28282b)",
              }}
            />
            <div className="relative flex h-full items-center justify-between px-5">
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground">LIMITED / TBA</span>
              <span className="font-jp text-3xl text-foreground/80">夢</span>
              <span className="text-[10px] tracking-[0.25em] text-foreground">DROP 01</span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <section className="mt-20 w-full max-w-4xl">
          <h2 className="text-center font-display text-xs tracking-[0.4em] text-muted-foreground">
            WHAT HAPPENS NEXT
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              "You join the list",
              "We email you 24h before launch",
              "You get first access to Drop 01",
            ].map((step, i) => (
              <li
                key={step}
                className="rounded-lg border border-border bg-card/40 p-5 backdrop-blur"
              >
                <div className="font-display text-2xl text-crimson">0{i + 1}</div>
                <div className="mt-1 text-sm text-foreground/90">{step}</div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-5 pb-6 text-[11px] text-muted-foreground sm:px-8">
        <span>© {new Date().getFullYear()} Mitushi</span>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="inline-flex items-center gap-1.5 transition hover:text-crimson"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
      </footer>
    </div>
  );
}
