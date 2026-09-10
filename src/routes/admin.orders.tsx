import { useEffect, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { currency } from "@/lib/site";
import { fieldClass } from "@/components/AuthForm";

type OrderItem = { name: string; qty: number; price: number };
type AdminOrder = {
  id: string;
  created_at: string;
  user_id: string | null;
  guest_name: string | null;
  guest_phone: string | null;
  items: OrderItem[];
  total: number;
  method: string;
  address: string | null;
  preferred_time: string | null;
  notes: string | null;
  status: string;
};

const statuses = [
  "Received",
  "Preparing",
  "Out for delivery",
  "Ready for pickup",
  "Completed",
  "Cancelled",
] as const;

export const Route = createFileRoute("/admin/orders")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/sign-in" });
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .maybeSingle();
    if (!profile?.is_admin) throw redirect({ to: "/" });
    return { user: data.user };
  },
  head: () => ({
    meta: [
      { title: "Order admin — Foi's Kitchen" },
      { name: "description", content: "Internal tool for updating Foi's Kitchen order statuses." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active) setOrders((data as unknown as AdminOrder[]) ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  async function setStatus(id: string, status: string) {
    const previous = orders;
    setOrders((o) => (o ? o.map((x) => (x.id === id ? { ...x, status } : x)) : o));
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      setOrders(previous ?? null);
      toast.error("Couldn't update status.");
    } else {
      toast.success("Status updated");
    }
  }

  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 px-0.5 pt-[26px] pb-[14px]">
        <h1 className="font-serif-eyebrow">Orders</h1>
        <span className="font-serif-eyebrow-sub text-primary" aria-hidden="true">〜</span>
        <p className="font-serif-eyebrow-sub">Update the status of every order.</p>
      </div>

      {orders === null ? (
        <p className="text-sm text-muted-foreground">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-display font-semibold">
                    {o.guest_name ?? "Account order"}
                    {o.guest_phone ? ` · ${o.guest_phone}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })} · {o.method}
                    {o.address ? ` · ${o.address}` : ""}
                    {o.preferred_time ? ` · ${o.preferred_time}` : ""}
                  </p>
                </div>
                <span className="font-display font-bold text-primary">{currency(Number(o.total))}</span>
              </div>

              <p className="mt-3 text-sm">
                {(o.items ?? []).map((i) => `${i.qty} × ${i.name}`).join(", ")}
              </p>
              {o.notes && <p className="mt-1 text-sm text-muted-foreground">Notes: {o.notes}</p>}

              <label className="mt-4 flex flex-col gap-2">
                <span className="label-caps text-xs">Status</span>
                <select
                  className={fieldClass}
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
