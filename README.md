# WS — Wordle Solver

A fast, algorithmic Wordle solver that runs entirely in your browser — no server, no dependencies, no internet connection required after the first load.

Built as a Progressive Web App (PWA) so it can be installed directly to your iPhone or Android home screen and used exactly like a native app.

-----

## Features

- **Algorithmic solving** — filters against all constraints simultaneously
- **Two word lists** — common NYT-style answers as of March 2026 shown separately from less common words, so you know which to try first
- **Works offline** — fully cached after first load via service worker
- **iPhone optimised** — tested on iOS with reliable touch input, auto-advancing tiles, and tap-to-cycle tile colours
- **Installable** — add to home screen on iPhone or Android for a full-screen, app-like experience
- **No downloads at runtime** — both word lists are embedded directly in the HTML

-----

## How to Use

1. **Type your guess** — tap the first box and type each letter. The cursor advances automatically after each letter
1. **Set the colours** — tap any filled tile to cycle its colour to match your Wordle result:
- **Gray** → letter is not in the word
- **Yellow** → letter is in the word but wrong position
- **Green** → letter is in the correct position
1. **Add the guess** — tap **+ Add Guess** to lock it in
1. **Repeat** for each guess you’ve made
1. **Solve** — tap **Solve →** to see all possible matching words, split into the common and less common words

-----

## Installing on iPhone

1. Open the app URL in **Safari** (not tested with Chrome or Firefox)
1. Tap the **Share** button (box with arrow pointing up)
1. Tap **Add to Home Screen**
1. Tap **Add**

The app will appear on your home screen with the WS icon and open full-screen with no browser, just like a native app. It works completely offline after the first visit.

-----

## Files

|File           |Description                                                         |
|---------------|--------------------------------------------------------------------|
|`index.html`   |The entire app — HTML, CSS and JavaScript in one self-contained file|
|`manifest.json`|PWA manifest — defines app name, icon and display mode              |
|`sw.js`        |Service worker — caches files for offline use                       |
|`icon-192.png` |App icon at 192×192px                                               |
|`icon-512.png` |App icon at 512×512px                                               |

-----

## Word Lists

The solver uses two embedded word lists:

- **Common words** (~1,993 words) — the primary list of likely Wordle answers as of March 2026, shown in green in results
- **Less common words** (~1,207 words) — valid but less likely answers, shown in amber in results

-----

## Hosted on GitHub Pages

The live app is available at:

```
https://flyfreeweather.github.io/wordle-solver/
```

-----

## Built With

- Vanilla HTML, CSS and JavaScript — no frameworks or build tools
- Service Worker API for offline caching
- Web App Manifest for PWA install support
