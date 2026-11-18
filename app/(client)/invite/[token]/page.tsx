import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { getViewer } from "@/lib/session";
import { previewInvitation } from "@/server/invitations";
import { AcceptForm } from "./accept-form";

export const metadata: Metadata = { title: "Project invitation" };

type Params = { params: Promise<{ token: string }> };

/**
 * Invitation landing page (Stitch: invitation, invitation_desktop). Shows the project before
 * sign-in. Signed-out visitors sign in with the next parameter, so they return here. Accepting
 * requires the matching email.
 */
export default async function InvitationPage({ params }: Params) {
  const { token } = await params;
  const preview = previewInvitation(token);

  if (!preview) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-6 px-4 py-12 sm:px-6">
        <h1 className="text-headline-lg text-ink">This invitation is no longer valid</h1>
        <p className="text-body-lg text-ink-muted">Ask the studio to send a new invitation.</p>
      </main>
    );
  }

  const viewer = await getViewer();
  const nextPath = `/invite/${token}`;
  const signedInWithInvitedEmail = viewer !== null && viewer.email.trim().toLowerCase() === preview.email;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-6 px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-label-md text-primary">{preview.studioName}</p>
        <h1 className="text-headline-lg text-ink">{preview.projectTitle}</h1>
        <p className="text-body-lg text-ink-muted">
          Review the scope and milestones for {preview.clientName}, then sign in to continue.
        </p>
      </header>

      <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 sm:p-6">
        {!viewer ? (
          <>
            <p className="text-body-sm text-ink-muted">Sign in with the invited email address to open this project.</p>
            <Link href={`/log-in?next=${encodeURIComponent(nextPath)}`} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}>
              Sign in to review
            </Link>
          </>
        ) : signedInWithInvitedEmail ? (
          <AcceptForm token={token} />
        ) : (
          <>
            <p role="alert" className="text-body-sm text-danger">
              This invitation was sent to a different email address. Sign out and sign in with the invited address.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
