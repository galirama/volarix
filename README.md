# VolariX — Risk-First Options Intelligence

## Deploy in 30 Seconds (Netlify Drop)
1. Download and unzip `volarix-repo.zip`
2. Go to **netlify.com/drop**
3. Drag the `app/` folder onto the page
4. Live at `https://random-name.netlify.app`
5. Rename: Site Settings → Domain → `volarix.netlify.app`

## Demo Login
| Email | Password | Plan |
|---|---|---|
| trader@example.com | Password123 | Pro |
| demo@volarix.com | Demo1234 | Free |

MFA auto-fills in demo mode.

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
CLAUDE.md     ← AI agent instructions (read first every session)
```

## For Claude — Start Every Session With
> "Read CLAUDE.md. Tell me what's built, what's broken, and what's next."

⚠️ Not financial advice. Educational tools only.
