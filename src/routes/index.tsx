import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { Header } from "@/components/storefront/Header";
import { Hero } from "@/components/storefront/Hero";
import { Categories } from "@/components/storefront/Categories";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { Footer } from "@/components/storefront/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mitushi — Premium Anime Streetwear" },
      { name: "description", content: "Mitushi: limited-drop anime streetwear. Premium tees, tanks, and shorts crafted with Tokyo silhouettes and luxury construction." },
      { property: "og:title", content: "Mitushi — Premium Anime Streetwear" },
      { property: "og:description", content: "Limited-drop anime streetwear. Premium tees, tanks, and shorts crafted with Tokyo silhouettes." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Categories />
        <ProductCarousel />
      </main>
      <Footer />
    </div>
  );
}
