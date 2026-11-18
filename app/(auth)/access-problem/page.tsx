import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Link no longer valid" };

/** A magic link was used twice, expired, or was never valid (Stitch: access_problems_fallbacks). */
export default function AccessProblemPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-6 px-4 py-12 sm:px-6">
      <h1 className="text-headline-lg text-ink">This link is no longer valid</h1>
      <p className="text-body-lg text-ink-muted">
        Sign-in links work once and expire after 15 minutes. Request a new link to continue.
      </p>
      <Link
        href="/log-in"
        className="inline-flex min-h-11 w-fit items-center rounded-control bg-primary px-5 text-body-sm font-medium text-white hover:bg-primary-hover"
      >
        Request a new link
      </Link>
    </main>
  );
}
