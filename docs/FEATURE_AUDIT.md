# VolariX Feature Audit

## How to use this file

This is the chronological, resumable record for every material feature. Read it
after `CODEX.md` and `docs/HANDOFF.md`. Before ending work, update the active
entry with what changed, verification performed, blockers, and the exact next
action. Never claim an external setting has changed unless it was visibly
verified in the provider dashboard.

## Active feature — P0: Private Supabase Authentication

**Status:** Blocked awaiting owner sign-in to Supabase dashboard  
**Owner decision:** Use Supabase Auth for private, single-user access; remove
all demo and public-registration flows.

### Completed

- Owner created Supabase project `ifixqeuxvfsxzkxlytqm` on September 4, 2026.
- Project URL and publishable key were stored locally in
  `app/supabase.config.js`; this file is ignored by Git.
- Added `app/supabase.config.example.js`, `.gitignore`, and
  `docs/SUPABASE_PRIVATE_AUTH.md`.
- Updated `CODEX.md`, `README.md`, `PROJECT_STATUS.md`, `TASK_QUEUE.md`, and
  `HANDOFF.md` to make P0 the active prerequisite for future real-data work.
- In the Supabase dashboard, Email Auth was visibly enabled and anonymous
  sign-ins were visibly disabled.

### Not completed

- `Allow new users to sign up` was visibly enabled and must be disabled, then
  saved in Supabase Authentication > Sign In / Providers.
- The owner account must be invited or created in Supabase Authentication >
  Users. The owner must enter their own email and set their own password.
- Authentication URL configuration must be set to the final deployed VolariX
  domain.
- The app has not yet been changed to use Supabase Auth; legacy demo code still
  exists and is not suitable for a private deployment.

### Resume steps

1. Owner signs in to the Supabase dashboard for this project.
2. Disable `Allow new users to sign up` and save; verify it displays disabled.
3. Configure Site URL and Redirect URLs for the deployment domain.
4. Owner creates/invites their private user account.
5. Implement the code cutover defined in `SUPABASE_PRIVATE_AUTH.md`.
6. Update the login BDD test and verify P0 before starting P1.

### Security constraints

- Never add a Supabase secret/service-role key to code, configuration, a commit,
  or an agent message.
- Never ask for or store the owner's password.
- Do not release the deployment as private until P0's completion checks pass.

## Next feature — P1: Market-data integration

P1 is paused until P0 is complete. Existing Yahoo Finance quote polling and
Alternative.me Fear & Greed fetching remain in place with cached static-data
fallback. Finnhub, FRED, and any options-data provider must use server-side
handling for secrets and must first have a defined UI consumer.
