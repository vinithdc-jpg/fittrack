import { UserRound } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
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
import { mockProfiles } from "@/lib/mock-db";

export default function ProfilePage() {
  const user = mockProfiles[0];

  return (
    <DashboardShell title="Profile">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Preferred units</span>
              <Badge>{user.preferredUnits}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Height</span>
              <span>{user.height} cm</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Initial weight</span>
              <span>{user.initialWeight} kg</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Current theme</span>
              <span>{user.theme}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Profile settings</CardTitle>
            <CardDescription>
              Update your details and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={user.email} />
              </div>
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input defaultValue={user.height} />
              </div>
              <div className="space-y-2">
                <Label>Current weight</Label>
                <Input defaultValue="67.8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" defaultValue="********" />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
