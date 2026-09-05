# VolariX — Risk-First Options Intelligence

## Deploy in 30 Seconds (Netlify Drop)
1. Download and unzip `volarix-repo.zip`
2. Go to **netlify.com/drop**
3. Drag the `app/` folder onto the page
4. Live at `https://random-name.netlify.app`
5. Rename: Site Settings → Domain → `volarix.netlify.app`

## Private Access Migration

The checked-in site still contains legacy demo access and must not be used as a
private deployment yet. Follow `docs/SUPABASE_PRIVATE_AUTH.md` to create the
owner's Supabase project; the next implementation task removes all demo and
public-registration paths.

## Update a File on GitHub
1. Go to your repo on github.com
2. Click the file → pencil icon → paste new code
3. Click **Commit changes**
4. Netlify auto-redeploys in ~30 seconds

## Repo Structure
```
app/          ← Deploy this folder to Netlify
  index.html  ← Public landing page
  login.html  ← Auth + MFA
  app.html    ← Full dashboard
  netlify.toml
docs/         ← All product + technical docs
  DEVELOPER_GUIDE.md ← Technical architecture & presentation guide
  HANDOFF.md   ← Current implementation state for the next contributor
tests/        ← BDD automated UI test suite (Cucumber + Playwright)
CODEX.md      ← AI agent instructions & memory bank (read first every session)
```

## Testing (BDD Automated UI Tests)
VolariX uses Cucumber and Playwright for BDD automated testing to ensure existing functionality remains intact during continuous development.
1. Install Node.js 20 or newer.
2. Run `npm ci` to install the locked dependencies.
3. Run `npx playwright install chromium` to install the test browser.
4. Run `npm test` to execute the full BDD suite locally.

## For AI Agents — Start Every Session With
> "Read CODEX.md and docs/HANDOFF.md. Tell me what's built, what's broken, and what's next."

⚠️ Not financial advice. Educational tools only.
