# For Ammu

A two-screen love-letter website with an animated pixel-art lantern scene, an original pixel portrait, and background music.

[Open the hosted website](https://a-lantern-for-ammu.copperlemur.chatgpt.site)

## Run locally

From this folder, run:

```sh
python -m http.server 4173
```

Then open http://localhost:4173. No build or installation is required.

## Files

- `index.html` contains the letter and both screens.
- `style.css` contains responsive layouts and styling.
- `app.js` draws the animated scenery and handles navigation and music.
- `portrait.js` draws an original pixel portrait using whole-pixel shapes. It does not load, blur, pixelate, or process a reference image.
- `assets/kingdom-dance.mp3` is the user-supplied background music.

Tap the sound button or Continue to start music. The site respects reduced-motion preferences.

Pixel artwork was authored in code with AI assistance. No AI image-generation tool was used. The supplied music retains its original ownership; no license is granted for it here.
