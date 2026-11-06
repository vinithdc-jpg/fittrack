# FitTrack

FitTrack is a personal health and fitness tracking web application. Registration writes accounts to PostgreSQL, and login uses the NextAuth credentials provider. Health tracking pages still use sample data.

> **Implementation status:** Authentication reads and writes the existing PostgreSQL `users` table. Health pages still render sample data from `lib/mock-db.ts` and are not user-specific.

## Contents

- [Technology stack](#technology-stack)
- [High-level design](#high-level-design-hld)
- [Application routes](#application-routes)
- [API endpoints](#api-endpoints)
- [Data flows](#data-flows)
- [Low-level design](#low-level-design-lld)
- [Data model](#data-model)
- [Local development](#local-development)
- [Known limitations and production considerations](#known-limitations-and-production-considerations)

## Technology stack

| Area | Technology |
| --- | --- |
| Web framework and routing | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Icons | lucide-react |
| Authentication libraries | NextAuth credentials provider, bcrypt |
| Validation | Zod |
| Authentication database access | PostgreSQL via `pg` |
| Health-data schema | Prisma, PostgreSQL |
| Utility styling | clsx, tailwind-merge, class-variance-authority |

## High-level design (HLD)

### System context

```mermaid
flowchart LR
    Visitor[Visitor / user] -->|Browser navigation| Next[Next.js App Router]
    Next --> Pages[Server-rendered page routes]
    Pages --> Shell[DashboardShell and shared UI]
    Pages --> Samples[lib/mock-db.ts sample data]
    Browser -->|POST JSON| RegisterAPI[/api/register]
    Browser -->|NextAuth protocol| AuthAPI[/api/auth/*]
    RegisterAPI --> Users[(PostgreSQL users)]
    AuthAPI --> Users
    Browser -->|fittrack-theme localStorage| Theme[ThemeToggle]
    PrismaSchema[prisma/schema.prisma] -. described schema only .-> PostgreSQL[(PostgreSQL)]
```

Authentication uses parameterized SQL through `pg`; Prisma is not used at runtime. Health feature pages continue to use local sample data.

### Main components

1. **App Router pages (`app/`)**
   - `/` is the public landing page.
   - `/login` uses the NextAuth credentials provider; `/register` posts to the registration endpoint and then signs in.
   - `/dashboard` and the health feature routes render the dashboard shell and feature summaries.
   - Pages use static/sample records; the feature pages do not call resource APIs.

2. **Shared dashboard shell (`components/dashboard-shell.tsx`)**
   - Adds desktop sidebar navigation, a page header, theme control, and mobile horizontal navigation.
   - Provides a common layout for the health feature pages.

3. **Shared UI (`components/ui/`)**
   - Reusable buttons, cards, labels, inputs, textareas, badges, and separators.
   - `lib/utils.ts` provides `cn`, which combines conditional classes and resolves Tailwind class conflicts.

4. **Authentication routes (`app/api/`)**
   - `/api/register` validates, hashes, and inserts users using parameterized SQL.
   - `/api/auth/[...nextauth]` exposes NextAuth's credentials/session protocol and reads users from PostgreSQL.
   - `proxy.ts` redirects unauthenticated visitors away from health pages.

5. **Sample data (`lib/mock-db.ts`)**
   - Provides sample health records; it is not used for authentication.

6. **Prisma schema (`prisma/schema.prisma`)**
   - Documents the PostgreSQL model; authentication SQL uses the `users` table directly.

### Request/rendering architecture

Most feature pages are server components that import sample data and render it directly. Login and registration are client components because they manage form state, submit fetch requests, display errors, and navigate after success. The theme toggle is also a client component; it updates the root `.dark` class and stores the preference in browser local storage.

## Application routes

| Route | Purpose | Data source / behavior |
| --- | --- | --- |
| `/` | Landing page with feature preview and calls to action | Static presentation |
| `/login` | Sign-in form | Uses NextAuth credentials sign-in and redirects to `/dashboard` |
| `/register` | Account/profile registration form | Inserts into PostgreSQL, creates a NextAuth session, and redirects to `/dashboard` |
| `/dashboard` | Summary metrics, charts, reminders, and recent records | `lib/mock-db.ts` |
| `/workouts` | Workout sessions, exercises, weekly summary | `lib/mock-db.ts` |
| `/water` | Hydration total, progress display, quick-add UI, history | `lib/mock-db.ts`; quick-add controls are presentation-only |
| `/sleep` | Sleep trend and recent sleep sessions | `lib/mock-db.ts` |
| `/nutrition` | Calorie/macronutrient summary and meals | `lib/mock-db.ts` |
| `/activity` | Daily activity summary and activity records | `lib/mock-db.ts` |
| `/habits` | Habit streaks and completion rates | `lib/mock-db.ts` |
| `/profile` | Demo profile summary and settings form | `lib/mock-db.ts`; settings form is presentation-only |

Health pages are guarded by `proxy.ts` and require a valid NextAuth session.

## API endpoints

### `POST /api/register`

Creates an account in the existing PostgreSQL `users` table.

**Request JSON**

```json
{
  "name": "Ava Thompson",
  "email": "ava@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "termsAccepted": true,
  "dateOfBirth": null,
  "height": null,
  "initialWeight": null,
  "preferredUnits": "metric"
}
```

Name and email are required. Passwords must contain at least eight characters, an uppercase and lowercase letter, and a number. The confirmation must match and terms must be accepted. Date of birth, height, and initial weight are optional. Passwords are bcrypt-hashed before insertion.

**Responses**

| Status | Body |
| --- | --- |
| `200` | `{ "ok": true, "user": { "id": "...", "name": "...", "email": "..." } }` |
| `400` | `{ "error": "..." }` for invalid input |
| `409` | `{ "error": "An account with this email already exists" }` |
| `500` | `{ "error": "Unable to create your account right now" }` |

The SQL uses parameterized values and does not return the password hash.

### Login and sessions

The login form submits credentials to NextAuth's credentials endpoint. NextAuth looks up the user by case-insensitive email in PostgreSQL, compares the bcrypt hash, and creates an encrypted JWT session cookie on success. Invalid credentials produce a generic authentication error.

The dashboard header's **Sign out** button sends a same-origin `POST /api/auth/logout` request. The endpoint expires the NextAuth session cookie (including chunked cookies) before redirecting the browser to `/login`.

### `/api/auth/[...nextauth]`

The catch-all route is handled by NextAuth using the credentials provider and JWT sessions.

| Method | Purpose |
| --- | --- |
| `GET` | NextAuth session and provider/callback protocol endpoints |
| `POST` | NextAuth sign-in, callback, and sign-out protocol endpoints |

The credentials provider accepts `email` and `password`, queries the `users` table, and compares the bcrypt hash. Its sign-in page is configured as `/login`. The exact subpaths and payloads are NextAuth protocol endpoints rather than custom FitTrack JSON contracts.

### Unsupported API routes

There are no current REST endpoints for creating, listing, updating, or deleting workouts, meals, sleep records, habits, water entries, body measurements, or activity logs. The corresponding UI pages render sample data, and apparent controls such as water quick-add and profile save do not persist changes.

## Data flows

### Registration

```mermaid
sequenceDiagram
    actor User
    participant Form as /register client page
    participant API as POST /api/register
    participant DB as PostgreSQL users table
    participant Auth as NextAuth credentials
    participant Router as Next.js client router

    User->>Form: Submit profile and credentials
    Form->>API: JSON registration payload
    API->>API: Parse JSON and validate with Zod
    API->>DB: Check duplicate email and insert bcrypt hash
    API-->>Form: 200 user summary / 400 error
    Form->>Auth: Sign in with credentials
    Auth->>DB: Find user and compare bcrypt hash
    Auth-->>Form: Set NextAuth session cookie
    Form->>Router: Navigate to /dashboard
```

Registration and session creation are separate requests. If sign-in fails after registration succeeds, the user can sign in from the login page.

### Login

```mermaid
sequenceDiagram
    actor User
    participant Form as /login client page
    participant Auth as NextAuth credentials endpoint
    participant DB as PostgreSQL users table
    participant Router as Next.js client router

    User->>Form: Submit email and password
    Form->>Auth: Submit credentials
    Auth->>DB: Find user by case-insensitive email
    DB-->>Auth: User and bcrypt hash
    Auth->>Auth: Compare password and create session
    Auth-->>Form: Authenticated session or generic error
    Form->>Router: On success, navigate to /dashboard
```

### Feature page rendering

```mermaid
flowchart TD
    Request[Browser requests feature route] --> Page[App Router page component]
    Page --> Import[Import typed sample records from lib/mock-db.ts]
    Import --> Compute[Calculate display totals and summaries]
    Compute --> Shell[Render DashboardShell and shared UI]
    Shell --> HTML[Return rendered page]
```

This is currently a read-only display flow. Feature pages do not call an API or persist interactions.

### Theme preference

1. On mount, `ThemeToggle` reads `fittrack-theme` from `localStorage`.
2. If there is no saved value, it uses `prefers-color-scheme`.
3. It applies/removes the `dark` class on the root `<html>` element.
4. Clicking the toggle applies the new class immediately, stores `dark` or `light`, and notifies the mounted toggle through a custom browser event.
5. Tailwind's custom `dark` variant styles descendants of `.dark`.

## Low-level design (LLD)

### Route and component structure

```text
app/
  layout.tsx                   Root document, Geist fonts, metadata, global CSS
  page.tsx                     Public landing page
  login/page.tsx               Client login form
  register/page.tsx            Client registration form
  dashboard/page.tsx           Overview dashboard
  workouts/page.tsx            Workout history and summary
  water/page.tsx               Hydration progress and history
  sleep/page.tsx               Sleep trends and sessions
  nutrition/page.tsx            Meal and macro summaries
  activity/page.tsx            Activity records and summary
  habits/page.tsx              Habit completion overview
  profile/page.tsx             Demo profile and settings form
  api/
    register/route.ts           PostgreSQL registration
    auth/[...nextauth]/route.ts NextAuth credentials/session handler
lib/
  db.ts                        PostgreSQL connection pool
proxy.ts                       Authentication redirects for health pages
components/
  dashboard-shell.tsx          Shared responsive health-app frame/navigation
  theme-toggle.tsx             Client-side persisted theme preference
  ui/                          Reusable presentational components
lib/
  mock-db.ts                   Typed sample health and profile data
  utils.ts                     Tailwind class merge helper
prisma/
  schema.prisma                PostgreSQL-oriented model definitions
```

### Authentication responsibilities

- **Validation:** Registration payloads are validated with Zod before database access.
- **Registration:** Checks for an existing email, hashes the password with bcrypt, and inserts into the existing `users` table using parameterized SQL.
- **Login:** `CredentialsProvider.authorize` looks up the user in PostgreSQL and compares the hash with bcrypt.
- **Session:** NextAuth issues JWT sessions with a 30-day maximum age; `proxy.ts` uses the session token to protect health pages.

### Error behavior

- Invalid registration data returns HTTP `400`; duplicate emails return `409`.
- Invalid or unknown login credentials use a generic authentication error.
- Database errors return generic server errors; diagnostic logs include database error codes only.
- The client forms display an error message for non-success responses. They do not currently use a shared API client.

## Data model

`prisma/schema.prisma` declares the PostgreSQL entities. The `User` model maps to the existing `users` table; the health-record models are not yet connected to runtime data access.

| Model | Important fields | Relationships |
| --- | --- | --- |
| `User` | Name, unique email, password hash, date of birth, height, initial weight, preferred units, theme, timestamps | One-to-many to each user-owned health record below |
| `Workout` | Title, category, duration, notes, date, user ID | Belongs to `User`; has many `Exercise` records |
| `Exercise` | Name, sets, reps, optional weight, workout ID | Belongs to `Workout` |
| `Meal` | Name, meal type, quantity, calories, protein, carbohydrates, fats, consumed time, user ID | Belongs to `User` |
| `SleepRecord` | Sleep start/end, quality, notes, user ID | Belongs to `User` |
| `Habit` | Title, description, frequency, streak, completion rate, user ID | Belongs to `User`; has many `HabitCompletion` records |
| `HabitCompletion` | Date, completed flag, habit ID | Belongs to `Habit` |
| `WaterEntry` | Amount in millilitres, date, user ID | Belongs to `User` |
| `BodyMeasurement` | Date, weight, optional waist/chest/notes, user ID | Belongs to `User` |
| `ActivityLog` | Date, type, steps, optional distance, active minutes, calories, user ID | Belongs to `User` |

The schema uses PostgreSQL as the datasource and `DATABASE_URL` as the connection string. User email is unique. Most categorical values are represented as strings rather than Prisma enums. The application does not instantiate Prisma Client or run migrations.

## Local development

### Requirements

- Node.js compatible with the project's Next.js 16 and package versions
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create and type-check the production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

### Authentication configuration

Copy `.env.example` to `.env.local` and set your PostgreSQL connection string and a strong NextAuth secret:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
NEXTAUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=http://localhost:3000
```

The configured database must already contain a `users` table with `id`, `name`, `email`, `password_hash`, `date_of_birth`, `height_cm`, `initial_weight_kg`, `preferred_units`, `theme`, `created_at`, and `updated_at` columns. Email must have a unique constraint. `.env.example` contains placeholders only.

The application does not create or migrate the `users` table. Do not commit real secrets or database credentials.

## Known limitations and production considerations

- **Database configuration:** registration/login require valid `DATABASE_URL` credentials and the existing `users` table.
- **Demo health data:** feature pages read fixed sample data and do not filter by authenticated user.
- **No health-record write APIs:** add, save, and quick-add UI affordances are not connected to persistent mutations.
- **Authentication limitations:** login uses encrypted JWT sessions; server-side database session revocation and rate limiting are not implemented.
- **Prisma is not integrated at runtime:** direct SQL is used for authentication; health pages remain sample data.
- **Production hardening required:** add rate limiting, account/session lifecycle management, and user-scoped health-record storage before deploying as a full multi-user tracker.
