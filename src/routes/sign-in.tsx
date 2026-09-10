import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — Foi's Kitchen Nairobi" },
      { name: "description", content: "Sign in to your Foi's Kitchen account to save your details and track your orders." },
      { property: "og:title", content: "Sign in — Foi's Kitchen" },
      { property: "og:description", content: "Sign in to track your Foi's Kitchen orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="sign-in" />,
});
