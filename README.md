# Glow Studio — Makeup & Nail Artist website

A one-page portfolio site: hero, about, services (makeup + nails with prices), photo
portfolio with filters, client reviews, and a booking form that sends the details to
WhatsApp. Plain HTML/CSS/JS — no build step, nothing to install.

## Run it locally

```powershell
cd C:\Users\piyushvm\Documents\Repo\makeup-nail-studio
powershell -ExecutionPolicy Bypass -File serve.ps1
```
Open **http://localhost:5500**. Press `Ctrl+C` to stop. Another port: `serve.ps1 -Port 8000`.

(You can also just double-click `index.html` — everything works except that some browsers
block photos from a `file://` page.)

## Publish on GitHub Pages

`.github/workflows/deploy.yml` publishes the site on every push to `main`.

One-time setup:
1. Create an empty repository on GitHub (no README), e.g. `makeup-nail-studio`.
2. In the repo: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
3. Push this folder:
   ```bash
   git remote add origin https://github.com/<user>/makeup-nail-studio.git
   git push -u origin main
   ```
4. Watch the **Actions** tab — when "Deploy website to GitHub Pages" is green, the site is live at
   `https://<user>.github.io/makeup-nail-studio/`.

After that, every `git push` to `main` updates the live site in about a minute.
(A free account needs the repository to be **public** for Pages.)

## Make it yours

1. **Your details** — edit `config.js`: business name, your name, city, phone,
   WhatsApp number (digits only, with country code, e.g. `919876543210`), email,
   Instagram, experience numbers and prices. The whole page updates from that file.
2. **Your photos** — the site ships with free sample photos from Wikimedia Commons
   (authors and licences in `credits.html`, linked from the footer). Replace them with
   your own work before going live — overwrite the files in `images/`, keeping these names:

   | file | where it shows |
   |---|---|
   | `profile.jpg` | About section (portrait, ~4:5) |
   | `makeup-1.jpg`, `makeup-2.jpg`, `makeup-3.jpg` | Portfolio — Makeup |
   | `nails-1.jpg`, `nails-2.jpg`, `nails-3.jpg` | Portfolio — Nails |

   Also update each photo's caption and `alt` text in `index.html` (section `gallery`).
   Once all samples are replaced, delete `credits.html` and its footer link. If a photo is
   missing, a coloured placeholder shows its file name. To add more photos, copy a
   `<figure>` line.
3. **Text** — services, reviews and the About paragraph are in `index.html`.
4. **Colours** — change `--accent` (rose) and `--gold` at the top of `styles.css`.

## Files

| file | what |
|---|---|
| `index.html` | page content |
| `styles.css` | design and mobile layout |
| `config.js` | your details and prices |
| `script.js` | menu, tabs, gallery filter, WhatsApp booking |
| `serve.ps1` | local web server (built-in PowerShell) |
| `images/` | your photos |
