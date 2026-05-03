# WS — Wordle Solver

A fast, algorithmic Wordle solver that runs entirely in your browser with no server, no dependencies, and no internet connection required after the first load. Built as a Progressive Web App (PWA) so it installs directly to your iPhone or Android home screen and works like a native app.

-----

## Who Is This For?

Have you ever finished a Wordle and wondered — *how did someone else get it in three guesses when it took you six?* You’re not alone. Behind every fast solver is a strategy: a feel for which letters appear most often, which positions they favour, and how to extract the most information from every single guess. This app was built to help you develop exactly that.

**You might be someone who:**

- Plays Wordle every day and wants to stop feeling stuck — you know the answer is *in there somewhere*, but you can’t quite nail it down before the tiles run out
- Is curious about the logic behind expert Wordle players and wants to understand *why* certain opening words are better than others
- Loves words and wants to discover five-letter gems you’ve never come across — from everyday vocabulary to the wonderfully obscure corners of the English language
- Is looking for a gentle but genuinely effective way to keep your brain sharp — the kind of daily mental workout that builds pattern recognition, lateral thinking, and linguistic intuition over time
- Wants to improve your problem-solving approach: learning to eliminate possibilities systematically, make decisions under uncertainty, and think several moves ahead
- Is recovering from illness, managing cognitive health, or simply believes — as the science suggests — that regularly challenging your brain with language and logic helps maintain and improve its function
- Teaches or learns English and wants an engaging tool that exposes you to a rich and varied vocabulary in a game context that makes words stick

**What makes this different from just looking up the answer?**

This app doesn’t just give you the answer — it teaches you *how to think*. By showing you which words are statistically strongest given what you know, which letters to test next, and how to probe the remaining possibilities efficiently, it builds the kind of intuition that makes you genuinely better at Wordle over time. Use it alongside your game, not instead of it, and you’ll find yourself needing it less and less — because the strategies it reveals become second nature.

Think of it as having a thoughtful friend who happens to know a lot about words leaning over your shoulder — not to spoil the puzzle, but to help you see it more clearly.

-----

## Features

- **Algorithmic solving** — filters against all constraints simultaneously with guaranteed accurate results
- **Three result groups** — exclusion probe words, common words, and less common words
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

### Exclusion Words (purple)

Shown first. Probe words to use when several common matches remain and you need more information before committing to a final answer. These are not necessarily the answer — they are strategic guesses designed to eliminate as many remaining candidates as possible in one guess.

### Common Words (green)

Words from the primary NYT-style answer list that match all your constraints. Sorted by positional letter frequency — the top-ranked word (marked ★) is statistically the strongest next guess based on where letters most commonly appear in Wordle answers.

Sorting priority order by position:

|Priority|Position 5|Position 1|Position 3|Position 4|Position 2|
|--------|----------|----------|----------|----------|----------|
|1st     |E         |S         |A         |E         |A         |
|2nd     |Y         |C         |I         |N         |O         |
|3rd     |T         |B         |O         |S         |R         |
|4th     |R         |T         |E         |R         |E         |
|5th     |L         |A         |R         |I         |L         |
|…       |…         |…         |…         |…         |…         |

### Less Common Words (amber)

Words from a secondary list that match all constraints. Valid Wordle answers but less likely to be chosen by NYT.

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

## Installing on iPhone

1. Open the app URL in **Safari** (not Chrome)
1. Tap the **Share** button
1. Tap **Add to Home Screen**
1. Tap **Add**

The app appears on your home screen with the WS icon and opens full-screen. It works completely offline after the first visit and updates itself automatically in the background when a new version is deployed.

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
|Obscure    |~900 words  |Unusual letter combinations used only as exclusion probe candidates|

-----

## Hosted on GitHub Pages

```
https://flyfreeweather.github.io/wordle-solver
```

-----

## Built With

Vanilla HTML, CSS and JavaScript — no frameworks, no build tools, no external dependencies.