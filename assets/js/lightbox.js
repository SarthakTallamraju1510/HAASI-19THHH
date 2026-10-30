/**
 * Photo lightbox — click any Polaroid to open it full size, then move through
 * the other photographs with the arrow buttons, the keyboard, or a swipe.
 */

import { el, prefersReducedMotion } from "./dom.js";

const icon = {
  close:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  prev:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 4l-8 8 8 8"/></svg>',
  next:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 4l8 8-8 8"/></svg>',
};

export function initLightbox(root = document) {
  const triggers = Array.from(root.querySelectorAll(".polaroid__button"));
  if (!triggers.length) return;

  const photos = triggers.map((button) => ({
    src: button.dataset.src || "",
    alt: button.dataset.alt || "",
    caption: button.dataset.caption || "",
  }));

  let index = 0;
  let lastFocused = null;
  let closeTimer = 0;

  const image = el("img", { class: "lightbox__img", alt: "", decoding: "async" });
  const caption = el("figcaption", { class: "lightbox__caption" });

  const closeButton = el("button", {
    class: "lightbox__close",
    type: "button",
    "aria-label": "Close the photograph",
    html: icon.close,
  });

  const prevButton = el("button", {
    class: "lightbox__arrow",
    type: "button",
    "aria-label": "Previous photograph",
    html: icon.prev,
  });

  const nextButton = el("button", {
    class: "lightbox__arrow",
    type: "button",
    "aria-label": "Next photograph",
    html: icon.next,
  });

  const counter = el("span", { class: "lightbox__count", "aria-live": "polite" });

  const bar = el(
    "div",
    { class: "lightbox__bar" },
    prevButton,
    counter,
    nextButton
  );

  if (photos.length < 2) bar.hidden = true;

  const dialog = el(
    "div",
    {
      class: "lightbox",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Photograph viewer",
      hidden: true,
    },
    el("div", { class: "lightbox__backdrop", "data-close": "true" }),
    el(
      "div",
      { class: "lightbox__panel" },
      closeButton,
      el("figure", { class: "lightbox__figure" }, el("div", { class: "lightbox__frame" }, image), caption),
      bar
    )
  );

  document.body.append(dialog);

  function show(next) {
    index = (next + photos.length) % photos.length;
    const photo = photos[index];
    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = photo.caption;
    caption.hidden = !photo.caption;
    counter.textContent = `${index + 1} / ${photos.length}`;
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (photos.length < 2) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === "Tab") {
      const focusables = [closeButton, prevButton, nextButton].filter(
        (node) => !node.hidden
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function open(next, opener) {
    lastFocused = opener || document.activeElement;
    show(next);
    dialog.hidden = false;
    dialog.classList.remove("is-open");
    document.body.classList.add("is-locked");
    document.addEventListener("keydown", onKeydown);
    requestAnimationFrame(() => dialog.classList.add("is-open"));
    closeButton.focus({ preventScroll: true });
  }

  function close() {
    window.clearTimeout(closeTimer);
    document.removeEventListener("keydown", onKeydown);
    document.body.classList.remove("is-locked");

    if (prefersReducedMotion()) {
      dialog.hidden = true;
    } else {
      dialog.classList.remove("is-open");
      closeTimer = window.setTimeout(() => {
        dialog.hidden = true;
      }, 320);
    }

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus({ preventScroll: true });
    }
  }

  triggers.forEach((button, i) => {
    button.addEventListener("click", () => open(i, button));
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => show(index - 1));
  nextButton.addEventListener("click", () => show(index + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close) close();
  });

  // Swipe between photographs on touch screens.
  let startX = null;
  let startY = null;

  dialog.addEventListener(
    "pointerdown",
    (event) => {
      startX = event.clientX;
      startY = event.clientY;
    },
    { passive: true }
  );

  dialog.addEventListener(
    "pointerup",
    (event) => {
      if (startX === null || photos.length < 2) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) < 45 || Math.abs(dy) > Math.abs(dx)) return;
      show(dx < 0 ? index + 1 : index - 1);
    },
    { passive: true }
  );
}
