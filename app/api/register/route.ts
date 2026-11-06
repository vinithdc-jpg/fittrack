import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDbPool } from "@/lib/db";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number"),
  confirmPassword: z.string(),
  termsAccepted: z.literal(true, {
    error: "You must accept the terms and conditions",
  }),
  dateOfBirth: z.iso.date().nullable().optional().default(null),
  height: z.number().min(1).max(300).nullable().optional().default(null),
  initialWeight: z
    .number()
    .min(1)
    .max(1000)
    .nullable()
    .optional()
    .default(null),
  preferredUnits: z.enum(["metric", "imperial"]).default("metric"),
}).superRefine((data, context) => {
  if (data.password !== data.confirmPassword) {
    context.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Invalid registration details",
      },
      { status: 400 },
    );
  }

  const {
    name,
    email,
    password,
    dateOfBirth,
    height,
    initialWeight,
    preferredUnits,
  } = parsed.data;

  try {
    const existingUser = await getDbPool().query(
      "SELECT id FROM users WHERE lower(email) = $1 LIMIT 1",
      [email],
    );

    if (existingUser.rowCount) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);
    const result = await getDbPool().query(
      `INSERT INTO users
        (name, email, password_hash, date_of_birth, height_cm, initial_weight_kg,
         preferred_units)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, name, email`,
      [
        name,
        email,
        passwordHash,
        dateOfBirth,
        height,
        initialWeight,
        preferredUnits,
      ],
    );

    if (!result.rowCount) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json({
      ok: true,
      user: result.rows[0],
    });
  } catch (error) {
    const databaseErrorCode =
      error instanceof Error &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined;

    console.error(
      "Registration failed",
      databaseErrorCode ?? "unknown error",
    );

    if (databaseErrorCode === "28P01") {
      return NextResponse.json(
        {
          error:
            "Database authentication failed. Check the username and password in DATABASE_URL.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Unable to create your account right now" },
      { status: 500 },
    );
  }
}
