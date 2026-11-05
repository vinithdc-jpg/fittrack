import Link from "next/link";
import { Activity, ArrowRight, Droplets, Dumbbell, Footprints, MoonStar } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/70 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/30 dark:text-slate-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-600 text-lg font-semibold text-white shadow-sm dark:bg-emerald-500 dark:text-slate-950">
            F
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Wellness OS</p>
            <h1 className="text-xl font-semibold">FitTrack</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/register">
            <Button>Get started</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col px-6 pb-16 pt-10">
        <section className="grid items-center gap-10 rounded-md border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
              <Activity className="h-4 w-4" />
              Modern personal health tracking
            </div>
            <h2 className="max-w-xl text-4xl font-semibold tracking-tight md:text-6xl">
              Move better. Eat smarter. Recover deeper.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              A premium daily wellness dashboard for workouts, nutrition, sleep, hydration, habits, and long-term progress.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Start your plan <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">View demo dashboard</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-md bg-gradient-to-br from-slate-900 to-emerald-950 p-5 text-white dark:from-slate-800 dark:to-emerald-950">
              <p className="text-sm text-slate-300">Today</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-semibold">8,421</p>
                  <p className="text-sm text-slate-300">steps</p>
                </div>
                <Footprints className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <Droplets className="mb-3 h-6 w-6 text-cyan-500" />
                <p className="text-2xl font-semibold">1.5L</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">hydration</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <MoonStar className="mb-3 h-6 w-6 text-violet-500" />
                <p className="text-2xl font-semibold">7.6h</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">sleep</p>
              </div>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Workout progress</span>
                <span>72%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-[72%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Dumbbell,
              title: "Workout tracker",
              text: "Plan sessions, log exercises, and monitor weekly performance.",
            },
            {
              icon: Droplets,
              title: "Water and sleep",
              text: "Track hydration and rest with quick daily insights and trends.",
            },
            {
              icon: Activity,
              title: "Health habits",
              text: "Build routines around motion, nutrition, and sustainable progress.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
