import Link from "next/link";
import { LayoutDashboard, Gamepad2, ListChecks } from "lucide-react";
import { classNames } from "@/lib/utils/cn";
import {
  colorTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
} from "@/Design-System/tokens";

export default function Home() {
  return (
    <div className={classNames("min-h-screen", colorTokens.background.dark)}>
      <main className="container mx-auto px-6 py-14">
        <section className="max-w-3xl">
          <p
            className={classNames(
              typographyTokens.caption,
              "text-gray-400 uppercase tracking-widest",
            )}
          >
            Welcome
          </p>
          <h1
            className={classNames(
              typographyTokens.heading,
              colorTokens.text.light,
              "mt-3 text-4xl sm:text-5xl font-black tracking-tight",
            )}
          >
            Practice Tasks Dashboard
          </h1>
          <p
            className={classNames("mt-4 max-w-2xl", colorTokens.text.secondary)}
          >
            Jump into the tasks below. Each section is built with your design
            tokens, clean UI, and the custom cursor experience.
          </p>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <TaskButton
            href="/games"
            icon={<Gamepad2 className="h-5 w-5" />}
            title="Games"
            description="Browse games with filters and infinite scroll."
            intent="primary"
          />
          <TaskButton
            href="/Dashboard/Login"
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard"
            description="Login and manage products and users."
            intent="secondary"
          />
          <TaskButton
            href="/finalPractice/select"
            icon={<ListChecks className="h-5 w-5" />}
            title="Select"
            description="Virtualized select with grouped options."
            intent="danger"
          />
        </section>
      </main>
    </div>
  );
}

function TaskButton({
  href,
  icon,
  title,
  description,
  intent,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  intent: "primary" | "secondary" | "danger";
}) {
  const intentClass =
    intent === "primary"
      ? colorTokens.button.primary
      : intent === "secondary"
        ? colorTokens.button.secondary
        : colorTokens.button.danger;

  return (
    <Link
      href={href}
      className={classNames(
        "group relative overflow-hidden border transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
        "hover:-translate-y-1 hover:shadow-2xl",
        radiusTokens.lg,
        colorTokens.border.dark,
        colorTokens.background.darkCard,
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-cyan-500/15 via-transparent to-emerald-500/10" />

      <div
        className={classNames(
          "relative flex items-start gap-4",
          spacingTokens.lg,
        )}
      >
        <div
          className={classNames(
            "flex h-11 w-11 items-center justify-center",
            radiusTokens.md,
            intentClass,
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div
            className={classNames(
              typographyTokens.subheading,
              colorTokens.text.light,
            )}
          >
            {title}
          </div>
          <p className={classNames("mt-1 text-sm", colorTokens.text.secondary)}>
            {description}
          </p>
          <div
            className={classNames(
              "mt-4 inline-flex items-center gap-2 text-sm",
              colorTokens.text.accent,
            )}
          >
            Open
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
