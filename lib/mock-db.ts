import { hashSync } from "bcrypt";

export type ThemeMode = "light" | "dark";
export type PreferredUnits = "metric" | "imperial";
export type WorkoutCategory =
  | "Strength"
  | "Cardio"
  | "Running"
  | "Cycling"
  | "Walking"
  | "Yoga"
  | "Stretching"
  | "Other";
export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  dateOfBirth: string;
  height: number;
  initialWeight: number;
  preferredUnits: PreferredUnits;
  goals: string[];
  activityPreferences: string[];
  theme: ThemeMode;
};

export type Reminder = {
  id: string;
  title: string;
  detail: string;
  due: string;
};

export type WorkoutRecord = {
  id: string;
  title: string;
  category: WorkoutCategory;
  duration: number;
  date: string;
  notes: string;
  exercises: Array<{ name: string; sets: number; reps: number; weight: number }>;
};

export type MealRecord = {
  id: string;
  mealType: MealType;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
};

export type SleepRecord = {
  id: string;
  date: string;
  start: string;
  end: string;
  duration: number;
  quality: number;
  notes: string;
};

export type HabitRecord = {
  id: string;
  title: string;
  description: string;
  streak: number;
  completionRate: number;
  frequency: "Daily" | "Weekly" | "Custom";
  completions: number[];
};

export type BodyMeasurement = {
  id: string;
  date: string;
  weight: number;
  waist: number;
  chest: number;
  notes?: string;
};

export type WaterRecord = {
  id: string;
  amount: number;
  date: string;
  unit: "ml" | "oz";
};

export type ActivityRecord = {
  id: string;
  date: string;
  activityType: string;
  steps: number;
  distance: number;
  activeMinutes: number;
  calories: number;
};

export const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    name: "Maya Chen",
    email: "demo@fittrack.app",
    passwordHash: hashSync("demo123", 10),
    dateOfBirth: "1994-05-19",
    height: 168,
    initialWeight: 68,
    preferredUnits: "metric",
    goals: ["Build strength", "Improve sleep", "Stay active"],
    activityPreferences: ["Running", "Strength", "Mobility"],
    theme: "dark",
  },
];

export const reminders: Reminder[] = [
  { id: "r1", title: "Hydration check", detail: "Finish 500ml before 5pm", due: "Today • 4:30 PM" },
  { id: "r2", title: "Evening walk", detail: "30 minute walk in the park", due: "Today • 7:00 PM" },
  { id: "r3", title: "Sleep routine", detail: "Wind down 45 minutes before bed", due: "Tonight • 10:15 PM" },
];

export const workouts: WorkoutRecord[] = [
  {
    id: "w1",
    title: "Upper body power",
    category: "Strength",
    duration: 48,
    date: "2026-10-29",
    notes: "Focused on pressing and pulls with a strong tempo.",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: 60 },
      { name: "Pull Ups", sets: 4, reps: 6, weight: 0 },
      { name: "Dumbbell Row", sets: 3, reps: 10, weight: 22 },
    ],
  },
  {
    id: "w2",
    title: "Tempo run",
    category: "Running",
    duration: 33,
    date: "2026-10-28",
    notes: "Moderate effort intervals to build aerobic base.",
    exercises: [{ name: "Intervals", sets: 1, reps: 6, weight: 0 }],
  },
];

export const meals: MealRecord[] = [
  { id: "m1", mealType: "Breakfast", name: "Greek yogurt bowl", quantity: "1 bowl", calories: 420, protein: 28, carbs: 34, fats: 14, date: "2026-10-30T08:00:00" },
  { id: "m2", mealType: "Lunch", name: "Chicken quinoa salad", quantity: "1 serving", calories: 560, protein: 42, carbs: 38, fats: 22, date: "2026-10-30T12:30:00" },
  { id: "m3", mealType: "Dinner", name: "Salmon rice bowl", quantity: "1 bowl", calories: 650, protein: 35, carbs: 48, fats: 29, date: "2026-10-30T19:15:00" },
];

export const sleepRecords: SleepRecord[] = [
  { id: "s1", date: "2026-10-28", start: "22:45", end: "06:15", duration: 450, quality: 4, notes: "Fell asleep quickly after a short reading session." },
  { id: "s2", date: "2026-10-29", start: "23:10", end: "06:50", duration: 460, quality: 5, notes: "Stable sleep with two brief wake-ups." },
];

export const habits: HabitRecord[] = [
  { id: "h1", title: "Morning walk", description: "Walk 20 minutes outdoors before breakfast.", streak: 6, completionRate: 86, frequency: "Daily", completions: [1, 1, 0, 1, 1, 1, 1] },
  { id: "h2", title: "Drink water", description: "Reach your hydration target across the day.", streak: 11, completionRate: 92, frequency: "Daily", completions: [1, 1, 1, 1, 0, 1, 1] },
  { id: "h3", title: "Stretching", description: "Mobility routine after training or desk work.", streak: 4, completionRate: 71, frequency: "Weekly", completions: [0, 1, 1, 0, 1, 1, 1] },
];

export const bodyMeasurements: BodyMeasurement[] = [
  { id: "b1", date: "2026-10-23", weight: 68.2, waist: 73, chest: 92 },
  { id: "b2", date: "2026-10-30", weight: 67.8, waist: 71.5, chest: 91.5 },
];

export const waterRecords: WaterRecord[] = [
  { id: "wtr-1", amount: 250, date: "2026-10-30T08:15:00", unit: "ml" },
  { id: "wtr-2", amount: 500, date: "2026-10-30T12:00:00", unit: "ml" },
  { id: "wtr-3", amount: 300, date: "2026-10-30T16:00:00", unit: "ml" },
];

export const activities: ActivityRecord[] = [
  { id: "a1", date: "2026-10-30", activityType: "Walk", steps: 8421, distance: 6.4, activeMinutes: 65, calories: 412 },
  { id: "a2", date: "2026-10-29", activityType: "Run", steps: 7300, distance: 5.2, activeMinutes: 48, calories: 361 },
  { id: "a3", date: "2026-10-28", activityType: "Cycle", steps: 5400, distance: 4.1, activeMinutes: 39, calories: 298 },
];

export const weeklyTrend = [
  { day: "Mon", steps: 6200, calories: 310, sleep: 7.3 },
  { day: "Tue", steps: 7600, calories: 420, sleep: 7.8 },
  { day: "Wed", steps: 8900, calories: 480, sleep: 6.9 },
  { day: "Thu", steps: 7100, calories: 360, sleep: 8.1 },
  { day: "Fri", steps: 9300, calories: 520, sleep: 7.5 },
  { day: "Sat", steps: 10400, calories: 610, sleep: 8.3 },
  { day: "Sun", steps: 8421, calories: 470, sleep: 7.6 },
];

export function findUserByEmail(email: string) {
  return mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  height: number;
  initialWeight: number;
  preferredUnits: PreferredUnits;
  goals: string[];
  activityPreferences: string[];
}) {
  const existing = findUserByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  const user: UserProfile = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    passwordHash: hashSync(data.password, 10),
    dateOfBirth: data.dateOfBirth,
    height: data.height,
    initialWeight: data.initialWeight,
    preferredUnits: data.preferredUnits,
    goals: data.goals,
    activityPreferences: data.activityPreferences,
    theme: "dark",
  };

  mockUsers.push(user);
  return user;
}

export const dashboardStats = {
  todaysSteps: 8421,
  activeMinutes: 78,
  caloriesBurned: 430,
  waterIntake: 1500,
  waterTarget: 2200,
  sleepDuration: 7.6,
  workoutSummary: "2 sessions tracked",
  currentWeight: 67.8,
  goalCompletion: 72,
};
