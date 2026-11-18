import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Check your email" };

/** Shown after a link is requested. The same page is shown whether or not the account exists. */
export default function CheckEmailPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-6 px-4 py-12 sm:px-6">
      <h1 className="text-headline-lg text-ink">Check your inbox</h1>
      <p className="text-body-lg text-ink-muted">
        If the address can sign in, a link is on its way. The link works once and expires in 15 minutes.
      </p>
      <Link href="/log-in" className="w-fit text-body-sm font-medium text-primary underline-offset-4 hover:underline">
        Use a different email
      </Link>
    </main>
  );
}
