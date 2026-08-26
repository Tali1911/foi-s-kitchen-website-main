import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
] as const;

const serviceLinks = [
  { to: "/services/corporate", label: "Corporate Catering" },
  { to: "/services/weddings", label: "Weddings & Private Events" },
  { to: "/services/meal-prep", label: "Meal Prep Plans" },
] as const;

const orderLinks = [
  { to: "/order", label: "Order Online" },
  { to: "/quote", label: "Request a Quotation" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { count, bump } = useCart();
  const [bumping, setBumping] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (bump === 0) return;
    setBumping(true);
    const t = window.setTimeout(() => setBumping(false), 320);
    return () => window.clearTimeout(t);
  }, [bump]);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-foreground text-background">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
            F
          </span>
          <span className="truncate font-display text-lg font-bold">{site.name}</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {mainLinks.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}

          <Dropdown label="Services" links={serviceLinks} />

          <NavItem to="/menu" label="Menu" />

          <Dropdown label="Order Now" links={orderLinks} variant="button" />

          <NavItem to="/gallery" label="Gallery & Reviews" />
          <NavItem to="/contact" label="Contact" />

          <Link
            to="/order"
            aria-label={`Your order (${count} items)`}
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 ease-out hover:bg-background/10",
              bumping && "scale-110",
            )}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute top-1 right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-200 ease-out hover:bg-background/10 lg:hidden"
        >
          {mobileOpen ? <Menu className="hidden" /> : null}
          {mobileOpen ? (
            <X className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="animate-fade-up border-t border-background/15 bg-foreground lg:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            <MobileLink to="/" label="Home" />
            <MobileLink to="/about" label="About" />

            <button
              type="button"
              onClick={() => setServicesOpen((o) => !o)}
              aria-expanded={servicesOpen}
              className="flex min-h-[48px] items-center justify-between font-display text-base font-semibold"
            >
              Services
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200 ease-out", servicesOpen && "rotate-180")}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
            {servicesOpen &&
              serviceLinks.map((l) => (
                <MobileLink key={l.to} to={l.to} label={l.label} indent />
              ))}

            <MobileLink to="/menu" label="Menu" />
            <MobileLink to="/gallery" label="Gallery & Reviews" />
            <MobileLink to="/contact" label="Contact" />
            <MobileLink to="/quote" label="Request a Quotation" />
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      activeProps={{ className: "text-primary" }}
      activeOptions={{ exact: to === "/" }}
      className="font-display text-sm font-semibold transition-colors duration-200 ease-out hover:text-primary"
    >
      {label}
    </Link>
  );
}

function Dropdown({
  label,
  links,
  variant = "text",
}: {
  label: string;
  links: readonly { to: string; label: string }[];
  variant?: "text" | "button";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex min-h-[44px] items-center gap-1 font-display text-sm font-semibold transition-all duration-200 ease-out",
          variant === "button"
            ? "rounded-full bg-primary px-5 text-primary-foreground uppercase tracking-[0.5px] hover:bg-primary-deep hover:scale-[1.02] active:scale-[0.97]"
            : "hover:text-primary",
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200 ease-out", open && "rotate-180")}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="animate-fade-up absolute top-full left-0 w-64 rounded-xl border border-border bg-card p-2 text-card-foreground shadow-lift">
          {links.map((l) => (
            <Link
              key={l.to}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={l.to as any}
              className="block rounded-lg px-3 py-3 text-sm transition-colors duration-200 ease-out hover:bg-secondary hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileLink({
  to,
  label,
  indent = false,
}: {
  to: string;
  label: string;
  indent?: boolean;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      activeProps={{ className: "text-primary" }}
      activeOptions={{ exact: to === "/" }}
      className={cn(
        "flex min-h-[48px] items-center font-display text-base font-semibold transition-colors duration-200 ease-out hover:text-primary",
        indent && "pl-4 text-sm font-normal opacity-90",
      )}
    >
      {label}
    </Link>
  );
}
