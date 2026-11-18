"use client";

import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

/** Browser client for sign-in. Calls the /api/auth routes. */
export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});
