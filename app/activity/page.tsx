import { Footprints } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { activities } from "@/lib/mock-db";

export default function ActivityPage() {
  return (
    <DashboardShell title="Activity">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Footprints className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Daily activity summary</CardTitle>
              <CardDescription>
                Daily movement metrics and estimated energy expenditure.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Average steps
            </p>
            <p className="mt-2 text-3xl font-semibold">7,640</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Distance
            </p>
            <p className="mt-2 text-3xl font-semibold">5.7 km</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calories
            </p>
            <p className="mt-2 text-3xl font-semibold">1,070</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="border-slate-200 dark:border-slate-800"
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{activity.activityType}</CardTitle>
                <Badge>{activity.date}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Steps</span>
                <span>{activity.steps}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Walking distance</span>
                <span>{activity.distance} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Active minutes</span>
                <span>{activity.activeMinutes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated calories</span>
                <span>{activity.calories}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
