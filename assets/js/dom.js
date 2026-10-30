/**
 * Tiny DOM helpers. There is no framework here on purpose: the whole site is
 * a handful of modules so it stays fast on a phone and easy to edit.
 */

/**
 * Create an element.
 *   el("p", { class: "note" }, "hello")
 * Special props: class, text, html, dataset, style (object), on* (functions).
 */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props || {})) {
    if (value === null || value === undefined || value === false) continue;

    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else if (key === "style" && typeof value === "object")
      Object.assign(node.style, value);
    else if (key.startsWith("on") && typeof value === "function")
      node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, value === true ? "" : String(value));
  }

  append(node, children);
  return node;
}

export function append(parent, children) {
  for (const child of children.flat(4)) {
    if (child === null || child === undefined || child === false) continue;
    parent.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return parent;
}

/** Inline SVG markup as a real element. */
export function svgSlot(markup, className = "") {
  const span = document.createElement("span");
  span.className = className;
  span.innerHTML = markup;
  span.setAttribute("aria-hidden", "true");
  return span;
}

/** Anything written as [ ... ] in content.js is treated as a placeholder. */
export function isPlaceholder(text) {
  return typeof text === "string" && /^\s*\[[\s\S]*\]\s*$/.test(text);
}

/** A quiet, unmissable label that marks copy you still need to write. */
export function placeholderNote(text) {
  return el("p", {
    class: "placeholder-note",
    text: text || "placeholder — replace this in assets/js/content.js",
  });
}

/** Split a message on blank lines so content.js can hold real paragraphs. */
export function paragraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Gentle fade-up as each block scrolls into view. */
export function initReveal(root = document) {
  const items = Array.from(root.querySelectorAll("[data-reveal]"));

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    // The very large top margin means anything that scrolls (or jumps) past
    // the viewport still counts as revealed — no section can be skipped and
    // left invisible.
    { rootMargin: "100000px 0px -6% 0px", threshold: 0.06 }
  );

  items.forEach((item) => observer.observe(item));
}
