import { Salad } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { meals } from "@/lib/mock-db";

export default function NutritionPage() {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <DashboardShell title="Nutrition">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Salad className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Daily calorie summary</CardTitle>
              <CardDescription>Meals logged today and a breakdown of macros.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Calories</p>
            <p className="mt-2 text-3xl font-semibold">{totalCalories}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Protein</p>
            <p className="mt-2 text-3xl font-semibold">{meals.reduce((sum, meal) => sum + meal.protein, 0)}g</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-sm text-slate-500 dark:text-slate-400">Carbs</p>
            <p className="mt-2 text-3xl font-semibold">{meals.reduce((sum, meal) => sum + meal.carbs, 0)}g</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {meals.map((meal) => (
          <Card key={meal.id} className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{meal.name}</CardTitle>
                <Badge>{meal.mealType}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Quantity</span>
                <span>{meal.quantity}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Calories</span>
                <span>{meal.calories} kcal</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Protein</span>
                <span>{meal.protein}g</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Carbs</span>
                <span>{meal.carbs}g</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Fats</span>
                <span>{meal.fats}g</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
