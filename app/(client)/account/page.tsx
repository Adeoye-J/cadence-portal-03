import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/features/account/sign-out-button";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { getViewer } from "@/lib/session";

export const metadata: Metadata = { title: "Account" };

/** Account profile (Stitch: account). Read-only: changing the name is not available yet. */
export default async function AccountPage() {
  const viewer = await getViewer();
  if (!viewer) redirect("/log-in");

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Account" description="How you appear in Cadence, and what you can do with your data." />
      <section aria-labelledby="profile-heading" className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 sm:p-6">
        <h2 id="profile-heading" className="text-headline-sm text-ink">Profile</h2>
        <dl className="grid gap-3 text-body-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-muted">Name</dt>
            <dd className="text-ink">{viewer.name ?? "Not set"}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Email</dt>
            <dd className="text-ink">{viewer.email}</dd>
          </div>
        </dl>
        <p className="text-label-md text-ink-muted">Changing your name or email is not available yet.</p>
      </section>
      <section aria-labelledby="session-heading" className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 sm:p-6">
        <h2 id="session-heading" className="text-headline-sm text-ink">Session</h2>
        <div className="flex flex-wrap gap-3">
          <SignOutButton />
          <Link href="/account/data" className={buttonVariants({ variant: "secondary" })}>
            Your data
          </Link>
        </div>
      </section>
    </main>
  );
}
