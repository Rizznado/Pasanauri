# Pasanauri — Kazbegi Avenue landing page

A one-page, animated, mobile-first website for **Restaurant Pasanauri** on Alexander Kazbegi Avenue, Tbilisi.
Plain HTML / CSS / JavaScript — no build step, no dependencies.

## Run it
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

To put it online for free: **Settings → Pages → Deploy from branch → `main` / root**.

## What's inside
- `index.html` — page structure and English copy
- `css/style.css` — design tokens (colours, fonts) at the top, responsive rules at the bottom
- `js/main.js` — menu data, Georgian translations, animations, booking modal
- `images/` — optimised WebP photos

## Motion
Preloader that draws a khinkali, word-by-word headline reveals, masked hero image wipe, rotating badge,
rising steam, parallax mountain, count-up stats, marquee ticker, 3D tilt cards, magnetic buttons,
animated "how to eat khinkali" guide, delivery scooter riding a route, mobile tab bar.
All motion is switched off for visitors who set *reduce motion* on their device.

## Before going live — replace these
| What | Where |
|---|---|
| Phone number (`+995 000 00 00 00`) | `index.html` → `.phone` link |
| Dish names & prices (sample values) | `js/main.js` → `DISHES` |
| Opening hours (11:00–00:00) and street number | `index.html` (+ Georgian in `js/main.js` → `KA`) |
| Booking form destination | `js/main.js` → `form.addEventListener('submit', …)` (e.g. Formspree, WhatsApp or e-mail) |
| Glovo link | `index.html` → delivery section |
| Photos | `images/` — swap for the restaurant's own photos, keep the same file names |

## Photo credits
Photos from [Unsplash](https://unsplash.com) (free to use under the Unsplash License), incl. the Mt. Kazbek photo by Mahmut Zeljkovic.
