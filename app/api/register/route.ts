import { NextResponse } from "next/server";
import { z } from "zod";

import { registerUser } from "@/lib/mock-db";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  dateOfBirth: z.string(),
  height: z.number().positive(),
  initialWeight: z.number().positive(),
  preferredUnits: z.enum(["metric", "imperial"]),
  goals: z.array(z.string()).default([]),
  activityPreferences: z.array(z.string()).default([]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = registerUser(parsed.data);

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to register user",
      },
      { status: 400 },
    );
  }
}
