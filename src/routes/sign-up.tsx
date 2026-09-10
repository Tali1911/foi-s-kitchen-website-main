import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create account — Foi's Kitchen Nairobi" },
      { name: "description", content: "Create a Foi's Kitchen account to save your delivery details and track your food orders." },
      { property: "og:title", content: "Create account — Foi's Kitchen" },
      { property: "og:description", content: "Save your details and track every Foi's Kitchen order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="sign-up" />,
});
