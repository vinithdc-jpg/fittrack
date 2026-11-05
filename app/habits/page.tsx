import { Sparkles } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { habits } from "@/lib/mock-db";

export default function HabitsPage() {
  return (
    <DashboardShell title="Habits">
      <div className="grid gap-6 lg:grid-cols-3">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className="border-slate-200 dark:border-slate-800"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <CardTitle>{habit.title}</CardTitle>
                </div>
                <Badge>{habit.frequency}</Badge>
              </div>
              <CardDescription>{habit.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Streak</span>
                <span>{habit.streak} days</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Completion rate</span>
                <span>{habit.completionRate}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: `${habit.completionRate}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
