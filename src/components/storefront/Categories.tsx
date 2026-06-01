import shirts from "@/assets/cat-shirts.jpg";
import shorts from "@/assets/cat-shorts.jpg";
import tanks from "@/assets/cat-tanks.jpg";
import { ArrowUpRight } from "lucide-react";

const cats = [
  { name: "Shirts", jp: "シャツ", count: "24 pieces", img: shirts, big: true },
  { name: "Shorts", jp: "ショーツ", count: "12 pieces", img: shorts },
  { name: "Tanks", jp: "タンク", count: "9 pieces", img: tanks },
];

export function Categories() {
  return (
    <section id="products" className="relative border-y border-border/60 bg-background py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.5em] text-crimson">
              / 01 — Collections
            </div>
            <h2 className="font-display text-5xl md:text-7xl">Shop by category</h2>
          </div>
          <a href="#" className="hidden text-xs uppercase tracking-[0.3em] text-foreground/70 hover:text-crimson md:block">
            View all →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
          {cats.map((c, i) => (
            <a
              key={c.name}
              href={`#${c.name.toLowerCase()}`}
              className={`group relative block overflow-hidden bg-card ${
                c.big ? "md:col-span-2 md:row-span-2" : "md:row-span-1"
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden md:aspect-auto md:h-full">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[20%] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-jp text-sm text-foreground/70">{c.jp}</span>
                  <span className="rounded-full border border-bone/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-bone/80 backdrop-blur">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/60">{c.count}</div>
                  <div className="mt-2 flex items-end justify-between">
                    <h3 className="font-display text-5xl md:text-7xl">{c.name}</h3>
                    <ArrowUpRight className="h-8 w-8 translate-x-2 text-crimson opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-crimson/60" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
