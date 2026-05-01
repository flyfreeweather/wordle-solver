# WS — Wordle Solver

A fast, algorithmic Wordle solver that runs entirely in your browser — no server, no dependencies, no internet connection required after the first load.

Built as a Progressive Web App (PWA) so it can be installed directly to your iPhone or Android home screen and used exactly like a native app.

-----

## Features

- **Algorithmic solving** — filters against all constraints simultaneously
- **Three word lists** — common NYT-style answers shown separately from less common and obscure words, so you know which to try first
- **Works offline** — fully cached after first load via service worker
- **iPhone optimised** — tested on iOS with reliable touch input, auto-advancing tiles, and tap-to-cycle tile colours
- **Installable** — add to home screen on iPhone or Android for a full-screen, app-like experience
- **No downloads at runtime** — all three word lists are embedded directly in the HTML

-----

## How to Use

1. **Type your guess** — tap the first box and type each letter. The cursor advances automatically after each letter
1. **Set the colours** — tap any filled tile to cycle its colour to match your Wordle result:
- **Gray** → letter is not in the word
- **Yellow** → letter is in the word but wrong position
- **Green** → letter is in the correct position
1. **Add the guess** — tap **+ Add Guess** to lock it in
1. **Repeat** for each guess you've made
1. **Solve** — tap **Solve →** to see all possible matching words, split across the three word groups

-----

## Installing on iPhone

1. Open the app URL in **Safari** (not tested with Chrome or Firefox)
 https://flyfreeweather.github.io/wordle-solver/ 
1. Tap the three ... (bottom right)
1. Tap the **Share** button (box with arrow pointing up)
1. Tap View More (bottom right down arrow)
1. Tap **Add to Home Screen**
1. Select 'Open as Web App'
1. Tap **Add**

The app will appear on your home screen with the WS icon and open full-screen with no browser, just like a native app. It works completely offline after the first visit.
-----

## Installing on Mac

1. Open the app URL in Brave (not tested with Safari, Chrome or Firefox)
 https://flyfreeweather.github.io/wordle-solver/ 
1. Tap the hanburger menu (top right)
1. Tap the **Save and Share**
1. Tap **Install Wordle Solver**
1. In the **Install app** window Tap **Install**
1. It is now in Applications
-----

## Deleting from Mac
1. Open the Wordle Solver from **Launchpad**
1. Tap the hamburger menu (Top right)
1. Tap **Uninstall Wordle Solver**
-----

## Files

|File                |Description                                                         |
|--------------------|--------------------------------------------------------------------|
|`index.html`        |The entire app — HTML, CSS and JavaScript in one self-contained file|
|`manifest.json`     |PWA manifest — defines app name, icon and display mode              |
|`sw.js`             |Service worker — caches files for offline use                       |
|`icon-192.png`      |App icon at 192×192px                                               |
|`icon-512.png`      |App icon at 512×512px                                               |
|`WordsCommon.txt`   |Source list of common words                                         |
|`WordsLessCommon.txt`|Source list of less common words                                   |
|`WordsObscure.txt`  |Source list of obscure words                                        |

-----

## Word Lists

The solver uses three embedded word lists, each displayed in a distinct colour in the results:

- **Common words** (~1,993 words) — the primary list of likely Wordle answers as of March 2026, shown in **green**. Always try these first.
- **Less common words** (~1,207 words) — valid but less likely answers, shown in **amber**. Worth trying if the common list is exhausted.
- **Obscure words** (~1,648 words) — rare, archaic, or highly technical words that are valid five-letter English words but very unlikely to appear as a Wordle answer, shown in **purple**. Listed for completeness.

-----

## Result Sort Order

All three word groups are sorted using the same algorithm, which ranks words by how common each of their letters is in that specific position across real Wordle answers. The sort evaluates positions in this priority order: **5th → 1st → 3rd → 4th → 2nd**.

Position 5 (the final letter) is weighted most heavily because it has the strongest letter frequency signal — a small set of letters (e, y, t, r, l, n, d, h…) accounts for the vast majority of word endings. Position 2 carries the least weight.

Within each position, letters are ranked from most to least frequent:

| Position | Letter frequency order (most → least common) |
|----------|----------------------------------------------|
| 1st      | s, c, b, t, a, p, f, m, g, r, d, l, w, h, e, n, o, i, u, k, … |
| 2nd      | a, o, r, e, l, u, h, n, t, p, w, c, m, d, y, b, s, x, v, k, … |
| 3rd      | a, i, o, e, r, u, n, l, s, d, g, m, p, v, c, b, y, f, k, w, … |
| 4th      | e, n, s, r, i, l, c, t, o, u, g, d, m, k, p, v, f, w, h, z, … |
| 5th      | e, y, t, r, l, n, d, h, k, a, o, p, s, g, m, c, f, w, b, i, … |

Words whose letters rank highly across all five positions — particularly at positions 5 and 1 — will appear at the top of each group. This means the first suggestion in the common words list is generally the strongest next guess given everything the solver knows so far.

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
