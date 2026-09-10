import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const fieldClass =
  "min-h-[48px] w-full rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 ease-out focus:border-primary";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const signUp = mode === "sign-up";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (signUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome! Add your name and phone.");
          navigate({ to: "/account" });
        } else {
          setSent(true);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/account" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/account" });
  }

  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 px-0.5 pt-[26px] pb-[14px]">
        <h1 className="font-serif-eyebrow">{signUp ? "Create account" : "Sign in"}</h1>
        <span className="font-serif-eyebrow-sub text-primary" aria-hidden="true">〜</span>
        <p className="font-serif-eyebrow-sub">
          {signUp ? "Save your details and track every order." : "Welcome back to Foi's Kitchen."}
        </p>
      </div>

      <div className="animate-fade-up mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-card">
        {sent ? (
          <p className="text-sm text-muted-foreground">
            Check your email to confirm your account. Once confirmed, sign in and add your name and
            phone on your account page.
          </p>
        ) : (
          <>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="a-email" className="label-caps text-xs">Email</label>
                <input
                  id="a-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  className={fieldClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="a-password" className="label-caps text-xs">Password</label>
                <input
                  id="a-password"
                  type="password"
                  autoComplete={signUp ? "new-password" : "current-password"}
                  required
                  minLength={6}
                  className={fieldClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="label-caps inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-6 text-primary-foreground transition-all duration-200 ease-out hover:bg-primary-deep hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60"
              >
                {busy ? "Please wait…" : signUp ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-gold" />
              <span className="label-caps text-xs text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-gold" />
            </div>

            <button
              type="button"
              onClick={google}
              className="label-caps inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-foreground/20 px-6 transition-colors duration-200 ease-out hover:border-primary hover:text-primary"
            >
              Continue with Google
            </button>
          </>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {signUp ? "Already have an account? " : "New here? "}
          <Link
            to={signUp ? "/sign-in" : "/sign-up"}
            className="font-semibold text-primary hover:underline"
          >
            {signUp ? "Sign in" : "Create one"}
          </Link>
        </p>
      </div>
    </section>
  );
}
