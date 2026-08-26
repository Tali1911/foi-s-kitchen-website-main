import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppLink } from "@/components/CtaButtons";
import { currency, site } from "@/lib/site";
import wedding1 from "@/assets/wedding-1.jpg";
import wedding2 from "@/assets/wedding-2.jpg";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/services/weddings")({
  head: () => ({
    meta: [
      { title: "Wedding & Private Event Catering — Foi's Kitchen Nairobi" },
      {
        name: "description",
        content:
          "Wedding and private event catering in Nairobi. Past events, package overview, lead times and a direct enquiry form.",
      },
      { property: "og:title", content: "Wedding & Private Event Catering — Foi's Kitchen" },
      {
        property: "og:description",
        content: "Warm, generous food for weddings and private celebrations across Nairobi.",
      },
    ],
  }),
  component: WeddingsPage,
});

// [PLACEHOLDER] Package overview.
const packages = [
  {
    name: "Intimate",
    price: 1800,
    guests: "Up to 60 guests",
    includes: ["Three-course plated or buffet", "Service team of four", "Crockery and chafing dishes", "Cake cutting service"],
  },
  {
    name: "Celebration",
    price: 2400,
    guests: "60 – 200 guests",
    includes: ["Five-dish buffet + dessert table", "Canapés on arrival", "Full service and clearing team", "Drinks station"],
  },
  {
    name: "Grand",
    price: 3200,
    guests: "200+ guests",
    includes: ["Full buffet with live stations", "Dedicated event lead", "Bridal table service", "Late-night bites"],
  },
];

const gallery = [
  { src: wedding1, alt: "[PLACEHOLDER] Reception table setting" },
  { src: hero2, alt: "[PLACEHOLDER] Garden buffet at golden hour" },
  { src: wedding2, alt: "[PLACEHOLDER] Canapés served to guests" },
];

function WeddingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Weddings & private events"
        title="The food people remember, long after the speeches."
        intro="Generous, home-style menus served properly — for weddings, ruracios, birthdays and anything worth cooking for."
      >
        <WhatsAppLink message={`Hi ${site.name}! I'm planning a wedding and would like to talk about catering.`}>
          Chat on WhatsApp
        </WhatsAppLink>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionReveal>
            <p className="label-caps text-primary">Past events</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">A few we've cooked for</h2>
          </SectionReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {gallery.map((g, i) => (
              <SectionReveal key={g.alt} delay={i * 80}>
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card transition-transform duration-300 ease-out hover:scale-[1.02]"
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-card">
        <div className="container-page">
          <SectionReveal>
            <p className="label-caps text-primary">Packages</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">Priced per guest, tailored to your day</h2>
          </SectionReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {packages.map((p, i) => (
              <SectionReveal key={p.name} delay={i * 80} className="flex flex-col gap-4 rounded-2xl bg-background p-6">
                <h3 className="font-display text-xl font-semibold">
                  {p.name} — <span className="text-primary">{currency(p.price)}</span>{" "}
                  <span className="text-sm font-normal text-muted-foreground">per guest</span>
                </h3>
                <p className="text-sm text-muted-foreground">{p.guests}</p>
                <ul className="space-y-2 text-sm">
                  {p.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="mt-8 flex items-start gap-3 rounded-2xl bg-secondary p-5">
            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden="true" />
            <p className="text-sm">
              <strong className="font-display font-semibold">Booking lead time:</strong> weddings need at
              least 6 weeks' notice, private parties 2 weeks. Peak season (December, April) books out early.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <SectionReveal>
            <p className="label-caps text-primary">Enquire</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">Tell us about your day</h2>
            <p className="mt-3 text-muted-foreground">
              Send the details and we'll come back with a menu and a price. If it's
              faster, WhatsApp us instead — the button follows you down the page.
            </p>
          </SectionReveal>

          <SectionReveal delay={80} className="rounded-2xl bg-card p-6 shadow-card">
            <QuoteForm context="Wedding / private event" />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
