import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";
import logo from "@/assets/mitushi-logo.png.asset.json";

const nav = [
  { label: "Home", href: "#home", active: true },
  { label: "Products", href: "#products", dropdown: ["Shirts", "Shorts", "Tanks"] },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 glass border-b transition-all duration-300 ${
        scrolled ? "border-border/60 py-2" : "border-transparent py-3"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6">
        {/* Logo with red sun */}
        <a href="#home" className="relative flex items-center">
          <span
            aria-hidden
            className="absolute -left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-crimson opacity-90 blur-[1px]"
          />
          <img
            src={logo.url}
            alt="Mitushi"
            className="relative h-12 w-auto crimson-glow brightness-[2.2] contrast-125"
          />
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className={`flex items-center gap-1 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors ${
                  item.active ? "text-crimson" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
                {item.dropdown && <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />}
                {item.active && (
                  <span className="absolute bottom-1 left-1/2 h-px w-6 -translate-x-1/2 bg-crimson" />
                )}
              </a>
              {item.dropdown && (
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="glass min-w-[180px] border border-border/60 p-2 shadow-card">
                    {item.dropdown.map((d) => (
                      <a
                        key={d}
                        href={`#${d.toLowerCase()}`}
                        className="block px-4 py-2.5 text-xs uppercase tracking-[0.24em] text-foreground/80 transition-colors hover:bg-crimson/10 hover:text-crimson"
                      >
                        {d}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs hover:border-crimson/60 transition">
            <span className="flex h-4 w-6 overflow-hidden rounded-sm">
              <span className="h-full w-full bg-[#0038b8] relative">
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white">✡</span>
              </span>
            </span>
            <span className="font-medium tracking-wide">USD $</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          <button aria-label="Search" className="rounded-full p-2.5 text-foreground/80 hover:bg-crimson/10 hover:text-crimson transition">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2.5 text-foreground/80 hover:bg-crimson/10 hover:text-crimson transition">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[9px] font-bold text-crimson-foreground">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
