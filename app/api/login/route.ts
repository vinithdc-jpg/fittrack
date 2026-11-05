import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { findUserByEmail } from "@/lib/mock-db";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = findUserByEmail(parsed.data.email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const passwordMatches = await compare(
      parsed.data.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to log in" },
      { status: 500 },
    );
  }
}
