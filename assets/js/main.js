import { content } from "./content.js";
import { buildPage } from "./sections.js";
import { initSnowfall } from "./snowfall.js";
import { initLightbox } from "./lightbox.js";
import { initReveal, prefersReducedMotion } from "./dom.js";
import { initSongPlayer } from "./song.js";

buildPage(content);

initSnowfall(document.querySelector("#snowfall"));
initReveal(document);
initLightbox(document);
initSongPlayer(content.song);

/* --------------------------------------------------------------------------
   Back to top — only appears once she has left the opening screen.
   -------------------------------------------------------------------------- */

function initBackToTop() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "to-top";
  button.setAttribute("aria-label", "Back to the top");
  button.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg>';

  document.body.append(button);

  let ticking = false;

  const update = () => {
    ticking = false;
    button.classList.toggle(
      "is-visible",
      window.scrollY > window.innerHeight * 0.85
    );
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  });
}

initBackToTop();

/* --------------------------------------------------------------------------
   Only one video should ever be playing at a time.
   -------------------------------------------------------------------------- */

document.addEventListener(
  "play",
  (event) => {
    const playing = event.target;
    if (!(playing instanceof HTMLVideoElement)) return;

    document.querySelectorAll("video").forEach((video) => {
      if (video !== playing) video.pause();
    });
  },
  true
);
