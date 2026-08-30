import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuCard } from "@/components/MenuCard";
import { PrimaryLink } from "@/components/CtaButtons";
import { categories, menuItems, type Category, type Diet } from "@/data/menu";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.enum(categories).optional(),
});

export const Route = createFileRoute("/menu")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Menu — Foi's Kitchen Nairobi" },
      {
        name: "description",
        content:
          "Breakfast, mains, sides, drinks and desserts from Foi's Kitchen. Browse prices, add to your order and check out on WhatsApp.",
      },
      { property: "og:title", content: "Menu — Foi's Kitchen Nairobi" },
      {
        property: "og:description",
        content: "Browse the full Foi's Kitchen menu and add dishes to your order.",
      },
    ],
  }),
  component: MenuPage,
});

const diets: Diet[] = ["Vegetarian", "Vegan", "High protein", "Gluten free"];

function MenuPage() {
  const { category } = Route.useSearch();
  const [active, setActive] = useState<Category>(category ?? categories[0]);
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<Diet | null>(null);

  const items = useMemo(
    () =>
      menuItems.filter(
        (m) =>
          m.category === active &&
          (!diet || m.diet.includes(diet)) &&
          (query.trim() === "" ||
            `${m.name} ${m.description}`.toLowerCase().includes(query.toLowerCase())),
      ),
    [active, query, diet],
  );

  return (
    <>
      <PageHero
        eyebrow="Menu"
        title="Today's kitchen, priced clearly."
        intro="Add what you like to your order and finish on WhatsApp — no account needed."
      >
        <PrimaryLink to="/order">Go to your order</PrimaryLink>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-5">
            <CategoryTabs options={categories} value={active} onChange={setActive} label="Menu categories" />

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes"
                  aria-label="Search dishes"
                  className="min-h-[48px] w-full rounded-full border border-input bg-card pr-4 pl-11 text-base outline-none transition-colors duration-200 ease-out focus:border-primary"
                />
              </div>

              <ul className="scroll-row -mx-5 px-5 sm:mx-0 sm:flex-wrap sm:px-0">
                {diets.map((d) => (
                  <li key={d}>
                    <button
                      type="button"
                      onClick={() => setDiet(diet === d ? null : d)}
                      aria-pressed={diet === d}
                      className={cn(
                        "min-h-[44px] rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ease-out",
                        diet === d
                          ? "border-sage bg-sage text-sage-foreground"
                          : "border-input text-muted-foreground hover:border-sage hover:text-sage",
                      )}
                    >
                      {d}
                    </button>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {items.length === 0 ? (
            <p className="mt-12 text-center text-muted-foreground">
              Nothing matches that yet — try another category or clear the filters.
            </p>
          ) : (
            <div
              key={`${active}-${diet}-${query}`}
              className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {items.map((item, i) => (
                <MenuCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
