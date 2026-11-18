import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { formatDate, formatMoney } from "@/lib/format";
import { retainerTotals } from "@/lib/milestones";
import { getViewer } from "@/lib/session";
import { getProposalView } from "@/server/proposals";

export const metadata: Metadata = { title: "Review proposal" };

type Params = { params: Promise<{ id: string }> };

/** Proposal review (Stitch: proposal_review, proposal_review_desktop). */
export default async function ProposalReviewPage({ params }: Params) {
  const { id } = await params;
  const viewer = await getViewer();
  if (!viewer) redirect("/log-in");

  const view = await getProposalView(viewer.userId, id);
  if (!view) notFound();
  const { project, proposal, signature } = view;
  const totals = retainerTotals(project.milestones);

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow={`Ref ${project.reference} · Version ${proposal.version} · Issued ${formatDate(proposal.issuedOn)}`}
        title={project.title}
        description={`Prepared by ${project.studioName} for ${project.clientName}`}
        actions={
          signature ? (
            <Link href={`/proposals/${id}/signed`} className={buttonVariants({ variant: "secondary" })}>
              View signed record
            </Link>
          ) : (
            <Link href={`/proposals/${id}/sign`} className={buttonVariants({ variant: "primary" })}>
              Review and sign
            </Link>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="scope-heading" className="flex min-w-0 flex-col gap-4">
          <h2 id="scope-heading" className="text-headline-md text-ink">Scope and payment schedule</h2>
          <ol className="flex flex-col gap-4">
            {project.milestones.map((m) => (
              <li key={m.position} className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="tnum text-label-md text-ink-muted">Milestone {m.position}</p>
                    <h3 className="text-headline-sm text-ink">{m.title}</h3>
                  </div>
                  <p className="tnum text-headline-sm text-ink">{formatMoney(m.amountMinor, project.currency)}</p>
                </div>
                {m.description ? <p className="text-body-sm text-ink-muted">{m.description}</p> : null}
              </li>
            ))}
          </ol>
        </section>

        <aside className="flex min-w-0 flex-col gap-6">
          <section aria-labelledby="terms-heading" className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 sm:p-6">
            <h2 id="terms-heading" className="text-headline-sm text-ink">Terms</h2>
            <dl className="flex flex-col gap-3 text-body-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Total</dt>
                <dd className="tnum font-medium text-ink">{formatMoney(totals.totalMinor, project.currency)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Milestones</dt>
                <dd className="tnum font-medium text-ink">{project.milestones.length}</dd>
              </div>
            </dl>
            <div className="border-t border-border pt-4">
              <h3 className="text-headline-sm text-ink">Revisions</h3>
              <p className="mt-2 text-body-sm text-ink-muted">{proposal.revisionTerms}</p>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
