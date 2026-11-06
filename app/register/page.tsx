"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
  dateOfBirth: "",
  height: "",
  initialWeight: "",
  preferredUnits: "metric",
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

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dateOfBirth: form.dateOfBirth || null,
          height: form.height ? Number(form.height) : null,
          initialWeight: form.initialWeight
            ? Number(form.initialWeight)
            : null,
        }),
      });

      if (!response.ok) {
        const payload: { error?: string } = await response.json();
        setError(payload.error ?? "Unable to create account. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const loginResponse = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!loginResponse || loginResponse.error) {
        setError(
          "Your account was created, but we couldn't sign you in. Please sign in manually.",
        );
        setIsSubmitting(false);
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to create your account right now. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-slate-100 to-emerald-50/70 px-4 py-12 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/30">
      <Card className="w-full max-w-2xl border-slate-200 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:shadow-black/20">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Set up a personal health profile and begin your progress plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                minLength={8}
                required
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Use at least 8 characters with uppercase, lowercase, and a
                number.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(event) =>
                  setForm({ ...form, confirmPassword: event.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth (optional)</Label>
              <Input
                id="dob"
                type="date"
                autoComplete="bday"
                value={form.dateOfBirth}
                onChange={(event) =>
                  setForm({ ...form, dateOfBirth: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height in cm (optional)</Label>
              <Input
                id="height"
                type="number"
                min="1"
                max="300"
                step="0.1"
                value={form.height}
                onChange={(event) =>
                  setForm({ ...form, height: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Initial weight in kg (optional)</Label>
              <Input
                id="weight"
                type="number"
                min="1"
                max="1000"
                step="0.1"
                value={form.initialWeight}
                onChange={(event) =>
                  setForm({ ...form, initialWeight: event.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="units">Preferred measurement units</Label>
              <select
                id="units"
                value={form.preferredUnits}
                onChange={(event) =>
                  setForm({
                    ...form,
                    preferredUnits: event.target.value as "metric" | "imperial",
                  })
                }
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:ring-emerald-400"
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </div>
            <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
              <input
                type="checkbox"
                checked={form.termsAccepted}
                onChange={(event) =>
                  setForm({ ...form, termsAccepted: event.target.checked })
                }
                required
                className="mt-1 h-4 w-4 rounded border-slate-300 accent-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              />
              <span>I accept the terms and conditions.</span>
            </label>
            {error ? (
              <p role="alert" className="md:col-span-2 text-sm text-rose-600">
                {error}
              </p>
            ) : null}
            <div className="md:col-span-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
