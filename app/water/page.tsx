import { Droplets, Plus } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { waterRecords } from "@/lib/mock-db";

export default function WaterPage() {
  const total = waterRecords.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <DashboardShell title="Water">
      <Card className="overflow-hidden border-cyan-100 bg-linear-to-br from-white to-cyan-50/70 dark:border-cyan-950 dark:from-slate-900 dark:to-cyan-950/20">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
              <CardTitle>Hydration target</CardTitle>
              <CardDescription>Customize your daily goal to fit your routine.</CardDescription>
              </div>
            </div>
            <Button variant="outline" className="w-full border-cyan-200 bg-white sm:w-auto dark:border-cyan-900 dark:bg-slate-900">
              <Plus className="h-4 w-4" />
              Add water
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-semibold tracking-tight">{total}<span className="ml-1 text-xl font-medium text-slate-500 dark:text-slate-400">ml</span></p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Daily intake</p>
            </div>
            <div className="rounded-md bg-cyan-100 px-3 py-1.5 text-sm font-semibold text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200">
              68% of goal
            </div>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-cyan-100 dark:bg-slate-700"
            role="progressbar"
            aria-label="Daily hydration goal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={68}
          >
            <div className="h-full w-[68%] rounded-full bg-cyan-500" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[150, 250, 500].map((amount) => (
              <Button key={amount} variant="secondary" className="justify-center border border-cyan-100 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200 dark:hover:bg-cyan-950/60">
                +{amount}ml
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Water history</CardTitle>
              <CardDescription>Recent entries and intake trends.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {waterRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
              <div>
                <p className="font-medium">{record.amount}ml</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(record.date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
              </div>
              <span className="rounded-full bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">{record.unit}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
