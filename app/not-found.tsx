import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1440px] flex-col justify-center gap-3 px-4 py-12 sm:px-6">
      <p className="text-label-md text-ink-muted">404</p>
      <h1 className="text-headline-lg text-ink">This page could not be found</h1>
      <p className="text-body-lg text-ink-muted">
        The link may be out of date, or the item may have been removed. Check the address and try again.
      </p>
    </main>
  );
}
