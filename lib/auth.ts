import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "@/db/client";
import * as authSchema from "@/db/auth-schema";
import { env } from "@/lib/env";
import { getEmailSender } from "@/lib/services/email";
import { magicLinkEmail } from "@/lib/services/email-templates";

/**
 * Authentication: magic link only, no passwords (ADR 0003).
 * Anyone can create an account by requesting a link. Project access is still
 * limited to listed contacts (db: project_contacts), so a new account sees nothing.
 * Session tokens are stored in our database. The library handles hashing and cookies.
 */
function createAuth() {
  return betterAuth({
  baseURL: env.APP_URL,
  secret: env.AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
  plugins: [
    magicLink({
      expiresIn: 60 * 15,
      sendMagicLink: async ({ email, url }) => {
        const message = magicLinkEmail(url);
        await getEmailSender().send({ to: email, ...message });
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
}

let instance: ReturnType<typeof createAuth> | undefined;

function authInstance(): ReturnType<typeof createAuth> {
  instance ??= createAuth();
  return instance;
}

/** Created on first use, so importing this module does not need configuration. */
export const auth: ReturnType<typeof createAuth> = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_target, property) {
    const real = authInstance();
    const value = Reflect.get(real, property);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export type Auth = ReturnType<typeof createAuth>;
