import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Leaf, MessageCircle, ClipboardCheck, CookingPot, Bike } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { MealOfTheDay } from "@/components/MealOfTheDay";
import { PrimaryLink, OutlineLink } from "@/components/CtaButtons";
import { testimonials } from "@/data/testimonials";
import { categories, menuItems } from "@/data/menu";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foi's Kitchen — Home-Style Catering & Meal Prep in Nairobi" },
      {
        name: "description",
        content:
          "Fresh home-style food for events, offices and your week. Order online or on WhatsApp — catering, meal prep plans and daily menus in Nairobi.",
      },
      { property: "og:title", content: "Foi's Kitchen — Home-Style Catering & Meal Prep in Nairobi" },
      {
        property: "og:description",
        content: "Catering, meal prep plans and online food orders in Nairobi. Order in minutes.",
      },
    ],
  }),
  component: HomePage,
});

const heroSlides = [
  { src: hero1, alt: "Kenyan feast spread on a wooden table" },
  { src: hero2, alt: "Garden event buffet at golden hour" },
  { src: hero3, alt: "Meal prep containers ready for delivery" },
];

const features = [
  { icon: Leaf, title: "Fresh daily", body: "Cooked the morning it's delivered. Never reheated stock." },
  { icon: ChefHat, title: "Custom catering", body: "From 20-person office lunches to 300-guest weddings." },
  { icon: MessageCircle, title: "WhatsApp support", body: "A real person replies. Usually within a few minutes." },
];

const steps = [
  { icon: ClipboardCheck, title: "Order", body: "Pick your dishes or tell us about the event." },
  { icon: MessageCircle, title: "Confirm", body: "We agree the menu, timing and price on WhatsApp." },
  { icon: CookingPot, title: "Prepare", body: "Everything is cooked fresh in our Nairobi kitchen." },
  { icon: Bike, title: "Deliver", body: "Hot, on time, wherever you are in the city." },
];

const featuredCategories = categories.map((c) => ({
  name: c,
  image: menuItems.find((m) => m.category === c)!.image,
}));

function HomePage() {
  const [slide, setSlide] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[78vh] overflow-hidden md:min-h-[86vh]">
        {heroSlides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={1600}
            height={1008}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out",
              i === slide ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-foreground/60" />

        <div className="container-page relative flex min-h-[78vh] flex-col justify-end pt-20 pb-16 md:min-h-[86vh] md:pb-24">
          <p className="label-caps animate-fade-up text-background/80">Nairobi · Catering &amp; meal prep</p>
          <h1
            className="animate-fade-up mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.1] font-bold text-background sm:text-5xl md:text-[3.4rem]"
            style={{ animationDelay: "100ms" }}
          >
            Home-style food, cooked fresh and delivered hot.
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-xl text-base text-background/85 md:text-[17px]"
            style={{ animationDelay: "200ms" }}
          >
            Catering for your event, meal prep for your week, and daily orders for
            the days you'd rather not cook.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "300ms" }}>
            <PrimaryLink to="/order">Order now</PrimaryLink>
            <Link
              to="/menu"
              className="label-caps inline-flex min-h-[48px] items-center justify-center rounded-full border border-background/40 px-6 text-background transition-all duration-200 ease-out hover:scale-[1.02] hover:border-background active:scale-[0.97]"
            >
              See the menu
            </Link>
          </div>

          <div className="mt-10 flex gap-2" role="tablist" aria-label="Hero images">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === slide}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setSlide(i)}
                className="grid h-11 w-11 place-items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300 ease-out",
                    i === slide ? "w-8 bg-primary" : "w-4 bg-background/50",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-y bg-card">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 80} className="flex flex-col gap-3">
              <f.icon className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">{f.title}</h2>
              <p className="text-muted-foreground">{f.body}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Featured categories */}
      <section className="section-y">
        <div className="container-page">
          <SectionReveal>
            <p className="label-caps text-primary">The menu</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">
              Start with what you're craving
            </h2>
          </SectionReveal>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredCategories.map((c, i) => (
              <SectionReveal key={c.name} delay={i * 60}>
                <Link
                  to="/menu"
                  search={{ category: c.name }}
                  className="group block overflow-hidden rounded-2xl bg-card shadow-card"
                >
                  <span className="block aspect-square overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="label-caps block px-4 py-4 text-center">{c.name}</span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <MealOfTheDay />

      {/* How it works */}
      <section className="section-y bg-card">
        <div className="container-page">
          <SectionReveal>
            <p className="label-caps text-primary">How it works</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">
              Four steps, no back and forth
            </h2>
          </SectionReveal>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <SectionReveal as="li" key={s.title} delay={i * 80} className="flex flex-col gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary">
                  <s.icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </SectionReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y">
        <div className="container-page">
          <SectionReveal>
            <p className="label-caps text-primary">Kind words</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-semibold md:text-[2rem]">
              People keep coming back
            </h2>
          </SectionReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.id} delay={i * 60}>
                <TestimonialCard testimonial={t} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-foreground text-background">
        <div className="container-page py-16 text-center md:py-20">
          <SectionReveal>
            <h2 className="mx-auto max-w-2xl font-display text-[1.75rem] font-semibold md:text-[2rem]">
              Feeding two people or two hundred? {site.name} can handle it.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrimaryLink to="/order">Order online</PrimaryLink>
              <Link
                to="/quote"
                className="label-caps inline-flex min-h-[48px] items-center justify-center rounded-full border border-background/40 px-6 transition-all duration-200 ease-out hover:scale-[1.02] hover:border-background active:scale-[0.97]"
              >
                Request a quotation
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Keeps the outline link component referenced for shared styling */}
      <div className="sr-only">
        <OutlineLink to="/about">About Foi's Kitchen</OutlineLink>
      </div>
    </>
  );
}
