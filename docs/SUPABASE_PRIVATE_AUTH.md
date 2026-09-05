# Private Supabase Authentication

## Goal

VolariX is changing from an open demo to a private, single-user application.
Supabase Auth will be the source of truth for sessions. No demo credential,
auto-filled MFA code, registration form, or client-side password list may
remain after this feature is complete.

## One-time owner setup

1. Create a free Supabase project.
2. In Authentication, enable the Email provider.
3. In Authentication > General Configuration, disable new-user sign-ups and
   anonymous sign-ins.
4. In Authentication > URL Configuration, set the Site URL and Redirect URL to
   the deployed VolariX domain. Add a local URL only if local testing is used.
5. In Authentication > Users, invite or create the owner's account. The owner
   sets their password through the invitation/reset flow; never store it in the
   repository or send it to an agent.
6. Copy the project URL and publishable key from Settings > API Keys.
7. Copy `app/supabase.config.example.js` to `app/supabase.config.js`, add those
   two public values, and keep the resulting file uncommitted. Never use a
   secret or service-role key in browser code.

## Implementation contract

- Load the Supabase browser SDK and the local config before login code.
- Use `supabase.auth.signInWithPassword()` for email/password login.
- Replace the `sessionStorage` demo object with a verified Supabase session.
- The app guard must use `supabase.auth.getUser()` before showing the dashboard.
- Remove all public registration, demo-login, demo credentials, auto-fill, and
  static OTP code from `app/login.html`, `app/index.html`, `app/app.html`,
  `README.md`, and tests.
- Add a real sign-out via `supabase.auth.signOut()`.
- Keep no secret key in the app, repository, browser, Netlify public settings,
  screenshots, or agent messages.

## Completion checks

- A visitor cannot self-register or enter through a demo path.
- Only the pre-created owner account can access `app.html`.
- Invalid and expired sessions redirect to login.
- Logout ends the Supabase session and prevents direct dashboard access.
- Browser console has no errors, existing BDD coverage is updated, and the
  dashboard remains under its 200,000-byte limit.

## Status

Configuration is awaiting the owner's Supabase project URL and publishable key.
Do not begin the code cutover until those are available, because the static app
would otherwise be deployed without a working login.
