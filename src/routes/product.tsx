import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Ruler, ChevronDown, ShoppingBag, Heart, Truck } from "lucide-react";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import front from "@/assets/product-shirt-1.jpg";
import back from "@/assets/product-shirt-1-back.jpg";
import alt1 from "@/assets/product-shirt-2.jpg";
import alt2 from "@/assets/product-shirt-2-back.jpg";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "GUM GUM Tee — Mitushi" },
      { name: "description", content: "GUM GUM Tee — premium anime streetwear by Mitushi. Heavyweight cotton, oversized fit, Tokyo-pressed crimson print." },
      { property: "og:title", content: "GUM GUM Tee — Mitushi" },
      { property: "og:description", content: "Premium anime streetwear. Heavyweight cotton, oversized fit." },
    ],
  }),
  component: ProductPage,
});

const SIZES = ["S", "M", "L", "XL", "2XL"] as const;
const GALLERY = [front, back, alt1, alt2];

const TABS = [
  {
    id: "description",
    title: "Description",
    body: "Cut from 280gsm heavyweight cotton with a boxy Tokyo silhouette. Hand-pressed crimson chest mark, ribbed crew, and tonal woven hem flag. Designed in Osaka, printed in limited drops of 200.",
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    body: "Free worldwide shipping on orders over $199. Express 2–4 days. 30-day returns on unworn pieces with tags intact. Drop pieces are final sale.",
  },
  {
    id: "fabric",
    title: "Fabric & Care",
    body: "100% combed organic cotton. Cold wash inside-out. Hang dry to preserve print. Do not iron directly on graphics.",
  },
];

function ProductPage() {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string>("M");
  const [qty, setQty] = useState(1);
  const [openTab, setOpenTab] = useState<string | null>("description");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
          <Link to="/" className="hover:text-crimson">Home</Link>
          <span>/</span>
          <span>Shirts</span>
          <span>/</span>
          <span className="text-foreground">GUM GUM Tee</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row">
            <div className="flex gap-3 lg:flex-col">
              {GALLERY.map((src, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden border transition-all ${
                    active === i ? "border-crimson" : "border-border/60 hover:border-foreground/40"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1">
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                {GALLERY.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="GUM GUM Tee"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <span className="absolute left-4 top-4 bg-crimson px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-foreground">
                  Drop 03
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:pl-8">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.5em] text-crimson">
              / Ghost — 鬼
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-none">GUM GUM Tee</h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl text-crimson">$48.00</span>
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/50">USD</span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
              Heavyweight 280gsm oversized tee with hand-pressed crimson chest mark and tonal woven hem flag. Limited drop of 200.
            </p>

            {/* Size */}
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/70">Size</span>
                <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground/60 hover:text-crimson transition">
                  <Ruler className="h-3 w-3" />
                  Size chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 w-12 border text-xs font-bold uppercase tracking-wider transition-all ${
                      size === s
                        ? "border-crimson bg-crimson text-crimson-foreground"
                        : "border-border/60 text-foreground hover:border-crimson"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="mt-8 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center border border-border/60">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-foreground/70 hover:text-crimson transition"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-12 w-12 place-items-center text-foreground/70 hover:text-crimson transition"
                  aria-label="Increase"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <Link
                to="/cart"
                className="group relative flex-1 overflow-hidden border border-foreground bg-foreground text-ink min-w-[200px]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-crimson transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <span className="relative flex h-12 items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 group-hover:text-crimson-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </span>
              </Link>

              <button
                aria-label="Wishlist"
                className="grid h-12 w-12 place-items-center border border-border/60 text-foreground/70 hover:text-crimson hover:border-crimson transition"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-foreground/60">
              <Truck className="h-3.5 w-3.5 text-crimson" />
              Free worldwide shipping over $199
            </div>

            {/* Accordions */}
            <div className="mt-10 border-t border-border/60">
              {TABS.map((t) => {
                const open = openTab === t.id;
                return (
                  <div key={t.id} className="border-b border-border/60">
                    <button
                      onClick={() => setOpenTab(open ? null : t.id)}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{t.title}</span>
                      <span className={`relative grid h-5 w-5 place-items-center transition-transform duration-300 ${open ? "rotate-45 text-crimson" : ""}`}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className="grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        <p className="pb-5 pr-8 text-sm leading-relaxed text-foreground/65">{t.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
