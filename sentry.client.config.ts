import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Session Replay (Sentry.replayIntegration) is not available on the
  // installed @sentry/nextjs@10.47.0 — it's absent from both the runtime
  // export and the type declarations, so it was removed here to keep the
  // build green. Re-add once the SDK exposes it again (or swap to a version
  // that does) if session replay is needed.

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
