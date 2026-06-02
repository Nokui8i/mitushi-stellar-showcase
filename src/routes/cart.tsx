import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import img1 from "@/assets/product-shirt-1.jpg";
import img2 from "@/assets/product-shirt-2.jpg";
import img3 from "@/assets/product-tank-1.jpg";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Mitushi" },
      { name: "description", content: "Your Mitushi cart. Review your anime streetwear drop selection and checkout." },
    ],
  }),
  component: CartPage,
});

type Item = {
  id: number;
  name: string;
  tag: string;
  size: string;
  qty: number;
  price: number;
  image: string;
};

const INITIAL: Item[] = [
  { id: 1, name: "GUM GUM Tee", tag: "Ghost / 鬼", size: "M", qty: 1, price: 48, image: img1 },
  { id: 2, name: "Samurai Print Tee", tag: "Crimson Warrior", size: "L", qty: 2, price: 95, image: img2 },
  { id: 3, name: "Bone Tank · 億", tag: "Oni / 億", size: "M", qty: 1, price: 65, image: img3 },
];

function CartPage() {
  const [items, setItems] = useState<Item[]>(INITIAL);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const freeThreshold = 199;
  const shipping = subtotal >= freeThreshold ? 0 : 14;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / freeThreshold) * 100);
  const remaining = Math.max(0, freeThreshold - subtotal);

  const update = (id: number, qty: number) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id: number) => setItems((arr) => arr.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.5em] text-crimson">
              / Bag
            </div>
            <h1 className="font-display text-5xl md:text-6xl">Your cart</h1>
          </div>
          <div className="hidden text-xs uppercase tracking-[0.3em] text-foreground/50 md:block">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="border-y border-border/60">
                {items.map((it) => (
                  <CartRow key={it.id} item={it} onChange={update} onRemove={remove} />
                ))}
              </div>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foreground/60 hover:text-crimson transition"
              >
                ← Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-border/60 bg-card p-7">
                <h2 className="font-display text-2xl">Order summary</h2>

                {/* Free shipping progress */}
                <div className="mt-5">
                  <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-foreground/70">
                    {shipping === 0 ? (
                      <span className="text-crimson">★ You unlocked free shipping</span>
                    ) : (
                      <>Add <span className="text-crimson">${remaining.toFixed(2)}</span> for free shipping</>
                    )}
                  </div>
                  <div className="h-1 w-full overflow-hidden bg-foreground/10">
                    <div
                      className="h-full bg-crimson transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <dl className="mt-6 space-y-3 text-sm">
                  <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                  <Row
                    label="Shipping"
                    value={shipping === 0 ? <span className="text-crimson font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                  />
                  <div className="my-4 h-px bg-border/60" />
                  <Row label={<span className="text-[11px] uppercase tracking-[0.3em]">Total</span>} value={<span className="font-display text-2xl">${total.toFixed(2)}</span>} />
                </dl>

                <MagneticCheckout />

                <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                  <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Secure checkout</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> 30-day returns</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-foreground/70">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

function CartRow({ item, onChange, onRemove }: { item: Item; onChange: (id: number, q: number) => void; onRemove: (id: number) => void }) {
  return (
    <div className="flex gap-5 border-b border-border/60 py-6 last:border-b-0">
      <Link to="/product" className="block h-28 w-24 flex-shrink-0 overflow-hidden bg-card sm:h-32 sm:w-28">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-none">{item.name}</h3>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground/50">{item.tag}</p>
            <p className="mt-2 text-xs text-foreground/70">
              Size <span className="ml-1 inline-block border border-border/60 px-2 py-0.5 text-[10px] font-bold tracking-wider">{item.size}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-lg">${(item.price * item.qty).toFixed(2)}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">${item.price} ea</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border/60">
            <button
              onClick={() => onChange(item.id, item.qty - 1)}
              className="grid h-9 w-9 place-items-center text-foreground/70 hover:text-crimson transition"
              aria-label="Decrease"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-medium tabular-nums">{item.qty}</span>
            <button
              onClick={() => onChange(item.id, item.qty + 1)}
              className="grid h-9 w-9 place-items-center text-foreground/70 hover:text-crimson transition"
              aria-label="Increase"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-crimson transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function MagneticCheckout() {
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    setT({ x, y });
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="group relative mt-7 block w-full overflow-hidden bg-crimson"
      style={{ transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <span className="absolute -inset-px bg-crimson-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span
        className="absolute left-0 top-0 h-full w-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, white 18%, transparent), transparent 60%)",
        }}
      />
      <span className="relative flex h-14 items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.35em] text-crimson-foreground">
        Proceed to checkout
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
      </span>
    </button>
  );
}

function EmptyCart() {
  return (
    <div className="border border-border/60 py-24 text-center">
      <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-crimson">/ Empty</div>
      <h2 className="font-display text-4xl">Your bag is quiet</h2>
      <p className="mt-3 text-sm text-foreground/60">No drops yet. The next release won't wait.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-crimson px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-foreground hover:bg-crimson-glow transition"
      >
        Explore the drop <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
