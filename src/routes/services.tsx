import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { ServiceCard } from "@/components/ServiceCard";
import { PrimaryLink, WhatsAppLink } from "@/components/CtaButtons";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Foi's Kitchen" },
      {
        name: "description",
        content:
          "Corporate catering, weddings & private events, and weekly meal prep plans — all cooked fresh in Nairobi.",
      },
      { property: "og:title", content: "Our Services — Foi's Kitchen" },
      {
        property: "og:description",
        content: "Corporate catering, weddings & private events, and weekly meal prep plans in Nairobi.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const isServicesIndex = useRouterState({
    select: (s) => s.location.pathname === "/services",
  });

  return (
    <>
      {isServicesIndex && (
        <>
          <PageHero
            eyebrow="Services"
            title="Our services"
            intro="From office lunches to weddings to your weekly meals — one kitchen, three ways to feed you well."
          >
            <PrimaryLink to="/order">Order online</PrimaryLink>
            <WhatsAppLink message={`Hi ${site.name}! I'd like to ask about your services.`}>
              Ask a question
            </WhatsAppLink>
          </PageHero>

          <section className="section-y">
            <div className="container-page">
              <div className="grid gap-6 md:grid-cols-3">
                {services.map((service, i) => (
                  <SectionReveal key={service.id} delay={i * 80}>
                    <ServiceCard service={service} />
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Outlet />
    </>
  );
}
