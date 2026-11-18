"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validation/auth";

/**
 * Requests a magic link. The address is never placed in the URL. The check-email
 * screen is the same whether or not the account exists, so the form cannot be used to
 * find out who has an account.
 */
export function LogInForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = signInSchema.safeParse({ email });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }
    setFieldError(undefined);
    setServerError(undefined);
    setPending(true);
    const { error } = await authClient.signIn.magicLink({
      email: parsed.data.email,
      callbackURL: nextPath,
      errorCallbackURL: "/access-problem",
    });
    setPending(false);
    if (error) {
      setServerError("We could not send the link. Try again in a moment.");
      return;
    }
    router.push("/check-email");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {serverError ? (
        <p role="alert" className="rounded-control border border-danger-border bg-danger-subtle p-3 text-body-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-body-sm font-medium text-ink">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? "email-error" : "email-help"}
          className="h-11 rounded-control border border-border bg-surface px-3.5 text-body-sm text-ink focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 aria-[invalid=true]:border-danger"
        />
        <p id="email-help" className="text-label-md text-ink-muted">
          We will email you a one-time sign-in link.
        </p>
        {fieldError ? (
          <p id="email-error" className="text-body-sm text-danger">
            {fieldError}
          </p>
        ) : null}
      </div>

      <Button type="submit" loading={pending} className="w-full">
        Send sign-in link
      </Button>

      <p className="text-body-sm text-ink-muted">
        Have a link already? <Link href="/access-problem" className="font-medium text-primary underline-offset-4 hover:underline">Request a new one</Link>.
      </p>
    </form>
  );
}
