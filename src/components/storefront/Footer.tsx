import { Instagram, Music2, ArrowRight } from "lucide-react";
import logo from "@/assets/mitushi-logo.png.asset.json";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/60 bg-background pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="relative inline-block">
              <span aria-hidden className="absolute -left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-crimson opacity-90" />
              <img src={logo.url} alt="Mitushi" className="relative h-10 w-auto brightness-[2.2] contrast-125" />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-foreground/70">
              Premium anime streetwear, crafted in limited drops. Tokyo silhouettes,
              luxury construction, worn in silence.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Music2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center border border-border text-foreground/80 transition hover:border-crimson hover:bg-crimson hover:text-crimson-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-crimson">Shop</h4>
              <ul className="space-y-2.5 text-sm text-foreground/80">
                {["Shirts", "Shorts", "Tanks", "New arrivals", "Lookbook"].map((l) => (
                  <li key={l}><a href="#" className="transition hover:text-crimson">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-crimson">Help</h4>
              <ul className="space-y-2.5 text-sm text-foreground/80">
                {["Shipping", "Returns", "Size guide", "Contact", "FAQ"].map((l) => (
                  <li key={l}><a href="#" className="transition hover:text-crimson">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-crimson">
              Join the drop list
            </h4>
            <p className="mb-5 text-sm text-foreground/70">
              First access to releases, exclusive sizes, and members-only fits.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex border border-border focus-within:border-crimson transition">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none"
              />
              <button
                aria-label="Subscribe"
                className="bg-crimson px-5 text-crimson-foreground transition hover:bg-crimson-glow"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-3 font-jp text-[10px] tracking-[0.4em] text-foreground/40">
              ミツシ・コミュニティへようこそ
            </p>
          </div>
        </div>

        {/* Giant brand mark */}
        <div className="relative mt-20 overflow-hidden border-t border-border/60 pt-10">
          <div className="font-display text-stroke select-none text-[clamp(5rem,18vw,18rem)] leading-none">
            MITUSHI
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50 md:flex-row md:items-center">
          <div>© 2026 Mitushi Studio · All rights reserved</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-crimson">Privacy</a>
            <a href="#" className="hover:text-crimson">Terms</a>
            <a href="#" className="hover:text-crimson">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
