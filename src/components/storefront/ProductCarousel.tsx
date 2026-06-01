import { useRef } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import s1 from "@/assets/product-shirt-1.jpg";
import s1b from "@/assets/product-shirt-1-back.jpg";
import s2 from "@/assets/product-shirt-2.jpg";
import s2b from "@/assets/product-shirt-2-back.jpg";
import t1 from "@/assets/product-tank-1.jpg";
import t1b from "@/assets/product-tank-1-back.jpg";
import sh1 from "@/assets/product-shorts-1.jpg";
import sh1b from "@/assets/product-shorts-1-back.jpg";

const products = [
  { id: 1, name: "Kanji Oversized Tee", tag: "Ghost / 鬼", price: 89, front: s1, back: s1b, badge: "New" },
  { id: 2, name: "Samurai Print Tee", tag: "Crimson Warrior", price: 95, front: s2, back: s2b, badge: "Hot" },
  { id: 3, name: "Bone Tank · 億", tag: "Oni / 億", price: 65, front: t1, back: t1b },
  { id: 4, name: "Striped Shorts", tag: "Rising Sun", price: 79, front: sh1, back: sh1b, badge: "Drop 03" },
  { id: 5, name: "Tokyo Tee", tag: "Night Series", price: 89, front: s1, back: s1b },
  { id: 6, name: "Onsen Shorts", tag: "Mono", price: 79, front: sh1, back: sh1b },
];

export function ProductCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.5em] text-crimson">
              / 02 — Latest drop
            </div>
            <h2 className="font-display text-5xl md:text-7xl">Featured pieces</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Prev" className="rounded-full border border-border p-3 hover:border-crimson hover:text-crimson transition">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next" className="rounded-full border border-border p-3 hover:border-crimson hover:text-crimson transition">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={ref} className="hide-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative w-[78vw] flex-shrink-0 snap-start sm:w-[360px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                <img
                  src={p.front}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={p.back}
                  alt={`${p.name} alternate`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 bg-crimson px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-foreground">
                    {p.badge}
                  </span>
                )}
                <button className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-bone/95 text-ink opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-crimson hover:text-crimson-foreground">
                  <Plus className="h-4 w-4" />
                </button>

                {/* Slide-up CTA */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 p-4 backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Quick add</div>
                      <div className="font-display text-xl">${p.price}</div>
                    </div>
                    <button className="bg-crimson px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-foreground transition hover:bg-crimson-glow">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-foreground/50">{p.tag}</p>
                </div>
                <div className="font-display text-lg">${p.price}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
