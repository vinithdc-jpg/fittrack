"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  name: "Ava Thompson",
  email: "ava@fittrack.app",
  password: "password123",
  dateOfBirth: "1996-08-14",
  height: 170,
  initialWeight: 69,
  preferredUnits: "metric",
  goals: ["Build strength", "Improve sleep"],
  activityPreferences: ["Strength", "Running"],
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error?.formErrors?.[0] ?? "Unable to create account. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const loginResponse = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    if (!loginResponse.ok) {
      setError("Account created, but automatic sign-in failed. Please sign in manually.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/70 px-4 py-12 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/30">
      <Card className="w-full max-w-2xl border-slate-200 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:shadow-black/20">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Set up a personal health profile and begin your progress plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" value={form.dateOfBirth} onChange={(event) => setForm({ ...form, dateOfBirth: event.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" value={form.height} onChange={(event) => setForm({ ...form, height: Number(event.target.value) })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Initial weight (kg)</Label>
              <Input id="weight" type="number" value={form.initialWeight} onChange={(event) => setForm({ ...form, initialWeight: Number(event.target.value) })} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="units">Preferred measurement units</Label>
              <select
                id="units"
                value={form.preferredUnits}
                onChange={(event) => setForm({ ...form, preferredUnits: event.target.value as "metric" | "imperial" })}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:ring-emerald-400"
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="goals">Fitness goals</Label>
              <Input
                id="goals"
                value={form.goals.join(", ")}
                onChange={(event) => setForm({ ...form, goals: event.target.value.split(",").map((goal) => goal.trim()).filter(Boolean) })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="activities">Activity preferences</Label>
              <Input
                id="activities"
                value={form.activityPreferences.join(", ")}
                onChange={(event) => setForm({ ...form, activityPreferences: event.target.value.split(",").map((activity) => activity.trim()).filter(Boolean) })}
              />
            </div>
            {error ? <p className="md:col-span-2 text-sm text-rose-600">{error}</p> : null}
            <div className="md:col-span-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account? <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
