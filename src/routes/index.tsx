import { createFileRoute } from "@tanstack/react-router";
import { WaitlistLanding } from "@/components/storefront/WaitlistLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mitushi — Drop 01 Early Access" },
      { name: "description", content: "Join the Mitushi waitlist. Premium Japanese streetwear, Drop 01 coming soon. Early access — no payment required." },
      { property: "og:title", content: "Mitushi — Drop 01 Early Access" },
      { property: "og:description", content: "Premium Japanese streetwear. Join the list for early access to Drop 01." },
    ],
  }),
  component: Index,
});

function Index() {
  return <WaitlistLanding />;
}
