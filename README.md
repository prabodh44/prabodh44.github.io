# Prabodh Tuladhar — Portfolio

Personal portfolio site. Plain HTML / CSS / vanilla JS. No build step. Hosts directly on GitHub Pages.

## File structure

```
.
├── index.html                  Main page (all sections)
├── styles.css                  Design system + layout + responsive
├── script.js                   Scroll-spy, mobile nav, form submit
├── profile.jpg                 Sidebar photo
├── Prabodh_Tuladhar_CV.pdf     Downloadable CV (linked from sidebar)
└── README.md                   This file
```

---

## 1. Deploy to GitHub Pages

You have two options. Pick one.

### Option A — Personal site (recommended: `prabodh44.github.io`)

This gives you the clean URL **https://prabodh44.github.io**.

1. Create a new public repo on GitHub named exactly `prabodh44.github.io`.
2. Clone it locally, or upload files via the GitHub web UI.
3. Copy all files from this folder into the repo root.
4. Commit and push to the `main` branch.
5. Go to the repo → **Settings → Pages**.
6. Under *Build and deployment*, set **Source** to *Deploy from a branch*, **Branch** to `main`, folder `/ (root)`, then **Save**.
7. Wait ~1 minute, then visit **https://prabodh44.github.io**.

### Option B — Project site (e.g. `prabodh44.github.io/portfolio`)

If you want to keep `prabodh44.github.io` free for something else:

1. Create a repo named anything (e.g. `portfolio`).
2. Follow steps 2–6 above.
3. Your URL will be **https://prabodh44.github.io/portfolio/**.

---

## 2. Configure the contact form (Formspree)

The contact form is wired to Formspree. You need a free account — takes 2 minutes.

1. Sign up at **https://formspree.io** (free tier = 50 submissions/month).
2. Click **+ New Form**, give it a name, use your email `prabodhtuladhar44@gmail.com`.
3. Formspree gives you an endpoint like:
   ```
   https://formspree.io/f/xyzabcde
   ```
4. Open `index.html` and find this line (around the `<form>` tag):
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" id="contactForm">
   ```
5. Replace `YOUR_FORMSPREE_ID` with the ID portion of your endpoint (e.g. `xyzabcde`).
6. The first real submission will trigger a confirmation email from Formspree — confirm it, then the form is live.

If you'd rather skip Formspree, replace the whole `<form>…</form>` block with:

```html
<p>Email me directly at <a href="mailto:prabodhtuladhar44@gmail.com">prabodhtuladhar44@gmail.com</a>.</p>
```

---

## 3. Add your project repo links

In `index.html`, find each `.project` block inside the Projects section. Update the `href` on the `project__link` anchors:

```html
<a href="#" class="project__link mono" ...>repo <span>→</span></a>
```

Replace `#` with the GitHub URL of each repo. If a project isn't public, delete that `<a>` tag entirely — the card still works without it.

Same applies if you later want to flesh out project descriptions — just edit the text inside `.project__desc` and remove the `<em class="placeholder">…</em>` span.

---

## 4. Tweak design tokens (colors, fonts, spacing)

All design tokens live at the top of `styles.css` under `:root`. Swap them to retheme the entire site in one place:

```css
--sand-bg:         #F4ECDE;   /* page background */
--terracotta:      #C2603E;   /* primary accent */
--forest-ink:      #1B2A22;   /* main text */
```

Fonts are loaded from Google Fonts in `index.html`. To change them, replace the `<link>` tag and update `--ff-display`, `--ff-body`, `--ff-mono` in `:root`.

---

## 5. Local preview

No build step needed. From the folder, run any static server:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000**.

---

## 6. Keeping the site updated

- **New blog post?** Add a new `<li class="post">…</li>` to the `#writing` section.
- **New job?** Add a new `<li class="role">…</li>` at the top of the `.timeline` in `#experience`.
- **New project?** Copy any `<article class="project">…</article>` block, update the fields.
- **Update CV?** Replace `Prabodh_Tuladhar_CV.pdf` with the new version (keep the filename so the download link still works).

Commit → push → GitHub Pages auto-rebuilds in a minute.
