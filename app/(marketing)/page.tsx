import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Client delivery portal",
  description: "Run every client project from one link: scope, milestone sign-offs, files, change requests and payments.",
};

const PROBLEMS = [
  { title: "Scope drifts", body: "Requests made on a call slip into the work without a written sign-off or an adjusted price." },
  { title: "Approvals get lost", body: "Agreement is spread across chat, email and PDFs, and is hard to find when a question comes up later." },
  { title: "Payments are chased by hand", body: "Invoices sit apart from the work they pay for, so follow-ups are awkward and delivery waits on money." },
];

const STEPS = [
  { title: "Send a proposal", body: "Scope, milestones and amounts in one link. The client does not need to create a password." },
  { title: "The client signs", body: "They read the terms and sign by typing their name. The record keeps the time and a fingerprint of the terms." },
  { title: "Pay each milestone", body: "Each milestone is paid through a hosted checkout. The next piece of work starts once its payment settles." },
  { title: "Approve and close", body: "The client approves each delivery or asks for changes. Files, requests and the activity log stay in one place." },
];

const FEATURES = [
  "Milestone approvals with a typed record",
  "Deliverables with download links",
  "Change requests and replies",
  "A timestamped activity log",
  "Payment history for each project",
  "Roles for owners, admins, members and viewers",
];

/** Landing page. Describes only what the product does today. No measured results, certifications or planned features. */
export default function LandingPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-4 py-16 sm:px-6 lg:px-8">
      <section aria-labelledby="hero" className="flex max-w-3xl flex-col gap-6">
        <p className="text-label-md text-primary">Client delivery portal</p>
        <h1 id="hero" className="text-headline-lg text-ink sm:text-headline-xl">Run every client project from one link.</h1>
        <p className="text-body-lg text-ink-muted">
          Scope, milestone sign-offs, files, change requests and payments, in one place your clients can follow, instead of scattered chats and PDFs.
        </p>
        <div>
          <Link href="/log-in" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Sign in to Cadence
          </Link>
        </div>
      </section>

      <section aria-labelledby="problems" className="flex flex-col gap-8">
        <h2 id="problems" className="text-headline-md text-ink">Where client projects drift</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <li key={p.title} className="flex flex-col gap-2 rounded-card border border-border bg-surface p-6">
              <h3 className="text-headline-sm text-ink">{p.title}</h3>
              <p className="text-body-sm text-ink-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="flex flex-col gap-8">
        <h2 id="how" className="text-headline-md text-ink">How Cadence runs a project</h2>
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 rounded-card border border-border bg-surface p-6">
              <p className="tnum text-label-md text-ink-muted">0{i + 1}</p>
              <h3 className="text-headline-sm text-ink">{s.title}</h3>
              <p className="text-body-sm text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="features" className="flex flex-col gap-6">
        <h2 id="features" className="text-headline-md text-ink">What is in the portal</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f} className="rounded-card border border-border bg-surface px-5 py-4 text-body-sm text-ink">{f}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
