import { useEffect, useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";

const STORAGE_KEY = "mitushi_newsletter_dismissed_v1";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    setTimeout(close, 1800);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-[940px] overflow-hidden border border-border bg-background shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-500"
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close newsletter"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center border border-border/60 bg-background/80 text-foreground/70 backdrop-blur transition hover:border-crimson hover:bg-crimson hover:text-crimson-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual side (hidden on mobile) */}
          <div className="relative hidden min-h-[460px] overflow-hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1c] via-background to-[#0f0f10]" />
            {/* Crimson sun */}
            <div className="absolute -left-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-crimson/80 blur-3xl opacity-60" />
            <div className="absolute left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border-2 border-crimson/80 bg-crimson/30" />
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #f4f4f4 1px, transparent 1px), linear-gradient(to bottom, #f4f4f4 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* JP vertical */}
            <div className="absolute left-6 top-6 font-jp text-[11px] tracking-[0.5em] text-foreground/60 [writing-mode:vertical-rl]">
              ミツシ・インナーサークル
            </div>
            {/* Big mark */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-stroke text-[clamp(4rem,9vw,7rem)] leading-none">
                  MITUSHI
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.5em] text-crimson">
                  Inner circle
                </div>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute bottom-6 left-6 border border-border/60 bg-background/70 px-3 py-2 backdrop-blur">
              <div className="text-[9px] uppercase tracking-[0.4em] text-foreground/60">Drop 04</div>
              <div className="text-xs font-bold text-foreground">Members only</div>
            </div>
          </div>

          {/* Form side */}
          <div className="relative flex flex-col justify-center p-7 sm:p-10">
            {/* Mobile mini visual */}
            <div className="mb-6 flex items-center gap-3 md:hidden">
              <span className="h-2 w-2 rounded-full bg-crimson" />
              <span className="font-jp text-[10px] tracking-[0.4em] text-foreground/60">
                ミツシ
              </span>
            </div>

            {!submitted ? (
              <>
                <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-crimson">
                  Exclusive discounts
                </div>
                <h2
                  id="newsletter-title"
                  className="mt-3 font-display text-3xl leading-[1.05] tracking-tight text-foreground sm:text-4xl"
                >
                  Join the <span className="text-crimson">MITUSHI</span> inner circle.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">
                  Early access, limited drops, and special offers — straight to your inbox.
                </p>

                <form onSubmit={submit} className="mt-7 space-y-3">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/80">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    className="w-full border-none bg-[#1d1d1f] px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition focus:ring-1 focus:ring-crimson"
                  />
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 bg-crimson py-3.5 text-xs font-bold uppercase tracking-[0.3em] text-crimson-foreground transition hover:bg-crimson-glow"
                  >
                    Join the family
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <button
                  onClick={close}
                  className="mt-5 text-[10px] uppercase tracking-[0.3em] text-foreground/40 transition hover:text-foreground/70"
                >
                  No thanks, I'll pass
                </button>

                <p className="mt-6 text-[10px] leading-relaxed text-foreground/40">
                  By subscribing, you agree to receive marketing emails from Mitushi.
                  Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-crimson text-crimson-foreground">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-foreground">
                  Welcome to the family.
                </h2>
                <p className="mt-2 text-sm text-foreground/70">
                  Check your inbox — your code is on the way.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom crimson bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-crimson to-transparent" />
      </div>
    </div>
  );
}
