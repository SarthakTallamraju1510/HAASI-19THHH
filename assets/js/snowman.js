/**
 * Little SVG building blocks: snowmen, hearts, snowflakes.
 * Everything is inline SVG — no image requests, crisp at any size.
 */

let uid = 0;

export function heartSvg(className = "") {
  return `<svg class="${className}" viewBox="0 0 24 22" aria-hidden="true" focusable="false"><path d="M12 21S1.5 14.5 1.5 7.8C1.5 4.2 4.3 1.5 7.7 1.5c2 0 3.4 1 4.3 2.4C12.9 2.5 14.3 1.5 16.3 1.5c3.4 0 6.2 2.7 6.2 6.3C22.5 14.5 12 21 12 21Z"/></svg>`;
}

export function snowflakeSvg(className = "") {
  const arm =
    'M12 2.4V21.6M12 6.6 9.5 4.1M12 6.6 14.5 4.1M12 17.4 9.5 19.9M12 17.4 14.5 19.9';
  let arms = "";
  for (let i = 0; i < 6; i += 1) {
    arms += `<g transform="rotate(${i * 60} 12 12)"><path d="${arm}"/></g>`;
  }
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" aria-hidden="true" focusable="false">${arms}</svg>`;
}

/**
 * A snowman in a burgundy scarf. Drawn on a 200×268 grid.
 *
 * @param {object} [options]
 * @param {boolean} [options.hat]     knitted hat
 * @param {boolean} [options.heart]   holding a little heart
 * @param {boolean} [options.wave]    gently waving arm
 * @param {string}  [options.className]
 */
export function snowmanSvg(options = {}) {
  const {
    hat = true,
    heart = true,
    wave = true,
    className = "snowman",
  } = options;

  const id = `snowman-${(uid += 1)}`;

  const hatParts = hat
    ? `<path d="M74 54C78 33 122 33 126 54Z" fill="#6D1F35"/>
       <path d="M71 51Q100 59 129 51L129 62Q100 70 71 62Z" fill="#873B50"/>
       <path d="M74 53Q100 60 126 53" fill="none" stroke="#4A1426" stroke-opacity=".28" stroke-width="1.4"/>
       <circle cx="100" cy="33" r="8.5" fill="#F2DDE1"/>`
    : "";

  const heartPart = heart
    ? `<path d="M0 4.2C0 1.7 1.9 0 4.1 0 5.8 0 7.1 1 8 2.6 8.9 1 10.2 0 11.9 0c2.2 0 4.1 1.7 4.1 4.2 0 4.5-6.1 7.8-8 10.2-1.9-2.4-8-5.7-8-10.2Z"
         transform="translate(161 82) scale(.92)" fill="#873B50"/>`
    : "";

  return `<svg class="${className}" viewBox="0 0 200 268" role="img" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="${id}" cx="36%" cy="26%" r="82%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="58%" stop-color="#fffdfa"/>
      <stop offset="100%" stop-color="#f0e3dd"/>
    </radialGradient>
  </defs>

  <ellipse cx="100" cy="252" rx="57" ry="8.5" fill="#6D1F35" opacity=".1"/>

  <g class="${wave ? "snowman__wave" : ""}">
    <path d="M66 133Q46 120 34 106" fill="none" stroke="#7c5849" stroke-width="4.4" stroke-linecap="round"/>
    <path d="M48 117 41 106M41 111l-9-1" fill="none" stroke="#7c5849" stroke-width="3.4" stroke-linecap="round"/>
  </g>
  <g>
    <path d="M134 133Q156 118 169 104" fill="none" stroke="#7c5849" stroke-width="4.4" stroke-linecap="round"/>
    <path d="M154 117 162 108M160 112l8-2" fill="none" stroke="#7c5849" stroke-width="3.4" stroke-linecap="round"/>
  </g>
  ${heartPart}

  <circle cx="100" cy="197" r="53" fill="url(#${id})" stroke="#e8d9d2" stroke-width="1"/>
  <circle cx="100" cy="132" r="37" fill="url(#${id})" stroke="#e8d9d2" stroke-width="1"/>
  <circle cx="100" cy="76" r="29" fill="url(#${id})" stroke="#e8d9d2" stroke-width="1"/>

  <circle cx="100" cy="176" r="3.4" fill="#6D1F35" opacity=".78"/>
  <circle cx="100" cy="194" r="3.4" fill="#6D1F35" opacity=".78"/>
  <circle cx="100" cy="212" r="3.4" fill="#6D1F35" opacity=".78"/>

  <path d="M72 100Q100 114 128 100L129 112Q100 126 71 112Z" fill="#6D1F35"/>
  <path d="M120 110q15 7 10 25l-11 3q6-15-6-23Z" fill="#4A1426"/>

  ${hatParts}

  <g class="snowman__blink">
    <circle cx="89" cy="72" r="3.1" fill="#33272A"/>
    <circle cx="111" cy="72" r="3.1" fill="#33272A"/>
  </g>
  <path d="M101 76 121 80.5 101 85Z" fill="#c9895a"/>
  <circle cx="85" cy="87" r="1.9" fill="#33272A" opacity=".72"/>
  <circle cx="93" cy="92" r="1.9" fill="#33272A" opacity=".72"/>
  <circle cx="107" cy="92" r="1.9" fill="#33272A" opacity=".72"/>
  <circle cx="115" cy="87" r="1.9" fill="#33272A" opacity=".72"/>

  <ellipse cx="100" cy="242" rx="34" ry="8" fill="#d8c8c1" opacity=".26"/>
</svg>`;
}

/** Short design-copy captions for the little snowman interludes. */
export const interludeCaptions = [
  "two little snowmen, keeping an eye on you",
  "still snowing, still celebrating you",
  "the snowmen wanted to say it too",
];
