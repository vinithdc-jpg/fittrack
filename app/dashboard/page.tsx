import {
  Activity,
  ArrowUpRight,
  Droplets,
  Flame,
  Footprints,
  MoonStar,
  Target,
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  activities,
  bodyMeasurements,
  dashboardStats,
  habits,
  meals,
  reminders,
  sleepRecords,
  weeklyTrend,
  workouts,
  waterRecords,
} from "@/lib/mock-db";

const maxSteps = Math.max(...weeklyTrend.map((day) => day.steps));
const maxWater = Math.max(...waterRecords.map((entry) => entry.amount));

export default function DashboardPage() {
  return (
    <DashboardShell title="Overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Steps", value: "8,421", icon: Footprints, tone: "emerald" },
          { label: "Active minutes", value: "78", icon: Activity, tone: "sky" },
          { label: "Calories burned", value: "430", icon: Flame, tone: "amber" },
          { label: "Sleep", value: "7.6h", icon: MoonStar, tone: "violet" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <Card key={label} className="border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</CardTitle>
              <div className={`rounded-md p-2 ${tone === "emerald" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : tone === "sky" ? "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300" : tone === "amber" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" : "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-300">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +12% from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Weekly activity</CardTitle>
            <CardDescription>Daily step count and calorie burn across the week.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="mt-4 flex h-52 items-end gap-3">
              {weeklyTrend.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-40 w-full items-end gap-1">
                    <div
                      className="w-1/2 rounded-t-xl bg-emerald-500"
                      style={{ height: `${(day.steps / maxSteps) * 100}%` }}
                    />
                    <div
                      className="w-1/2 rounded-t-xl bg-sky-500"
                      style={{ height: `${(day.calories / 650) * 100}%` }}
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
            <CardTitle>Upcoming reminders</CardTitle>
            <CardDescription>Your next health actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reminders.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium">{item.title}</p>
                  <Badge>{item.due}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Water intake</CardTitle>
              <Droplets className="h-4 w-4 text-cyan-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{dashboardStats.waterIntake}ml</p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full w-[68%] rounded-full bg-cyan-500" />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Target {dashboardStats.waterTarget}ml</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sleep summary</CardTitle>
              <MoonStar className="h-4 w-4 text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{sleepRecords[1]?.duration ? `${Math.round(sleepRecords[1].duration / 60)}h ${sleepRecords[1].duration % 60}m` : "7.6h"}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Quality rating: {sleepRecords[1]?.quality ?? 5}/5</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Goal completion</CardTitle>
              <Target className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{dashboardStats.goalCompletion}%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You are on track to hit your weekly target.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Recent workouts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workouts.map((workout) => (
              <div key={workout.id} className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium">{workout.title}</p>
                  <Badge>{workout.category}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{workout.duration} min • {workout.exercises.length} exercises</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Habit completion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{habit.title}</span>
                  <span>{habit.completionRate}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${habit.completionRate}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Nutrition snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{meal.mealType}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{meal.calories} kcal</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{meal.protein}g protein</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Body progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bodyMeasurements.slice(-2).map((measurement) => (
              <div key={measurement.id} className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium">{measurement.date}</p>
                  <Badge>{measurement.weight} kg</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Waist {measurement.waist} cm • Chest {measurement.chest} cm</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Hydration history</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <div className="flex h-full items-end gap-3">
              {waterRecords.map((entry, index) => (
                <div key={entry.id} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-52 w-full items-end">
                    <div
                      className="w-full rounded-t-xl bg-cyan-500"
                      style={{ height: `${(entry.amount / maxWater) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Activity summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium">{activity.activityType}</p>
                  <Badge>{activity.steps.toLocaleString()} steps</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{activity.distance} km • {activity.activeMinutes} active min</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
