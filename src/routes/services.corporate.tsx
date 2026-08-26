import { createFileRoute } from "@tanstack/react-router";
import { Check, Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { PrimaryLink, WhatsAppLink } from "@/components/CtaButtons";
import { currency, site } from "@/lib/site";
import corporate from "@/assets/corporate.jpg";

export const Route = createFileRoute("/services/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Catering in Nairobi — Foi's Kitchen" },
      {
        name: "description",
        content:
          "Office lunches, board meetings and staff events catered across Nairobi. Package tiers, sample menus and a same-day quotation.",
      },
      { property: "og:title", content: "Corporate Catering in Nairobi — Foi's Kitchen" },
      {
        property: "og:description",
        content: "Reliable office catering with clear per-head pricing and a 20-person minimum.",
      },
    ],
  }),
  component: CorporatePage,
});

// [PLACEHOLDER] Package tiers and per-head pricing.
const tiers = [
  {
    name: "Desk Lunch",
    price: 650,
    per: "per head",
    includes: ["One main + one side", "Fresh juice or water", "Boxed and labelled", "Delivered by 12:30pm"],
  },
  {
    name: "Meeting Spread",
    price: 1200,
    per: "per head",
    includes: ["Two mains + two sides", "Salad and dessert", "Chafing dishes and serving staff", "Setup 30 min before"],
  },
  {
    name: "Company Event",
    price: 1900,
    per: "per head",
    includes: ["Full buffet, four mains", "Live nyama choma station", "Drinks station and desserts", "Full service team"],
  },
];

const sampleMenus = [
  { title: "Kenyan classic", items: "Beef pilau · Sukuma wiki · Chapati · Kachumbari · Fruit platter" },
  { title: "Light & lean", items: "Grilled chicken · Brown rice · Steamed greens · Garden salad · Fresh juice" },
  { title: "Plant forward", items: "Coconut lentil stew · Roasted veg · Chapati · Avocado salad · Chai" },
];

function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate catering"
        title="Office food that arrives on time and tastes like home."
        intro="From Monday desk lunches to the end-of-year party. Clear per-head pricing, one contact on WhatsApp, no surprises on the invoice."
      >
        <PrimaryLink to="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink message={`Hi ${site.name}! I'd like corporate catering for my team.`}>
          Chat on WhatsApp
        </WhatsAppLink>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionReveal>
            <img
              src={corporate}
              alt="[PLACEHOLDER] Office lunch catering setup"
              loading="lazy"
              width={1400}
              height={1000}
              className="aspect-[7/5] w-full rounded-2xl object-cover shadow-card md:aspect-[21/9]"
            />
          </SectionReveal>

          <SectionReveal className="mt-12">
            <p className="label-caps text-primary">Packages</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">Three tiers, fully adjustable</h2>
            <p className="mt-2 text-muted-foreground">
              Minimum order: 20 people. Orders confirmed at least 24 hours ahead.
            </p>
          </SectionReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <SectionReveal key={tier.name} delay={i * 80} className="flex flex-col gap-4 rounded-2xl bg-card p-6 shadow-card">
                <h3 className="font-display text-xl font-semibold">
                  {tier.name} — <span className="text-primary">{currency(tier.price)}</span>{" "}
                  <span className="text-sm font-normal text-muted-foreground">{tier.per}</span>
                </h3>
                <ul className="space-y-2 text-sm">
                  {tier.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <PrimaryLink to="/quote" className="w-full">Request a quote</PrimaryLink>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-card">
        <div className="container-page">
          <SectionReveal>
            <p className="label-caps text-primary">Sample menus</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">Pick a direction, we'll tailor it</h2>
          </SectionReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sampleMenus.map((m, i) => (
              <SectionReveal key={m.title} delay={i * 80} className="rounded-2xl bg-background p-6">
                <h3 className="font-display text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.items}</p>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="mt-10">
            {/* [PLACEHOLDER] Swap for the real corporate menu PDF once supplied. */}
            <a
              href="#"
              className="label-caps inline-flex min-h-[48px] items-center gap-2 rounded-full border border-foreground/20 px-6 transition-all duration-200 ease-out hover:scale-[1.02] hover:border-primary hover:text-primary active:scale-[0.97]"
            >
              <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Download menu PDF [PLACEHOLDER]
            </a>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
