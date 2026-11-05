import Link from "next/link";
import { Activity, Dumbbell, Droplets, Heart, Home, MoonStar, NotebookPen, Salad, Sparkles, UserRound } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", title: "Overview", icon: Home },
  { href: "/workouts", title: "Workouts", icon: Dumbbell },
  { href: "/water", title: "Water", icon: Droplets },
  { href: "/sleep", title: "Sleep", icon: MoonStar },
  { href: "/nutrition", title: "Nutrition", icon: Salad },
  { href: "/activity", title: "Activity", icon: Activity },
  { href: "/habits", title: "Habits", icon: Sparkles },
  { href: "/profile", title: "Profile", icon: UserRound },
];

export function DashboardShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-emerald-50/50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/20 dark:text-slate-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-4 md:px-6 md:py-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-md border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-600 text-lg font-semibold text-white dark:bg-emerald-500 dark:text-slate-950">
              F
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Personal health</p>
              <h1 className="text-xl font-semibold">FitTrack</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ href, title: itemTitle, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={title === itemTitle ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                  title === itemTitle ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" : "",
                )}
              >
                <Icon className="h-4 w-4" />
                {itemTitle}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-md border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-950 dark:bg-emerald-950/30">
            <div className="mb-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-semibold">Goal progress</span>
            </div>
            <p className="text-2xl font-semibold">72%</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Strong momentum this week</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-4 flex items-center justify-between rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:mb-6 md:p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Today, 31 Oct 2026</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden sm:inline-flex">
                <NotebookPen className="h-4 w-4" />
                Log entry
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <nav aria-label="Main navigation" className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map(({ href, title: itemTitle, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={title === itemTitle ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                  title === itemTitle
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                <Icon className="h-4 w-4" />
                {itemTitle}
              </Link>
            ))}
          </nav>

          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
