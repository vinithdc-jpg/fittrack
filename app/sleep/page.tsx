import { MoonStar } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sleepRecords, weeklyTrend } from "@/lib/mock-db";

const maxSleep = Math.max(...weeklyTrend.map((item) => item.sleep));

export default function SleepPage() {
  return (
    <DashboardShell title="Sleep">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                <MoonStar className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Sleep overview</CardTitle>
                <CardDescription>Duration and quality trends across recent nights.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-72">
            <div className="flex h-full items-end gap-3 pt-2">
              {weeklyTrend.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-52 w-full items-end">
                    <div
                      className="w-full rounded-t-xl bg-violet-500"
                      style={{ height: `${(day.sleep / maxSleep) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Latest sleep sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sleepRecords.map((record) => (
              <div key={record.id} className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="font-medium">{record.date}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{record.start} → {record.end}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Duration: {Math.round(record.duration / 60)}h {record.duration % 60}m</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Quality: {record.quality}/5</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
