/**
 * Sections — each function returns a piece of the scrapbook, built from the
 * data in content.js. Nothing personal is hard-coded here.
 */

import { el, isPlaceholder, paragraphs, placeholderNote } from "./dom.js";
import { songCard } from "./song.js";
import {
  heartSvg,
  snowflakeSvg,
  snowmanSvg,
  interludeCaptions,
} from "./snowman.js";

const zoomIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M8.5 11h5M11 8.5v5"/></svg>';

const heartIcon = (className) => {
  const span = el("span", { class: "svg-inline", "aria-hidden": "true" });
  span.innerHTML = heartSvg(className);
  return span;
};

function rule() {
  return el("span", { class: "eyebrow__rule", "aria-hidden": "true" });
}

function sectionHead({ eyebrow, heading, supporting, id }) {
  return el(
    "header",
    { class: "section-head", "data-reveal": "" },
    eyebrow
      ? el(
          "p",
          { class: "eyebrow eyebrow--center" },
          rule(),
          eyebrow,
          rule()
        )
      : null,
    el("h2", { id }, heading),
    supporting
      ? el("p", { class: "section-head__support", text: supporting })
      : null
  );
}

/* -------------------------------------------------------------------------- */
/* A Polaroid                                                                  */
/* -------------------------------------------------------------------------- */

export function polaroid(photo, index = 0) {
  const rotation = Number.isFinite(photo.rotation) ? photo.rotation : 0;

  const figure = el("figure", { class: "polaroid" });
  figure.style.setProperty("--rot", `${rotation}deg`);

  if (photo.tape) {
    figure.append(el("span", { class: "polaroid__tape", "aria-hidden": "true" }));
  }

  const window_ = el("span", { class: "polaroid__window" });
  if (photo.width && photo.height) {
    window_.style.aspectRatio = `${photo.width} / ${photo.height}`;
  }

  const image = el("img", {
    class: "polaroid__img",
    src: photo.src,
    alt: "",
    loading: "lazy",
    decoding: "async",
  });
  if (photo.width) image.width = photo.width;
  if (photo.height) image.height = photo.height;

  window_.append(
    image,
    el("span", {
      class: "polaroid__zoom",
      "aria-hidden": "true",
      html: zoomIcon,
    })
  );

  const described =
    photo.caption && !isPlaceholder(photo.caption)
      ? photo.caption
      : photo.alt && !isPlaceholder(photo.alt)
        ? photo.alt
        : `photograph ${index + 1}`;

  const button = el(
    "button",
    {
      class: "polaroid__button",
      type: "button",
      "aria-label": `Open photograph: ${described}`,
      dataset: {
        src: photo.src || "",
        alt: photo.alt || "",
        caption: photo.caption || "",
      },
    },
    window_
  );

  const caption = el("figcaption", {
    class: `polaroid__caption${isPlaceholder(photo.caption) ? " is-placeholder-text" : ""}`,
    text: photo.caption || "",
  });

  figure.append(button, caption);
  return figure;
}

/* -------------------------------------------------------------------------- */
/* A. Opening                                                                  */
/* -------------------------------------------------------------------------- */

function heroSection(content) {
  const hero = content.hero;

  const flake = (modifier) => {
    const node = el("span", {
      class: `hero__flake hero__flake--${modifier}`,
      "aria-hidden": "true",
    });
    node.innerHTML = snowflakeSvg();
    return node;
  };

  const scene = el(
    "div",
    { class: "hero__scene", "data-reveal": "" },
    el(
      "div",
      { class: "hero__scene-inner" },
      flake("a"),
      flake("b"),
      flake("c"),
      el("div", { class: "hero__mound", "aria-hidden": "true" }),
      el("div", { class: "hero__snowman", html: snowmanSvg({ hat: true }) })
    )
  );

  const eyebrow = el(
    "p",
    { class: "eyebrow", "data-reveal": "" },
    rule(),
    hero.eyebrow
  );
  eyebrow.style.setProperty("--reveal-delay", "0.05s");

  const title = el(
    "h1",
    {
      class: "hero__title",
      id: "hero-title",
      "aria-label": `${hero.titleLine} ${hero.name}`,
      "data-reveal": "",
    },
    el("span", { class: "hero__title-pre", text: hero.titleLine }),
    el(
      "span",
      { class: "hero__name" },
      hero.name,
      heartIcon("hero__heart")
    )
  );
  title.style.setProperty("--reveal-delay", "0.12s");

  const support = el("p", {
    class: "hero__support",
    text: hero.supporting,
    "data-reveal": "",
  });
  support.style.setProperty("--reveal-delay", "0.16s");

  const actions = el(
    "div",
    { class: "hero__actions", "data-reveal": "" },
    el(
      "a",
      { class: "btn btn--primary", href: "#birthday-letter" },
      hero.ctaLabel,
      heartIcon("btn__heart")
    ),
    el("p", { class: "hero__note", text: hero.note })
  );
  actions.style.setProperty("--reveal-delay", "0.2s");

  const copy = el(
    "div",
    { class: "hero__copy" },
    eyebrow,
    title,
    support,
    actions,
    songCard(content.song)
  );

  return el(
    "section",
    { class: "hero", "aria-labelledby": "hero-title" },
    el("div", { class: "hero__inner wrap" }, copy, scene)
  );
}

/* -------------------------------------------------------------------------- */
/* B. Letter                                                                   */
/* -------------------------------------------------------------------------- */

function letterSection(content) {
  const letter = content.letter;
  const hasPlaceholder = letter.paragraphs.some(isPlaceholder);

  const deco = (modifier) => {
    const node = el("span", {
      class: `letter__deco letter__deco--${modifier}`,
      "aria-hidden": "true",
    });
    node.innerHTML = snowflakeSvg();
    return node;
  };

  const paper = el(
    "article",
    {
      class: "paper letter__paper",
      "aria-label": "A birthday letter for Haasini",
      "data-reveal": "",
    },
    el("p", { class: "letter__greeting", text: letter.greeting }),
    el(
      "div",
      { class: "letter__body" },
      ...letter.paragraphs.map((text) =>
        el("p", {
          class: isPlaceholder(text) ? "is-placeholder-text" : null,
          text,
        })
      )
    ),
    hasPlaceholder
      ? placeholderNote(
          "this letter is a placeholder — write yours in assets/js/content.js"
        )
      : null,
    el("p", { class: "letter__signoff", text: letter.signOff }),
    el(
      "span",
      { class: "letter__seal", "aria-hidden": "true" },
      heartIcon()
    )
  );

  return el(
    "section",
    { class: "section letter", id: "birthday-letter", "aria-labelledby": "letter-title" },
    el(
      "div",
      { class: "wrap letter__inner" },
      el(
        "header",
        { class: "section-head letter__head", "data-reveal": "" },
        el(
          "p",
          { class: "eyebrow eyebrow--center" },
          rule(),
          letter.eyebrow,
          rule()
        ),
        el("h2", { id: "letter-title" }, letter.heading)
      ),
      paper,
      deco("tl"),
      deco("br")
    )
  );
}

/* -------------------------------------------------------------------------- */
/* C. Gallery                                                                  */
/* -------------------------------------------------------------------------- */

function gallerySection(content) {
  const gallery = content.gallery;

  const grid = el("div", { class: "gallery__grid" });

  gallery.photos.forEach((photo, index) => {
    const slot = el("div", { class: "polaroid-slot", "data-reveal": "" });
    slot.style.setProperty(
      "--reveal-delay",
      `${Math.min(index * 0.05, 0.28).toFixed(2)}s`
    );
    slot.append(polaroid(photo, index));
    grid.append(slot);
  });

  return el(
    "section",
    { class: "section gallery", id: "memories", "aria-labelledby": "gallery-title" },
    el(
      "div",
      { class: "wrap" },
      sectionHead({
        eyebrow: gallery.eyebrow,
        heading: gallery.heading,
        supporting: gallery.supporting,
        id: "gallery-title",
      }),
      grid,
      el(
        "div",
        { class: "gallery__foot", "data-reveal": "" },
        el("p", {
          class: "gallery__hint",
          text: "tap a photograph to see it properly ♡",
        })
      )
    )
  );
}

/* -------------------------------------------------------------------------- */
/* D. Video messages                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Everyone's video, straight after the letter. Each one lives in a Polaroid with
 * their name written in the chin, so the wall of photos below can stay a wall.
 */
function videosSection(content) {
  const videos = content.videos;
  const items = Array.isArray(videos && videos.items)
    ? videos.items.filter((video) => video && video.src)
    : [];

  if (!items.length) return null;

  const tilts = [-1.6, 1.1, -0.7, 1.9, -1.1, 0.6];
  const wall = el("div", { class: "video-wall" });

  shuffled(items, 20261031).forEach((video, index) => {
    const frame = el("figure", {
      class: "polaroid video-polaroid",
      "data-reveal": "",
    });

    frame.style.setProperty("--rot", `${tilts[index % tilts.length]}deg`);

    if (index % 3 === 1) {
      frame.append(el("span", { class: "polaroid__tape", "aria-hidden": "true" }));
    }

    const window_ = el("span", { class: "polaroid__window video-polaroid__window" });
    if (video.width && video.height) {
      window_.style.aspectRatio = `${video.width} / ${video.height}`;
    }

    const media = el("video", {
      class: "video-polaroid__media",
      controls: true,
      playsinline: "true",
      preload: "none",
      poster: video.poster || null,
      src: video.src,
      "aria-label": `A video message from ${video.name || "a friend"}`,
    });

    media.addEventListener("play", () => {
      frame.classList.add("is-playing");

      // One message at a time, and never over the background music.
      document.querySelectorAll(".video-polaroid__media").forEach((other) => {
        if (other !== media && !other.paused) other.pause();
      });
    });

    media.addEventListener("ended", () => frame.classList.remove("is-playing"));

    window_.append(
      media,
      el("span", {
        class: "video-polaroid__hint",
        "aria-hidden": "true",
        text: "press play",
      })
    );

    frame.append(
      window_,
      el("figcaption", {
        class: "polaroid__caption video-polaroid__name",
        text: video.name || "A friend",
      })
    );

    wall.append(frame);
  });

  return el(
    "section",
    { class: "section videos", id: "video-messages", "aria-labelledby": "videos-title" },
    el(
      "div",
      { class: "wrap" },
      sectionHead({
        eyebrow: videos.eyebrow,
        heading: videos.heading,
        supporting: videos.supporting,
        id: "videos-title",
      }),
      wall
    )
  );
}

/* A stable shuffle, so the wall looks scattered but never changes on reload. */
function seededRandom(seed) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(items, seed = 20261030) {
  const random = seededRandom(seed);
  const out = items.slice();

  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out;
}

/**
 * Drops each note somewhere inside its own stretch of photos, at a random-ish
 * spot. Pure shuffle can leave a long photo-only run at the end, which starts to
 * read as "the notes, then the pictures"; this keeps them mixed without ever
 * falling into a note-photo-note rhythm.
 */
function interspersed(photos, notes, seed = 20261030) {
  if (!notes.length) return photos;

  const random = seededRandom(seed + 7);
  const stretch = photos.length / notes.length;

  // Each note gets its own stretch of the pile, and lands at a random point in
  // it. The stretches never overlap, so notes cannot bunch up at one end.
  const cuts = notes.map((note, index) => {
    const start = Math.round(index * stretch);
    const end = Math.round((index + 1) * stretch);
    const room = Math.max(0, end - start - 1);
    return start + (room ? Math.floor(random() * (room + 1)) : 0);
  });

  const out = [];
  let taken = 0;

  notes.forEach((note, index) => {
    while (taken <= cuts[index] && taken < photos.length) {
      out.push(photos[taken]);
      taken += 1;
    }
    out.push(note);
  });

  while (taken < photos.length) {
    out.push(photos[taken]);
    taken += 1;
  }

  return out;
}

/**
 * One person's contribution: their note sits on one of their photos as its
 * caption, and every other photo of theirs is just another picture in the wall.
 * Nobody gets a section, so nobody's pile of photos is countable.
 */
function friendEntries(person) {
  const photos = Array.isArray(person.photos)
    ? person.photos.filter((photo) => photo && photo.src)
    : [];

  if (!photos.length) return [];

  const anchor = photos.find((photo) => photo.featured) || photos[0];
  const lines = paragraphs(person.message);
  const others = photos.filter((photo) => photo !== anchor);

  const entries = others.map((photo) => ({ kind: "photo", person, photo }));

  entries.push(
    lines.length
      ? { kind: "note", person, photo: anchor, lines }
      : // No words from them, so their name goes in that photo's handwritten chin.
        { kind: "photo", person, photo: anchor, label: person.name }
  );

  return entries;
}

function noteEntry({ person, photo, lines }, photoIndex) {
  const nameId = `friend-name-${person.id}`;
  const hasPlaceholder = lines.some(isPlaceholder);
  const name = person.name || "A friend";

  return el(
    "article",
    {
      class: "wall__note",
      id: `note-${person.id}`,
      "aria-labelledby": nameId,
      "data-reveal": "",
    },
    polaroid(photo, photoIndex),
    el(
      "div",
      { class: "paper wall__caption" },
      el("p", { class: "wall__caption-label", text: "A little note from" }),
      el(
        "h3",
        { class: "wall__name", id: nameId },
        name,
        heartIcon("wall__heart")
      ),
      el(
        "div",
        { class: "note__body" },
        ...lines.map((text) =>
          el("p", {
            class: isPlaceholder(text) ? "is-placeholder-text" : null,
            text,
          })
        )
      ),
      hasPlaceholder
        ? placeholderNote(
            `this note is a placeholder — add ${!isPlaceholder(name) ? `${name}'s` : "their"} words in assets/js/content.js`
          )
        : null
    )
  );
}

function photoEntry({ photo, label }, photoIndex) {
  const named =
    label && !photo.caption ? { ...photo, caption: label } : photo;

  return el(
    "div",
    { class: "wall__photo", "data-reveal": "" },
    polaroid(named, photoIndex)
  );
}

function interlude(index) {
  const pair = el("div", { class: "interlude__snowmen" });

  const one = el("div", { class: "interlude__snowman" });
  one.innerHTML = snowmanSvg({ hat: true, heart: true, wave: true });

  const two = el("div", { class: "interlude__snowman interlude__snowman--small" });
  two.innerHTML = snowmanSvg({ hat: false, heart: false, wave: false });

  pair.append(one, two);

  return el(
    "div",
    { class: "interlude", "aria-hidden": "true" },
    el("span", { class: "interlude__rule" }),
    pair,
    el("p", {
      class: "interlude__caption",
      text: interludeCaptions[index % interludeCaptions.length],
    })
  );
}

function friendsSection(content) {
  const friends = content.friends;
  const people = Array.isArray(friends.people) ? friends.people : [];

  const entries = shuffled(people.flatMap(friendEntries));
  const photos = entries.filter((entry) => entry.kind === "photo");
  const notes = entries.filter((entry) => entry.kind === "note");
  const wall = el("div", { class: "wall" });

  interspersed(photos, notes).forEach((entry, index) => {
    wall.append(
      entry.kind === "note" ? noteEntry(entry, index) : photoEntry(entry, index)
    );
  });

  return el(
    "section",
    { class: "section friends", id: "notes", "aria-labelledby": "friends-title" },
    el(
      "div",
      { class: "wrap" },
      sectionHead({
        eyebrow: friends.eyebrow,
        heading: friends.heading,
        supporting: friends.supporting,
        id: "friends-title",
      }),
      wall
    )
  );
}

/* -------------------------------------------------------------------------- */
/* F. Closing                                                                  */
/* -------------------------------------------------------------------------- */

function closingSection(content) {
  const closing = content.closing;

  const note = el(
    "div",
    {
      class: "paper surprise",
      id: "hidden-note",
      role: "region",
      "aria-label": "One last little thing",
      tabindex: "-1",
      hidden: true,
    },
    el("p", { class: "surprise__label", text: "for you, and only you" }),
    el("p", { class: "surprise__body", text: closing.hiddenMessage }),
    isPlaceholder(closing.hiddenMessage) ? placeholderNote() : null
  );

  const snowmanButton = el(
    "button",
    {
      class: "snowman-btn",
      type: "button",
      "aria-expanded": "false",
      "aria-controls": "hidden-note",
    },
    el("span", {
      class: "closing__snowman",
      "aria-hidden": "true",
      html: snowmanSvg({ hat: true, heart: true, wave: true }),
    }),
    el("span", { class: "snowman-btn__hint", text: closing.snowmanPrompt })
  );

  const reveal = () => {
    const isOpen = note.classList.contains("is-open");
    snowmanButton.setAttribute("aria-expanded", String(!isOpen));

    if (isOpen) {
      note.classList.remove("is-open");
      window.setTimeout(() => {
        if (!note.classList.contains("is-open")) note.hidden = true;
      }, 450);
      return;
    }

    note.hidden = false;
    requestAnimationFrame(() => {
      note.classList.add("is-open");
      note.focus({ preventScroll: true });
    });
  };

  snowmanButton.addEventListener("click", reveal);

  const messageParagraphs = paragraphs(closing.message);
  const messageIsPlaceholder = messageParagraphs.some(isPlaceholder);

  const inner = el(
    "div",
    { class: "wrap closing__inner" },
    el("h2", {
      class: "closing__heading",
      id: "closing-title",
      text: closing.heading,
      "data-reveal": "",
    }),
    el("p", {
      class: "closing__support",
      text: closing.supporting,
      "data-reveal": "",
    }),
    el(
      "div",
      { class: "closing__message", "data-reveal": "" },
      ...messageParagraphs.map((text) =>
        el("p", {
          class: isPlaceholder(text) ? "is-placeholder-text" : null,
          text,
        })
      ),
      messageIsPlaceholder
        ? placeholderNote(
            "this message is a placeholder — write yours in assets/js/content.js"
          )
        : null
    ),
    el(
      "div",
      { class: "closing__scene", "data-reveal": "" },
      el("div", { class: "closing__mound", "aria-hidden": "true" }),
      snowmanButton
    ),
    note,
    el("p", { class: "closing__sign", text: closing.signOff, "data-reveal": "" })
  );

  return el(
    "section",
    { class: "closing", id: "closing", "aria-labelledby": "closing-title" },
    inner
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

function footerSection(content) {
  const footer = content.footer;

  const flake = (modifier) => {
    const node = el("span", {
      class: `footer__flake footer__flake--${modifier}`,
      "aria-hidden": "true",
    });
    node.innerHTML = snowflakeSvg();
    return node;
  };

  return el(
    "footer",
    { class: "footer" },
    flake("a"),
    flake("b"),
    flake("c"),
    el(
      "div",
      { class: "wrap footer__inner" },
      heartIcon("footer__heart"),
      el("p", { class: "footer__note", text: footer.note }),
      el("p", {
        class: "footer__meta",
        text: `${content.person}'s birthday · ${footer.year}`,
      }),
      footer.credit
        ? el(
            "p",
            { class: "footer__credit" },
            `${footer.credit.text} `,
            footer.credit.href
              ? el("a", {
                  href: footer.credit.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  text: footer.credit.label || "credit",
                })
              : footer.credit.label
          )
        : null
    )
  );
}

/* -------------------------------------------------------------------------- */

export function buildPage(content) {
  const app = document.querySelector("#app");
  if (!app) return;

  app.append(
    heroSection(content),
    letterSection(content),
    videosSection(content),
    gallerySection(content),
    interlude(0),
    friendsSection(content),
    closingSection(content)
  );

  document.body.append(footerSection(content));
}
