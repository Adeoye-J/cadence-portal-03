import type { Metadata } from "next";
import { safeNextPath } from "@/lib/safe-redirect";
import { LogInForm } from "./log-in-form";

export const metadata: Metadata = { title: "Sign in" };

/** Sign-in (Stitch: log_in). Magic link only. */
export default async function LogInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const nextPath = safeNextPath(next);
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-8 px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-label-md text-primary">Cadence</p>
        <h1 className="text-headline-lg text-ink">Cadence Access</h1>
        <p className="text-body-lg text-ink-muted">Sign in with your email. No password needed.</p>
      </header>
      <div className="rounded-card border border-border bg-surface p-4 sm:p-6">
        <LogInForm nextPath={nextPath} />
      </div>
    </main>
  );
}
