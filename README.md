# Haasini's birthday scrapbook ☃️♡

A burgundy-and-ivory winter scrapbook, built by hand: a letter, everyone's video
messages, a pile of Polaroid memories, quiet background music, and one last thing
hiding behind a snowman.

No framework, no build step, no dependencies. It is plain HTML, CSS and ES modules,
so it opens instantly on a phone and will still work years from now.

```
index.html               the page shell (fonts, styles, script)
assets/js/content.js     ALL the words, photos and videos live here
assets/js/sections.js    builds each section from that content
assets/js/dom.js         tiny element + reveal helpers
assets/js/snowman.js     the snowmen, hearts and snowflakes (inline SVG)
assets/js/snowfall.js    the canvas snowfall
assets/js/lightbox.js    the photo viewer
assets/js/song.js        the song card and the little player that follows her
assets/videos/           everyone's video messages, already web-sized
assets/audio/            the background track
scripts/import-videos.mjs  shrinks new videos and grabs their poster frames
scripts/serve.mjs        local preview server
scripts/check-assets.mjs verifies every image/video path exists
```

---

## Run it locally

```bash
npm start
```

Then open <http://127.0.0.1:4173>. (`npm start` runs
`node scripts/serve.mjs` — there is nothing to install.)

Opening `index.html` directly works too, but ES modules are fussy about
`file://` in some browsers, so the little server is the reliable way.

---

## Change the words

Everything is in [`assets/js/content.js`](assets/js/content.js). Anything inside
`[square brackets]` is a placeholder — replace it with the real thing and the
placeholder tag disappears on its own.

| What you want to change | Where |
| --- | --- |
| Her name, the hero title and supporting line | `hero` |
| Your birthday letter | `letter.paragraphs` (one string per paragraph) |
| Your sign-off under the letter | `letter.signOff` |
| The memory gallery photos and captions | `gallery.photos` |
| The video messages and their names | `videos.items` |
| The photo/notes wall heading | `friends` |
| Each friend's name, message, photos | `friends.people[]` |
| The background music, its title and volume | `song` |
| The closing message and final line | `closing` |
| The note hidden behind the snowman | `closing.hiddenMessage` |
| The footer line | `footer` |

Messages can hold more than one paragraph: leave a blank line in the string and
each block is rendered as its own paragraph.

---

## Add a friend

1. Add a folder for their photos: `assets/images/friends/ananya/`.
2. Copy an object inside `friends.people` and give it a new `id` (`ananya`).
3. Fill in `name`, `message` and `photos`.
4. Mark **one** of their photos with `featured: true` — their words get printed
   as a note under that photo.
5. That's it. Their photos drop into the same wall as everyone else's, in a
   scattered but fixed order, and their note appears on one of them.

### Already wired up

| Friend | Photos | Name on | Message |
| --- | --- | --- | --- |
| Chann | `assets/images/friends/chann/` (5) | `03.jpg` | none yet |
| Riya | `assets/images/friends/riya/` (3) | `03.jpg` | none yet |
| Vanshika | `assets/images/friends/vanshika/` (12) | `12.jpg` | hers, in full |
| Aaruni | `assets/images/friends/aaruni/` (8) | `01.jpg` | hers, in full |
| Mahi | `assets/images/friends/mahi/` (5) | `04.jpg` | hers, in full |
| Navya | `assets/images/friends/navya/` (6) | `06.jpg` | hers, in full |
| Daksh | `assets/images/friends/daksh/` (3) | `02.jpg` | his, in full |
| Saan | `assets/images/friends/saan/` (4) | `02.jpg` | none yet |
| Hiya | `assets/images/friends/hiya/` (3) | `02.jpg` | none yet |
| Ishaan | `assets/images/friends/ishaan/` (1) | `01.jpg` | his, in full |
| Raghav | `assets/images/friends/raghav/` (2) | `02.jpg` | none yet |
| Dhruv | `assets/images/friends/dhruv/` (1) | `01.jpg` | none yet |

Video messages wired up: Aaruni, Aditya, Aryaan, Chann, Daksh, Dhruv, Hiya,
Ishaan and Naman (one joint clip), Kartik, Mahi, Navya, Raghav, Saan, Shriyans
and Vanshika. Only Riya has a written note and photos but no video.

Two of Chann's and Riya's originals were phone screenshots with black bars;
those were cropped to the photograph itself and saved as `04-cropped.jpg` and
`02-cropped.jpg`. Two more (Navya's `02.jpg`, Saan's `01.jpg`) were stored
sideways and were turned upright on import. The untouched originals are still in
`D:\Haasini Birthday`.

Every message is in word for word, split into paragraphs where the friend broke
the line. Each one is printed as a note on a paper slip tucked under one of that
person's photos.

Friends with no message have `message: null`, which is a supported state, not a
gap: their name is simply written in the handwritten chin of one of their
Polaroids, and the rest are loose in the wall. Only Chann, Riya and Vanshika have
video placeholders
(`assets/videos/<name>.mp4`); everyone else has `video: null`, so no empty frame
appears. Add a `video` object and the frame appears.

The main memory gallery now uses the real photos from the `all pics` folder
(`assets/images/gallery/photo-1.jpg` … `photo-8.jpg`). Give them captions in
`gallery.photos` whenever you like.

The wall is shuffled once with a fixed seed, so it looks scattered but never
changes between reloads — she won't see a different pile every visit. Notes and
photos interleave, so nobody's contribution sits in its own block and no one can
count how many photos each person sent.

Optional things can be left out entirely:

- `message: null` → no note; their name goes in one photo's chin instead.
- One photo and a message (Dhruv, Ishaan) → the note still prints under that one
  photo, so the rule is the same for everybody.
- `photos: []` → the data is skipped; nothing appears.
- `video: null` → no video frame at all (no empty box).
- No `caption` → a Polaroid without a handwritten label.
- One photo or five — the arrangement adapts.

---

## Photos

Put the file in `assets/images/...` and point `src` at it, relative to the site
root:

```js
photos: [
  {
    src: "assets/images/friends/friend-4/photo-1.jpg",
    alt: "The two of us on the pier in Kochi",
    caption: "the day we got lost on purpose",
    rotation: -3,
    width: 1200,
    height: 1500,
  },
],
```

- `featured: true` marks the photo their note (or name) is printed under. Every
  other photo spills into the same wall as everyone else's — a friend with three
  photos and a friend with twelve end up looking like the same habit.
- `width` / `height` are the photo's **real** pixel dimensions. They reserve space
  so nothing jumps around while loading, and they keep portrait photos portrait.
- `rotation` is the tilt in degrees. Small numbers (2–4) look like paper; more
  looks like a joke.
- `alt` describes the photo for anyone using a screen reader. Please fill it in.
- `tape: true` adds a strip of washi tape to the top of that Polaroid.
- `.jpg`, `.png`, `.webp` and `.svg` all work. For real photos, export around
  1600px on the long edge — enough for the lightbox, still quick on mobile.

The gallery reads the same shape, so captions, rotations, optional photos and
ordering are all data too.

---

## The background music

The opening card holds a play button and the track's name. Once she presses play
the music keeps going while she scrolls, with a small player appearing in the
bottom corner after the card is out of view.

```js
song: {
  label: "playing quietly",
  title: "Breezy May (Acoustic)",
  artist: "Axletree",
  src: "assets/audio/quiet-guitar.m4a",
  volume: 0.3, // background level — 0.3 is quiet, 1 is full
},
```

- **Why it changed from Lovers Rock:** the videos are the point of the page now,
  and a song with vocals underneath a friend talking is a mess. This is a quiet
  acoustic guitar instrumental instead, so both can live together.
- `src` is *Breezy May (Acoustic)* by Axletree, from the Free Music Archive under
  **CC BY 4.0** — that licence asks for a credit, which is the small line in the
  footer (`footer.credit`, edit or remove it if you swap the track).
- `volume` sits low on purpose. Raise it towards `0.5` if you want it louder;
  it never plays over a video, because starting a video pauses the music.
- Want Lovers Rock back? Put your own copy at `assets/audio/lovers-rock.mp3`,
  set `src` to it, and add `art: "assets/images/decor/lovers-rock-cover.jpg"`
  for the album sleeve on the card.
- Browsers refuse to autoplay sound, so she taps play herself. Nothing breaks if
  she never does.
- `loop: false` in `song` plays the track once instead of on repeat (it loops by
  default, so the page is never silent halfway down).
- The server in `scripts/serve.mjs` sends audio and video with the right type and
  supports range requests, so seeking works locally too.

---

## Videos

The video messages sit right after the letter, every clip in its own Polaroid
with the sender's name written in the chin. They are driven by `videos.items`,
not by the friend list, so someone who only sent a video still gets a card.

**Adding one:**

1. Drop the file in `D:/Haasini Birthday/VIDEOS`, named after whoever sent it
   (`Ananya.mp4`).
2. Run `node scripts/import-videos.mjs`. It re-encodes every new clip to
   H.264 at max 960px, writes a poster frame, and prints the block to paste into
   `videos.items`.
3. Paste that block in. Ordering is shuffled for you, so where it goes does not
   matter.

Files already imported are skipped on the next run, so it is safe to re-run it
whenever a new video arrives.

The raw folder holds some very large clips (one was 434 MB). This is why the
import step exists: the whole set is now about 43 MB, and each video downloads
only when she presses play. `Shreyans.MP4` and `Shriyans.MP4` were the same file
byte for byte, so only Shriyans is used.

Ishaan and Naman sent theirs in three pieces (`VIDEOS/Ishaan and Naman/1.mp4`,
`2.mp4`, `3.mp4`). Those were joined in order into one 2:11 file,
`assets/videos/ishaan-naman.mp4`, with a single card named "Ishaan and Naman".
Nothing needs re-stitching unless those pieces change.

A poster frame is what she sees before pressing play — a real frame from the
clip, saved at `assets/images/decor/video-posters/<name>.jpg`. If a name looks
wrong in the chin, it is just the `name` field in `videos.items`.

The script needs `ffmpeg`. It looks in `.freebuff/tools/` first, then on your
PATH. If neither has it, either install ffmpeg or run
`FFMPEG=C:/path/to/ffmpeg.exe node scripts/import-videos.mjs`.

---

## Check your paths before you share it

```bash
npm run check
```

It verifies every photo and poster referenced in `content.js` (and in
`index.html`) actually exists, and lists any video still waiting on a file.
It exits with an error if something is missing — which is exactly what you want
to see *before* sending the link.

---

## Deploy it

The site is static: upload the folder as-is, no build command, no environment
variables.

**Easiest — Netlify Drop:** go to <https://app.netlify.com/drop>, drag this whole
folder onto the page, and you get a live URL in seconds. You can rename the site
in Site settings to something like `haasini-birthday`.

**Cloudflare Pages:** create a Pages project, choose "Direct Upload", and upload
the folder. Good if you later want the site behind a login (see below).

**GitHub Pages:** push the folder to a repository, then Settings → Pages →
deploy from the `main` branch root. The URL looks like
`https://yourname.github.io/repo-name/`.

All of these serve the site over HTTPS for free.

### Sharing it privately

A plain static host gives you a public URL that is hard to guess but not secret.
If you want it properly private, put it behind Cloudflare Access:

1. Deploy to Cloudflare Pages.
2. In the Cloudflare dashboard go to **Zero Trust → Access → Applications** and
   add a self-hosted application for the Pages domain.
3. Add a policy that allows only specific email addresses (hers, yours).
4. She opens the link, enters her email, and gets a one-time code.

Cloudflare's Zero Trust free plan covers up to 50 users, which is plenty for a
birthday. The other hosts' password protection is generally a paid feature.

Two small notes: the fonts load from Google Fonts, so the very first paint needs
a connection (the site falls back to Georgia and a script face gracefully), and
the page itself never sends anything anywhere — there is no analytics, no
cookies, no third-party script.

---

## Small details worth knowing

- Photos open in a lightbox with arrow keys, swipe, and Escape to close.
- The snowman at the end reveals the hidden note; it is a real button, so it
  works with the keyboard too.
- Every animation is disabled for anyone whose system asks for reduced motion,
  and the snowfall is capped at ~80 flakes.
- Nothing is hidden behind JavaScript-only links: the hero button is a real
  anchor to the letter.
- Starting one video message pauses the other and the background music, so two
  people never talk over each other.
