import { CalendarDays, Dumbbell, Plus, TimerReset } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { workouts } from "@/lib/mock-db";

export default function WorkoutsPage() {
  return (
    <DashboardShell title="Workouts">
      <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">This week</p>
          <p className="text-2xl font-semibold">4 workouts logged</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New workout
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {workouts.map((workout) => (
          <Card key={workout.id} className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>{workout.title}</CardTitle>
                  <CardDescription>{workout.date}</CardDescription>
                </div>
                <Badge>{workout.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-2"><TimerReset className="h-4 w-4" /> {workout.duration} min</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {workout.exercises.length} exercises</span>
              </div>

              <div className="space-y-3">
                {workout.exercises.map((exercise, index) => (
                  <div key={`${workout.id}-${exercise.name}`} className="flex items-center justify-between rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-200 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-slate-500 dark:text-slate-400">{exercise.sets} sets × {exercise.reps} reps</p>
                      </div>
                    </div>
                    <span className="font-medium">{exercise.weight} kg</span>
                  </div>
                ))}
              </div>

              <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                {workout.notes}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Weekly workout statistics</CardTitle>
              <CardDescription>Total effort and consistency.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total duration</p>
            <p className="mt-2 text-3xl font-semibold">81 min</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Avg. intensity</p>
            <p className="mt-2 text-3xl font-semibold">76%</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Volume</p>
            <p className="mt-2 text-3xl font-semibold">3.4k</p>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
