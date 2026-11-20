# Instagraphic for Google Slides and Docs

A card-based Google Workspace add-on. It has no HtmlService sidebar, so it
does not need the sensitive `script.container.ui` scope and needs no demo
video or sensitive-scope verification.

What the user sees (the Instagraphic icon in the right-hand side panel of
Slides or Docs):

- Their credit count and their 20 newest graphics, each with a thumbnail
  and "Insert image" / "Insert GIF" buttons.
- "New graphic" opens www.instagraphic.app in a window, already signed in
  as the same Google account. Closing the window refreshes the list.
- "Buy credits" opens the credits page the same way.

Insert behavior:

- Slides: on the current slide (or the first one), scaled to 80%, centered.
- Docs: at the cursor (or at the end), no wider than the text column.
- The first insert of a graphic uses 1 credit, like the site's downloads.

Files:

- `Code.js` - cards, insert, site API calls.
- `appsscript.json` - manifest: scopes, URL allowlist, add-on settings.

Site endpoints (`src/app/api/addon/`), all authenticated with the user's
Google ID token, checked against `GOOGLE_ADDON_CLIENT_IDS`:

- `GET /api/addon/graphics` - credits, graphics, signed thumbnail URLs,
  signed "open the site" URL.
- `POST /api/addon/insert` - charges the credit, returns the PNG or GIF.
- `GET /api/addon/thumb/<id>?t=...` - thumbnail (signed link, 2 hours).
- `GET /api/addon/open?t=...&next=/path` - signs the browser in (signed
  link, 15 minutes).

Scopes (none sensitive):

- `presentations.currentonly` - insert into the open deck only.
- `documents.currentonly` - insert into the open doc only.
- `script.external_request` - call www.instagraphic.app.
- `openid`, `userinfo.email` - identify the user by Google email.

Local testing is not possible: the add-on runs on Google's servers, which
cannot reach localhost, and the manifest only allows calls to
https://www.instagraphic.app/. Test against production.

---

## 1. Push the code to Apps Script

Run from the repo root.

a. Turn on the Apps Script API (once):
   https://script.google.com/home/usersettings > Google Apps Script API > On.

b. Log in (once): `npx @google/clasp login`

c. Push: `npx @google/clasp push --force`

d. Open the project:
   https://script.google.com/d/1mUd0S5q3VXBcyBMa-IQJMK7DkWpYpoqrIJ1AON56duydHKUP43NI3HQB/edit

If the editor still shows a file named `Sidebar`, delete it: hover over it
in the Files list > three dots > Delete.

---

## 2. Test it in Slides

The site changes must be live (pushed to main and deployed) first.

a. In the script editor, top right: Deploy > Test deployments.

b. Click Install. Click Done.

c. Open https://slides.new

d. In the right-hand side panel (the vertical strip of icons at the right
   edge; click the `<` arrow at the bottom right if it is hidden), click
   the Instagraphic icon.

e. Click Authorize access > pick your account > Allow.

f. The panel shows your credits and graphics. Click "Insert image" on one.

g. Click "New graphic": the site opens in a window, signed in. Make a
   graphic, click Save, close the window. The new graphic appears in the
   panel.

h. Repeat c-f in https://docs.new

If the panel says "Could not sign in to Instagraphic (401)", the Vercel
variable `GOOGLE_ADDON_CLIENT_IDS` is missing or wrong (section 3.3).

---

## 3. Publish to the Google Workspace Marketplace

Every Cloud console link acts on the project selected in the project picker
at the top of the page. Make sure it shows `Instagraphic`.

### 3.1 Google Cloud project (done)

Project number: 331995091192. The Apps Script project is linked to it.

### 3.2 OAuth consent screen: scopes

a. Open https://console.cloud.google.com/auth/scopes

b. Click Add or remove scopes.

c. Uncheck `.../auth/script.container.ui` if it is listed.

d. Under "Manually add scopes", paste these, one per line:

       https://www.googleapis.com/auth/presentations.currentonly
       https://www.googleapis.com/auth/documents.currentonly
       https://www.googleapis.com/auth/script.external_request
       openid
       https://www.googleapis.com/auth/userinfo.email

e. Click Add to table, then Update.

f. Check that the "Your sensitive scopes" and "Your restricted scopes"
   tables are empty. If any scope appears there, stop and report which.

g. Click Save.

h. Open https://console.cloud.google.com/auth/audience > Publish app >
   Confirm (skip if it already says "In production").

i. Open https://console.cloud.google.com/auth/branding and check that the
   logo, home page, privacy and terms links, and authorized domain
   `instagraphic.app` are filled in. Save. If a branding-verification
   button appears at https://console.cloud.google.com/auth/verification,
   submit it (no video needed for branding).

### 3.3 Vercel variable GOOGLE_ADDON_CLIENT_IDS

a. Open
   https://vercel.com/techbubbles-projects/instagraphics/settings/environment-variables

b. `GOOGLE_ADDON_CLIENT_IDS` (Production) must equal:
   `331995091192-pgci4irj7e9k63dl1vb6nc7o3r9nt9pi.apps.googleusercontent.com`
   Edit it if not, Save.

c. Open https://vercel.com/techbubbles-projects/instagraphics/deployments
   > top Production deployment > ... > Redeploy.

To print the ID again: in the script editor, pick `showClientId` in the
function dropdown next to Debug, click Run, read the Execution log.

### 3.4 Add-on deployment

a. Script editor > Deploy > New deployment.

b. Select type (gear icon) > Add-on.

c. Description: `1.0.0`. Click Deploy.

d. Copy the Deployment ID. Click Done.

For later code changes: Deploy > Manage deployments > pencil icon > Version:
New version > Deploy. The Deployment ID stays the same.

### 3.5 Marketplace SDK: App Configuration

a. Open
   https://console.cloud.google.com/apis/library/appsmarket-component.googleapis.com
   and click Enable.

b. Open
   https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk

c. App visibility: Public.

d. Installation settings: Individual + Admin install.

e. App integration: select "Google Workspace add-on" (not "Editor
   add-on").

f. Deployment: "Deploy using Apps Script deployment ID", paste it from
   3.4 d.

g. OAuth scopes: add the same 5 scopes as 3.2 d.

h. Developer information:
   1. Developer name: `Instagraphic`
   2. Developer website URL: `https://www.instagraphic.app`
   3. Developer email: `info@instagraphic.app`

i. Developer links:
   1. Terms of service: `https://www.instagraphic.app/terms`
   2. Privacy policy: `https://www.instagraphic.app/privacy`
   3. Support: `https://www.instagraphic.app/faq`

j. Save.

### 3.6 Marketplace SDK: Store Listing

a. Open
   https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk_publish

b. Language: English.

c. App name: `Instagraphic`

d. Short description and detailed description: copy from "Listing text"
   below.

e. Category: Business tools > Office applications.

f. Pricing: Free with paid features.

g. Icons from `marketing/workspace-marketplace/`: `icon-32.png`,
   `icon-48.png`, `icon-96.png`, `icon-128.png`.

h. Card banner: `marketing/workspace-marketplace/card-banner-220x140.jpg`

i. Screenshots (1280x800): the existing ones show the old sidebar. Take new
   ones of the side panel in Slides during section 2 (Cmd+Shift+4, then
   Space, click the browser window); they can be resized to 1280x800.

j. Support links: same three as 3.5 i.

k. Click Publish. This submits the listing for review.

### 3.7 After approval

a. Copy the listing URL from the Store Listing page (3.6 a).

b. In `src/lib/links.ts`, set `WORKSPACE_MARKETPLACE_URL` to it.

c. Commit and push.

---

## Listing text

Short description (200 max):

    Turn your text into animated diagrams in your brand colors and insert them into Slides and Docs. 229 layouts; insert as an image or animated GIF.

Detailed description:

    Instagraphic turns plain text into polished, animated diagrams and puts them into your presentation or document.

    Open Instagraphic from the side panel in Google Slides or Docs and click New graphic. Pick one of 229 layouts (process, timeline, cycle, funnel, pyramid, hierarchy, comparison, maps, and more), type your text, and choose your brand colors and fonts. The preview draws itself as you type.

    Save it, close the window, and your graphic is waiting in the side panel. Click Insert image or Insert GIF and it lands on your current slide or at your cursor in Docs.

    - 229 layouts across 9 categories
    - Your colors and fonts on every graphic
    - Insert as a high-resolution image or animated GIF
    - Also download SVG, PNG, or GIF from instagraphic.app
    - Commercial use included

    Pricing: every new account gets 5 free credits. After that, credits are $0.20 each, sold in $1 packs of 5. One credit unlocks one graphic for unlimited inserts and downloads. No subscription.

    Privacy: the add-on only adds the image you choose to the file you have open. It uses your Google email only to sign you in to Instagraphic and cannot read your files.

Support URL: https://www.instagraphic.app/faq
