import { useEffect, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { fieldClass } from "@/components/AuthForm";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account/")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/sign-in" });
    return { user: data.user };
  },
  head: () => ({
    meta: [
      { title: "My account — Foi's Kitchen" },
      { name: "description", content: "Update your name, phone and default delivery details for Foi's Kitchen orders." },
      { property: "og:title", content: "My account — Foi's Kitchen" },
      { property: "og:description", content: "Manage your Foi's Kitchen delivery details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    default_address: "",
    default_method: "Delivery",
  });

  useEffect(() => {
    let active = true;
    supabase
      .from("profiles")
      .select("full_name, phone, default_address, default_method")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        if (data) {
          setForm({
            full_name: data.full_name ?? "",
            phone: data.phone ?? "",
            default_address: data.default_address ?? "",
            default_method: data.default_method ?? "Delivery",
          });
        }
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user.id]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name || null,
        phone: form.phone || null,
        default_address: form.default_address || null,
        default_method: form.default_method,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error("Couldn't save your details.");
    else toast.success("Details saved");
  }

  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 px-0.5 pt-[26px] pb-[14px]">
        <h1 className="font-serif-eyebrow">My account</h1>
        <span className="font-serif-eyebrow-sub text-primary" aria-hidden="true">〜</span>
        <p className="font-serif-eyebrow-sub">Keep your details handy for faster checkout.</p>
      </div>

      <div className="animate-fade-up mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 shadow-card">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading your details…</p>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={save}>
            <div className="flex flex-col gap-2">
              <label htmlFor="p-name" className="label-caps text-xs">Full name</label>
              <input id="p-name" className={fieldClass} autoComplete="name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="p-phone" className="label-caps text-xs">Phone</label>
              <input id="p-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className={fieldClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="label-caps mb-2 text-xs">Default method</legend>
              <div className="flex gap-2">
                {["Delivery", "Pickup"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setForm({ ...form, default_method: m })}
                    aria-pressed={form.default_method === m}
                    className={cn(
                      "label-caps min-h-[48px] flex-1 rounded-full border transition-colors duration-200 ease-out",
                      form.default_method === m
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input text-muted-foreground hover:border-primary hover:text-primary",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-2">
              <label htmlFor="p-address" className="label-caps text-xs">Default address</label>
              <input id="p-address" className={fieldClass} autoComplete="street-address" value={form.default_address} onChange={(e) => setForm({ ...form, default_address: e.target.value })} />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="label-caps inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-6 text-primary-foreground transition-all duration-200 ease-out hover:bg-primary-deep hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save details"}
            </button>
          </form>
        )}

        <div className="mt-6 border-t border-gold pt-5">
          <Link to="/account/orders" className="label-caps text-primary hover:underline">
            My orders →
          </Link>
        </div>
      </div>
    </section>
  );
}
