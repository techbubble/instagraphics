# Instagraphic for Google Slides and Docs

Editor add-on. `Extensions > Instagraphic > Open Instagraphic` opens a 300px
sidebar that embeds www.instagraphic.app. On a graphic's card (My Graphics or
the download page), "Insert image" / "Insert animated GIF" charge the usual
first-download credit, then pass the file to the sidebar, which calls
`insertImage()` in `Code.js`:

- Slides: placed on the current slide, scaled to 80% and centered.
- Docs: inserted at the cursor (or appended), no wider than the text column.

The site detects the sidebar by its parent origin
(`https://*-script.googleusercontent.com`; see `src/lib/embed.ts`) and
switches to the compact layout and the Insert buttons.

Scopes: `presentations.currentonly`, `documents.currentonly`,
`script.container.ui`, `openid`, `userinfo.email`. The last two let the
sidebar sign the user in with their Google email (`/api/auth/google-addon`,
gated by `GOOGLE_ADDON_CLIENT_IDS`). The add-on cannot read other files.

Known limit: sign-in inside the sidebar uses a third-party cookie, so it does
not persist in browsers that block them (Safari, Chrome Incognito).

## Push the code

    npx @google/clasp login
    npx @google/clasp create --type standalone --title "Instagraphic" --rootDir workspace-addon
    npx @google/clasp push

(Or create a project at script.google.com and paste `Code.js`,
`Sidebar.html`, and `appsscript.json` - enable "Show appsscript.json" in
Project Settings.)

## Test

Apps Script editor > Deploy > Test deployments > Install, add a Slides or
Docs file as the test document, open it, then Extensions > Instagraphic.

## Publish to the Google Workspace Marketplace

1. Google Cloud: create a project, then in Apps Script > Project Settings >
   Google Cloud Platform Project, switch to its project number.
   Then set the add-on sign-in env var: open the add-on once against the
   local dev server (BASE_URL localhost:3002); the `npm run dev` terminal
   prints `[dev] Accepting add-on client ID <id>`. In Vercel > Settings >
   Environment Variables (Production) set `GOOGLE_ADDON_CLIENT_IDS=<id>` and
   redeploy. Without it, production rejects add-on auto sign-in (403) and
   users get the normal Sign in button. The ID changes whenever the Cloud
   project changes, so redo this after any switch.
2. OAuth consent screen (External): app name Instagraphic, logo
   `marketing/workspace-marketplace/icon-128.png`, homepage
   https://www.instagraphic.app, privacy https://www.instagraphic.app/privacy,
   terms https://www.instagraphic.app/terms, authorized domain
   instagraphic.app (verify it in Google Search Console), the five scopes
   above. All are non-sensitive, so only brand verification is needed.
3. Apps Script > Deploy > New deployment > type Add-on. Copy the
   deployment ID.
4. Enable "Google Workspace Marketplace SDK" in the Cloud project. In App
   Configuration: visibility Public, individual and admin install, App
   integration > Editor add-on > Google Slides and Google Docs, Apps Script
   project + deployment ID, the same five scopes, developer details.
5. Store Listing: text below, graphics from `marketing/workspace-marketplace/`
   (icons 32/48/96/128, card banner 220x140, screenshots 1280x800), category
   Business tools > Office applications (or Creative tools), pricing "Free
   with paid features". Submit for review (typically several days to a few
   weeks).
6. After approval set `WORKSPACE_MARKETPLACE_URL` and `STORES_LIVE` in
   `src/lib/links.ts`.

## Listing text

Short description (200 max):

    Turn your text into animated diagrams in your brand colors, right inside Slides and Docs. 229 layouts; insert as an image or animated GIF.

Detailed description:

    Instagraphic turns plain text into polished, animated diagrams without leaving your presentation or document.

    Open Instagraphic from the Extensions menu, pick one of 229 layouts (process, timeline, cycle, funnel, pyramid, hierarchy, comparison, maps, and more), type your text, and choose your brand colors and fonts. The preview draws itself as you type.

    When it looks right, click Insert. Instagraphic places a crisp image or an animated GIF on your current slide or at your cursor in Docs.

    - 229 layouts across 9 categories
    - Your colors and fonts on every graphic
    - Insert as a high-resolution image or animated GIF
    - Also download SVG, PNG, or GIF from instagraphic.app
    - Commercial use included

    Pricing: every new account gets 5 free credits. After that, credits are $0.20 each, sold in $1 packs of 5. One credit unlocks one graphic for unlimited inserts and downloads. No subscription.

    Privacy: the add-on only adds the image you choose to the file you have open. It cannot read your files or access your Google account data.

Support URL: https://www.instagraphic.app/faq
