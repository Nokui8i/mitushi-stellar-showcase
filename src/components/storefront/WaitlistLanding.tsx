import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Check, Instagram, Bell, Zap, Crown } from "lucide-react";

/* ----------------------------- helpers ----------------------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ------------------------------ header ----------------------------- */

function FixedHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#28282B]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-end px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-bone/80">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson shadow-[0_0_10px_var(--crimson)]" />
          Drop 01
        </span>
      </div>
    </header>
  );
}

/* ----------------------------- side rail --------------------------- */

function SideRail() {
  const active = useActiveSection(["why", "join"]);
  const items = [
    { id: "why", label: "Why us" },
    { id: "join", label: "Join" },
  ];
  return (
    <nav className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col gap-5">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id} className="pointer-events-auto">
              <a
                href={`#${it.id}`}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.28em]"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    isActive
                      ? "bg-crimson shadow-[0_0_10px_var(--crimson)] scale-125"
                      : "bg-white/25 group-hover:bg-white/60"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    isActive ? "text-bone" : "text-bone/40 group-hover:text-bone/70"
                  }`}
                >
                  {it.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ------------------------------- gate ------------------------------ */

function Gate() {
  return (
    <section
      id="gate"
      className="relative isolate flex min-h-[88vh] items-center justify-center px-5 pt-28 pb-20 sm:min-h-[92vh] sm:pt-32"
    >
      {/* crimson glow behind logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-[60%] -translate-y-1/2 rounded-full opacity-[0.55] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--crimson) 0%, transparent 60%)",
        }}
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div
          data-reveal
          className="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-bone/90"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-crimson shadow-[0_0_10px_var(--crimson)]" />
          Drop 01 — Coming soon
        </div>

        <h1
          data-reveal
          className="reveal font-script text-bone crimson-glow leading-none"
          style={{ fontSize: "clamp(5rem, 16vw, 12rem)" }}
        >
          Mitushi
        </h1>

        <p
          data-reveal
          className="reveal mt-8 max-w-xl text-sm font-light uppercase tracking-[0.32em] text-bone/75 sm:text-base"
        >
          Our designers. Our factory. Our marketing.
        </p>

        <a
          data-reveal
          href="#why"
          className="reveal group mt-12 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-bone/85 transition-all hover:border-crimson/50 hover:bg-crimson/10 hover:text-bone"
        >
          How we build
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------- why ------------------------------- */

function Divider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px w-full max-w-5xl"
      style={{
        background:
          "linear-gradient(to right, transparent, color-mix(in oklab, var(--crimson) 60%, transparent), transparent)",
      }}
    />
  );
}

function Why() {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const offset = (r.top + r.height / 2 - center) * -0.06;
      el.style.setProperty("--py", `${offset}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const steps = [
    { kanji: "設", title: "Our designers", sub: "In-house art" },
    { kanji: "工", title: "Our factory", sub: "Our production" },
    { kanji: "宣", title: "Our marketing", sub: "Direct to you" },
  ];

  return (
    <section id="why" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div data-reveal className="reveal text-center">
          <div className="mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bone/45">
            <span className="h-px w-8 bg-bone/25" /> Why us <span className="h-px w-8 bg-bone/25" />
          </div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl">
            We own the <span className="text-crimson">full stack</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light text-bone/60 sm:text-base">
            We don't buy ready-made from factory catalogs like everyone else.
          </p>
        </div>

        {/* abstract brand panel */}
        <div
          data-reveal
          ref={panelRef}
          className="reveal group relative mx-auto mt-14 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/8 bg-[#1d1d20] shadow-card sm:aspect-[16/8]"
          style={{ transform: "translateY(var(--py, 0px))" }}
        >
          {/* grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* radial crimson sun */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--crimson) 0%, transparent 65%)",
            }}
          />
          {/* hard sun disc */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-crimson/40 bg-crimson/10"
          />
          {/* watermark */}
          <div className="absolute inset-x-0 top-6 text-center font-display text-[12vw] uppercase leading-none text-bone/[0.04] sm:text-[8vw]">
            MITUSHI
          </div>
          {/* kanji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-jp text-bone crimson-glow" style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}>
              夢
            </span>
          </div>
          {/* tags */}
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-bone/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            Drop 01
          </div>
          <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-jp text-xs text-bone/80 backdrop-blur">
            設計 · 工場 · 宣伝
          </div>
          {/* corner marks */}
          <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.28em] text-bone/40">
            01 / 夢
          </div>
          <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.28em] text-bone/40">
            est. 2026
          </div>
        </div>

        {/* 3 steps */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-5">
          {steps.map((s, i) => (
            <div
              key={s.kanji}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="reveal group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-crimson/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <span className="font-jp text-5xl text-bone transition-colors group-hover:text-crimson">
                  {s.kanji}
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-bone/30">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-8">
                <div className="font-display text-lg uppercase tracking-wide text-bone">
                  {s.title}
                </div>
                <div className="mt-1 text-xs font-light text-bone/55">{s.sub}</div>
              </div>
              <span
                aria-hidden
                className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          ))}
        </div>

        {/* contrast pills */}
        <div
          data-reveal
          className="reveal mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.22em] sm:mt-12"
        >
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-bone/35 line-through decoration-bone/30">
            Ready-made blanks
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-bone/40" />
          <span className="rounded-full border border-crimson/60 bg-crimson/10 px-4 py-2 text-bone shadow-[0_0_30px_-10px_var(--crimson)]">
            Design to door
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ join ------------------------------- */

function Join() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("err");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("ok");
  };

  const perks = [
    { icon: Bell, label: "On the list" },
    { icon: Zap, label: "Early access" },
    { icon: Crown, label: "First access" },
  ];

  return (
    <section id="join" className="relative px-5 py-24 sm:py-32">
      {/* crimson glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--crimson) 0%, transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-xl text-center">
        <div data-reveal className="reveal mb-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
          — Waitlist —
        </div>
        <h2
          data-reveal
          className="reveal font-display text-4xl uppercase leading-[0.95] text-bone sm:text-6xl"
        >
          Join Drop <span className="text-crimson">01</span>
        </h2>

        <div data-reveal className="reveal mt-8 flex items-center justify-center gap-5 sm:gap-8">
          {perks.map((p) => (
            <div key={p.label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bone/70">
              <p.icon className="h-3.5 w-3.5 text-crimson" />
              {p.label}
            </div>
          ))}
        </div>

        <form
          data-reveal
          onSubmit={submit}
          className="reveal mx-auto mt-10 w-full max-w-md"
        >
          {status === "ok" ? (
            <div className="flex items-center justify-center gap-3 rounded-full border border-crimson/40 bg-crimson/10 px-5 py-3 text-sm text-bone">
              <Check className="h-4 w-4 text-crimson" />
              You're in. Watch your inbox.
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] p-1.5 backdrop-blur transition-all focus-within:border-crimson/50 focus-within:bg-white/[0.05]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "err") setStatus("idle");
                }}
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-bone placeholder:text-bone/35 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-crimson px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-bone shadow-[0_0_30px_-8px_var(--crimson)] transition-all hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" ? "…" : "Join waitlist"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
          {status === "err" && (
            <div className="mt-2 text-xs text-crimson">Enter a valid email.</div>
          )}
        </form>

        <p data-reveal className="reveal mt-5 text-[11px] uppercase tracking-[0.22em] text-bone/40">
          Free to join · No payment · Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- footer ------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-bone/40 sm:flex-row">
        <span>© {new Date().getFullYear()} Mitushi</span>
        <a
          href="https://instagram.com/mitushi.studios"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-bone"
        >
          <Instagram className="h-3.5 w-3.5" />
          mitushi.studios
        </a>
      </div>
    </footer>
  );
}

/* ------------------------------ page ------------------------------- */

export function WaitlistLanding() {
  useReveal();
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-bone bg-grain">
      <FixedHeader />
      <SideRail />
      <Gate />
      <Divider />
      <Why />
      <Divider />
      <Join />
      <Footer />

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .9s var(--ease-out-expo), transform .9s var(--ease-out-expo); }
        .reveal.is-revealed { opacity: 1; transform: translateY(0); }
      `}</style>
    </main>
  );
}

export default WaitlistLanding;
