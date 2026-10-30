/**
 * Our song — the little card on the opening screen that starts the music, and
 * the small player that stays in the corner while she reads.
 *
 * Browsers will not start audio on their own, so nothing plays until she taps.
 * Once she does, the same <audio> element keeps going through the whole page.
 */

import { el } from "./dom.js";

const playIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.5 5.4 18.4 12 8.5 18.6Z" fill="currentColor"/></svg>';

const pauseIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.2 5.6v12.8M14.8 5.6v12.8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>';

/** The album sleeve if we have one, otherwise a little vinyl disc. */
function songArt(song, block) {
  if (song.art) {
    const title = song.title || "Our song";
    return el("img", {
      class: `${block}__art`,
      src: song.art,
      alt: song.artist ? `${title} by ${song.artist} — album cover` : `${title} — album cover`,
      width: 120,
      height: 120,
      loading: "lazy",
      decoding: "async",
    });
  }

  return el("span", { class: `${block}__disc`, "aria-hidden": "true" });
}

/** The card itself — rendered inside the opening screen. */
export function songCard(song) {
  if (!song || !song.src) return null;

  const button = el(
    "button",
    {
      class: "song-card__play",
      type: "button",
      "aria-pressed": "false",
      "aria-label": `Play ${song.title || "our song"}`,
    },
    el("span", {
      class: "song-card__play-icon",
      "aria-hidden": "true",
      html: playIcon,
    }),
    el("span", { class: "song-card__play-label", text: "Play" })
  );

  const card = el(
    "div",
    { class: "song-card paper", dataset: { songCard: "" } },
    songArt(song, "song-card"),
    el(
      "span",
      { class: "song-card__text" },
      el("span", {
        class: "song-card__label",
        text: song.label || "our song",
      }),
      el("span", {
        class: "song-card__title",
        text: song.title || "Our song",
      }),
      song.artist
        ? el("span", { class: "song-card__artist", text: song.artist })
        : null
    ),
    button
  );

  const hint = el("p", { class: "song-card__hint", hidden: true });

  return el("div", { class: "hero__song", "data-reveal": "" }, card, hint);
}

/** Wire the card to the audio, and add the corner player. */
export function initSongPlayer(song) {
  const slot = document.querySelector(".hero__song");
  if (!song || !song.src || !slot) return;

  const card = slot.querySelector("[data-song-card]");
  const playButton = card.querySelector(".song-card__play");
  const playLabel = card.querySelector(".song-card__play-label");
  const playIcons = card.querySelector(".song-card__play-icon");
  const hint = slot.querySelector(".song-card__hint");
  const ariaTitle = song.title || "our song";

  const audio = new Audio();
  audio.src = song.src;
  audio.preload = "none";
  audio.loop = song.loop !== false;
  audio.volume = typeof song.volume === "number" ? song.volume : 0.55;

  /* The little player that follows her down the page. */
  const dockButton = el("button", {
    class: "music-dock__toggle",
    type: "button",
    "aria-pressed": "false",
    "aria-label": `Pause ${ariaTitle}`,
    html: pauseIcon,
  });

  const dock = el(
    "div",
    { class: "music-dock", hidden: true },
    songArt(song, "music-dock"),
    el(
      "span",
      { class: "music-dock__text" },
      el("span", { class: "music-dock__title", text: song.title || "Our song" }),
      song.artist
        ? el("span", { class: "music-dock__artist", text: song.artist })
        : null
    ),
    dockButton
  );

  document.body.append(audio, dock);

  let started = false;
  // While the card is on screen it is the control; the corner player only takes
  // over once she has scrolled past it.
  let cardInView = true;

  function checkCardPosition() {
    const rect = slot.getBoundingClientRect();
    const nowInView = rect.bottom > 0 && rect.top < window.innerHeight;

    if (nowInView === cardInView) return;
    cardInView = nowInView;
    render();
  }

  window.addEventListener("scroll", checkCardPosition, { passive: true });

  window.addEventListener("resize", checkCardPosition, { passive: true });

  function render() {
    const playing = !audio.paused && !audio.ended;

    card.classList.toggle("is-playing", playing);
    playButton.setAttribute("aria-pressed", String(playing));
    playButton.setAttribute(
      "aria-label",
      `${playing ? "Pause" : "Play"} ${ariaTitle}`
    );
    playLabel.textContent = playing ? "Pause" : started ? "Resume" : "Play";
    playIcons.innerHTML = playing ? pauseIcon : playIcon;

    dock.hidden = !started || cardInView;
    dock.classList.toggle("is-playing", playing);
    dockButton.setAttribute("aria-pressed", String(playing));
    dockButton.setAttribute(
      "aria-label",
      `${playing ? "Pause" : "Play"} ${ariaTitle}`
    );
    dockButton.innerHTML = playing ? pauseIcon : playIcon;
  }

  function showHint() {
    hint.textContent = `the song isn't there yet — drop it at ${song.src} ♡`;
    hint.hidden = false;
    started = false;
    render();
  }

  function start() {
    const attempt = audio.play();
    if (attempt && typeof attempt.then === "function") {
      attempt.then(
        () => {
          started = true;
          hint.hidden = true;
          render();
        },
        () => {
          // Missing file, or playback refused. Either way, say so quietly.
          showHint();
        }
      );
    }
  }

  function toggle() {
    if (audio.paused) start();
    else audio.pause();
  }

  playButton.addEventListener("click", toggle);
  dockButton.addEventListener("click", toggle);

  audio.addEventListener("pause", render);
  audio.addEventListener("play", () => {
    started = true;
    hint.hidden = true;
    render();
  });
  audio.addEventListener("error", showHint);

  // A friend's video takes over the sound while it plays.
  document.addEventListener(
    "play",
    (event) => {
      if (!(event.target instanceof HTMLVideoElement)) return;
      if (!audio.paused) audio.pause();
    },
    true
  );

  render();
}
