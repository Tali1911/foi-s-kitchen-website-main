import { useEffect, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { currency } from "@/lib/site";
import { cn } from "@/lib/utils";

type OrderItem = { name: string; qty: number; price: number };
type Order = {
  id: string;
  created_at: string;
  items: OrderItem[];
  total: number;
  method: string;
  status: string;
};

export const Route = createFileRoute("/account/orders")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/sign-in" });
    return { user: data.user };
  },
  head: () => ({
    meta: [
      { title: "My orders — Foi's Kitchen" },
      { name: "description", content: "Track the status of your Foi's Kitchen food orders, from received to delivered." },
      { property: "og:title", content: "My orders — Foi's Kitchen" },
      { property: "og:description", content: "Track your Foi's Kitchen orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

export function statusClass(status: string) {
  switch (status) {
    case "Preparing":
    case "Out for delivery":
    case "Ready for pickup":
      return "bg-primary text-primary-foreground";
    case "Completed":
      return "bg-sage text-sage-foreground";
    case "Cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-foreground";
  }
}

function OrdersPage() {
  const { user } = Route.useRouteContext();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("orders")
      .select("id, created_at, items, total, method, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active) setOrders((data as unknown as Order[]) ?? []);
      });
    return () => {
      active = false;
    };
  }, [user.id]);

  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 px-0.5 pt-[26px] pb-[14px]">
        <h1 className="font-serif-eyebrow">My orders</h1>
        <span className="font-serif-eyebrow-sub text-primary" aria-hidden="true">〜</span>
        <p className="font-serif-eyebrow-sub">Every order you've placed with us.</p>
      </div>

      {orders === null ? (
        <p className="text-sm text-muted-foreground">Loading your orders…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <p className="text-muted-foreground">You haven't placed an order yet.</p>
          <Link
            to="/menu"
            className="label-caps mt-5 inline-flex min-h-[48px] items-center rounded-full bg-primary px-6 text-primary-foreground transition-all duration-200 ease-out hover:bg-primary-deep hover:scale-[1.02] active:scale-[0.97]"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <ul className="animate-fade-up flex flex-col gap-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {new Date(o.created_at).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}
                </p>
                <span className={cn("label-caps rounded-full px-3 py-1 text-xs", statusClass(o.status))}>
                  {o.status}
                </span>
              </div>
              <p className="mt-3 text-sm">
                {(o.items ?? []).map((i) => `${i.qty} × ${i.name}`).join(", ")}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-gold pt-3">
                <span className="text-sm text-muted-foreground">{o.method}</span>
                <span className="font-display font-bold text-primary">{currency(Number(o.total))}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
