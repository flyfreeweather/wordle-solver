# WS — Wordle Solver

A fast, algorithmic Wordle solver that runs entirely in your browser with no server, no dependencies, and no internet connection required after the first load. Built as a Progressive Web App (PWA) so it installs directly to your iPhone or Android home screen and works like a native app.

-----

## Features

- **Algorithmic solving** — filters against all constraints simultaneously with guaranteed accurate results
- **Three result groups** — common words, less common words, and exclusion probe words
- **Positional frequency sorting** — common words sorted by statistical letter frequency per position
- **Exclusion word suggestions** — probe words that test the most informative untested letters
- **Duplicate letter constraint handling** — correctly handles words like BROOM where one letter appears twice
- **Works fully offline** — cached on first load, auto-updates silently when a new version is deployed
- **iPhone optimised** — tested on iOS Safari with reliable touch input and tap-to-cycle tile colours
- **Installable as a home screen app** — full-screen, no browser chrome
- **Completely self-contained** — all word lists are embedded in the HTML, nothing fetched at runtime

-----

## How to Use

1. **Type your guess** — tap the first box and type each letter, the cursor advances automatically
1. **Set the colours** — tap any filled tile to cycle its colour to match your Wordle result:
- **Gray** → letter is not in the word (or appears fewer times than you guessed)
- **Yellow** → letter is in the word but in the wrong position
- **Green** → letter is in the correct position
1. **Add the guess** — tap **+ Add Guess** to lock it in
1. **Repeat** for each guess you have made so far
1. **Solve** — tap **Solve →** to see all matching words across three groups

-----

## Result Groups

### Common Words (green)

Words from the primary NYT-style answer list that match all your constraints. Sorted by positional letter frequency — the top-ranked word (marked ★) is statistically the strongest next guess based on where letters most commonly appear in Wordle answers.

### Less Common Words (amber)

Words from a secondary list that match all constraints. Valid Wordle answers but less likely to be chosen by NYT.

### Exclusion Words (purple)

Probe words to use when several common matches remain and you need more information before committing to a final answer. These are not necessarily the answer — they are strategic guesses designed to eliminate as many remaining candidates as possible in one guess.

-----

## Exclusion Word Logic

Exclusion words are calculated as follows:

**Step 1 — Identify tested letters**
Every letter used across all your entered guesses is collected into a tested set, regardless of whether it came back gray, yellow, or green.

**Step 2 — Score untested letters by value**
Each letter not in the tested set is scored by how many of the current common word matches contain it. A letter appearing in 4 out of 5 remaining words scores 4 — testing it in one guess tells you something about all 4 of those words.

**Step 3 — Build the exclusion candidate pool**
All words across the combined common, less common, and obscure word lists are filtered to keep only words where:

- Every letter is untested (zero overlap with already-guessed letters)
- Every letter in the word is unique (no repeated letters — a repeated letter wastes a probe slot)

**Step 4 — Score and rank candidates**
Each candidate is scored by the sum of the letter values (from Step 2) of its unique letters. A word that covers 5 high-value untested letters scores highest.

**Step 5 — Return top 3**
The three highest-scoring candidates are returned, sorted by score descending then by positional frequency. The top pick (★) covers the most informative untested letters in one guess.

Exclusion words only appear when 2 or more common matches remain, since with only 1 match left you already know the answer.

-----

## Constraint Logic

The solver correctly handles duplicate letters. When a letter appears as both gray and yellow or green (for example guessing BROOM when the answer has only one O):

- The confirmed count of that letter is calculated from greens and yellows
- Any candidate word containing that letter more times than the confirmed count is eliminated

This prevents false positives like CROOK appearing as a match after BROOM has established there is only one O.

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
## Installing on iPhone

1. Open the app URL in Safari (not tested with Chrome or Firefox) https://flyfreeweather.github.io/wordle-solver/
1. Tap the three ... (bottom right)
1. Tap the Share button (box with arrow pointing up)
1. Tap View More (bottom right down arrow)
1. Tap Add to Home Screen
1. Select 'Open as Web App'
1. Tap Add

The app appears on your home screen with the WS icon and opens full-screen. It works completely offline after the first visit and updates itself automatically in the background when a new version is deployed.

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

|File           |Description                                                         |
|---------------|--------------------------------------------------------------------|
|`index.html`   |The entire app — HTML, CSS and JavaScript in one self-contained file|
|`manifest.json`|PWA manifest — defines app name, icon and display mode              |
|`sw.js`        |Service worker — caches files for offline use and auto-updates      |
|`icon-192.png` |App icon at 192×192px                                               |
|`icon-512.png` |App icon at 512×512px                                               |

-----

## Word Lists

Three embedded word lists, all stored inside `index.html` with no runtime fetching:

|List       |Size        |Purpose                                                            |
|-----------|------------|-------------------------------------------------------------------|
|Common     |~1,993 words|Primary NYT-style answers, shown in green                          |
|Less common|~1,207 words|Valid but unlikely answers, shown in amber                         |
|Obscure    |~1,648 words|Unusual letter combinations used only as exclusion probe candidates|

-----

## Hosted on GitHub Pages

The live app is available at:

```
https://flyfreeweather.github.io/wordle-solver/
```

-----

## Built With

Vanilla HTML, CSS and JavaScript — no frameworks, no build tools, no external dependencies.