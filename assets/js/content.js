/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HAASINI'S BIRTHDAY SCRAPBOOK — ALL CONTENT LIVES IN THIS ONE FILE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Everything inside [square brackets] is a placeholder. Replace it with the
 *  real thing. Anything not in brackets is design copy and can stay as it is.
 *
 *  Photos:  drop the file in assets/images/… and update `src`.
 *  Videos:  drop the file in D:/Haasini Birthday/VIDEOS, named after whoever
 *           sent it, then run `node scripts/import-videos.mjs` and paste the
 *           block it prints into `videos.items`.
 *
 *  Friend photos:
 *    One photo per friend is the "main" one — the big Polaroid beside their note.
 *    Mark it with `featured: true`. Every other photo in the list fills the
 *    scrapbook collage underneath, in the order you write them.
 *
 *  Adding a friend:
 *    1. Copy one of the objects in `friends.people` below.
 *    2. Give it a new `id` (lowercase, no spaces — e.g. "friend-4").
 *    3. Fill in `name`, `message` and `photos`.
 *    4. The page builds itself. Nothing else to touch.
 *
 *  Optional fields can be removed or set to null — the layout closes up
 *  gracefully around whatever is missing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const content = {
  person: "Haasini",

  hero: {
    eyebrow: "A little something made just for you",
    // The heading is two lines: the first line, then her name in large type.
    titleLine: "Happy Birthday,",
    name: "Haasini",
    supporting:
      "There are a lot of people who love you and you have had so many cool moments together. Let's take a look at some of them dawg.",
    ctaLabel: "Open your little world",
    note: "Made with love, just for you.",
  },

  // The background music. It has to sit under her reading and under the videos,
  // so this is a quiet acoustic instrumental played low. Browsers block autoplay,
  // so she taps play on the card herself.
  //
  // Want Lovers Rock instead? Put your own copy at assets/audio/lovers-rock.mp3 and
  // point `src` at it. Add `art:` with any square cover image and the card shows it.
  song: {
    label: "playing quietly",
    title: "Breezy May (Acoustic)",
    artist: "Axletree",
    src: "assets/audio/quiet-guitar.m4a",
    volume: 0.3,
  },

  letter: {
    eyebrow: "A letter for you",
    heading: "To my favourite person",
    greeting: "My dearest Haasini,",
    // Add as many paragraphs as you like — each string becomes its own paragraph.
    paragraphs: [
      "HAPPY FUCKING BIRTHDAY!!!",
      "YOU'RE 19!!",
      "I wish I could be there so that you and I could get wasted, eat a bunch of wingstop and watch some sad ass movie but alas, videos, letters and websites are all we have for a bit.",
      "I want you to know you are loved Haasini. Not just by me but by a shit tonne of people who know how much their life needed a bit of Haasini in it (I still get the most k?).",
      "We've known each other a bit more than a year now and even if you asked me 6 months ago, I still wouldn't be able to believe my life without you. You've had such a positive impact on my life that I can't even put it into words.",
      "A Sarthak without his Haasini would be a sad one (although still devilishly handsome and charming ofc;)). You've made me a more confident, empathetic and most importantly happier person.",
      "I know you don't like to make a big deal out of your birthday, but I want to celebrate it, not because I'm your boyfriend but because I've had the pleasure of being able to say that “I know Haasi”. So have a lot of people and you better be damn sure about it.",
      "Long distance has been hard but I think any distance from you sucks. So until we meet again, Love you loads and happy birthday once again.",
      "Your best friend and rightful property,",
    ],
    signOff: "— S",
  },

  // The video messages, all together right after the letter. Each file in the
  // source folder is named after whoever sent it, so adding one is: drop it in
  // D:/Haasini Birthday/VIDEOS, run `node scripts/import-videos.mjs`, then paste
  // the block it prints into `items` below.
  videos: {
    eyebrow: "press play",
    heading: "Everyone wanted to say it themselves",
    items: [
      {
        name: "Aaruni",
        src: "assets/videos/aaruni.mp4",
        poster: "assets/images/decor/video-posters/aaruni.jpg",
        width: 960,
        height: 540,
      },
      {
        name: "Aditya",
        src: "assets/videos/aditya.mp4",
        poster: "assets/images/decor/video-posters/aditya.jpg",
        width: 960,
        height: 540,
      },
      {
        name: "Aryaan",
        src: "assets/videos/aryaan.mp4",
        poster: "assets/images/decor/video-posters/aryaan.jpg",
        width: 720,
        height: 480,
      },
      {
        name: "Chann",
        src: "assets/videos/chann.mp4",
        poster: "assets/images/decor/video-posters/chann.jpg",
        width: 540,
        height: 960,
      },
      {
        name: "Daksh",
        src: "assets/videos/daksh.mp4",
        poster: "assets/images/decor/video-posters/daksh.jpg",
        width: 540,
        height: 960,
      },
      {
        name: "Dhruv",
        src: "assets/videos/dhruv.mp4",
        poster: "assets/images/decor/video-posters/dhruv.jpg",
        width: 540,
        height: 960,
      },
      {
        name: "Hiya",
        src: "assets/videos/hiya.mp4",
        poster: "assets/images/decor/video-posters/hiya.jpg",
        width: 960,
        height: 540,
      },
      {
        // Ishaan and Naman sent theirs in three pieces; the three were stitched
        // in order into one file (see README) and share one card.
        name: "Ishaan and Naman",
        src: "assets/videos/ishaan-naman.mp4",
        poster: "assets/images/decor/video-posters/ishaan-naman.jpg",
        width: 848,
        height: 478,
      },
      {
        name: "Kartik",
        src: "assets/videos/kartik.mp4",
        poster: "assets/images/decor/video-posters/kartik.jpg",
        width: 478,
        height: 854,
      },
      {
        name: "Mahi",
        src: "assets/videos/mahi.mp4",
        poster: "assets/images/decor/video-posters/mahi.jpg",
        width: 540,
        height: 960,
      },
      {
        name: "Navya",
        src: "assets/videos/navya.mp4",
        poster: "assets/images/decor/video-posters/navya.jpg",
        width: 832,
        height: 464,
      },
      {
        name: "Raghav",
        src: "assets/videos/raghav.mp4",
        poster: "assets/images/decor/video-posters/raghav.jpg",
        width: 540,
        height: 960,
      },
      {
        name: "Saan",
        src: "assets/videos/saan.mp4",
        poster: "assets/images/decor/video-posters/saan.jpg",
        width: 540,
        height: 960,
      },
      {
        name: "Shriyans",
        src: "assets/videos/shriyans.mp4",
        poster: "assets/images/decor/video-posters/shriyans.jpg",
        width: 464,
        height: 848,
      },
      {
        name: "Vanshika",
        src: "assets/videos/vanshika.mp4",
        poster: "assets/images/decor/video-posters/vanshika.jpg",
        width: 960,
        height: 540,
      },
    ],
  },

  gallery: {
    heading: "A couple cool moments",
    supporting: "A few little snapshots of all the love surrounding you.",
    // Your own photographs. Same shape as the friend photos below.
    photos: [
      {
        src: "assets/images/gallery/photo-1.jpg",
        alt: "A crowd of friends crammed into one wide frame, someone in a red tee pulling a face in the middle",
        rotation: -2,
        width: 1280,
        height: 590,
      },
      {
        src: "assets/images/gallery/photo-2.jpg",
        alt: "Friends bunched together under a white canopy at an outdoor market at night",
        rotation: 2.5,
        width: 1280,
        height: 960,
      },
      {
        src: "assets/images/gallery/photo-3.jpg",
        alt: "Someone curled up asleep in a hoodie on an office chair, feet propped on the desk",
        rotation: -1.5,
        width: 960,
        height: 1280,
      },
      {
        src: "assets/images/gallery/photo-4.jpg",
        alt: "A long table of friends mid-meal, caught in a mirror with one arm stretched up to take the picture",
        rotation: 1.5,
        width: 1280,
        height: 960,
      },
      {
        src: "assets/images/gallery/photo-5.jpg",
        alt: "A group of friends photographed in the round convex traffic mirror on a night street",
        rotation: -3,
        width: 960,
        height: 1280,
      },
      {
        src: "assets/images/gallery/photo-6.jpg",
        alt: "Someone leaning over a mini pool table with a cue, mid-shot",
        rotation: 2,
        width: 960,
        height: 1280,
      },
      {
        src: "assets/images/gallery/photo-7.jpg",
        alt: "A train carriage full of friends, one arm stretched up to the handrail",
        rotation: -1,
        width: 1280,
        height: 960,
      },
      {
        src: "assets/images/gallery/photo-8.jpg",
        alt: "Four friends standing on a city street at night in front of tall pale pillars",
        rotation: 3,
        width: 960,
        height: 1280,
      },
    ],
  },

  // The wall of photos and written notes. It follows the videos directly, so it
  // has no eyebrow or intro line — just the heading.
  friends: {
    heading: "A few cool memories and some notes too",
    people: [
      {
        id: "chann",
        name: "Chann",
        // No message from Chann — leave this null and her photos are just photos
        // in the wall, with her name written on the first one.
        message: null,
        photos: [
          {
            src: "assets/images/friends/chann/01.jpg",
            alt: "Two friends standing hand in hand, both with a hand raised to their forehead, lit warmly",
            rotation: -3.5,
            width: 720,
            height: 480,
          },
          {
            src: "assets/images/friends/chann/02.jpg",
            alt: "Seen from above, two friends curled up hugging on the floor",
            rotation: 2,
            width: 1200,
            height: 1600,
          },
          {
            src: "assets/images/friends/chann/03.jpg",
            alt: "One friend laughing with her eyes closed while the other leans in close beside her",
            rotation: -2,
            width: 1170,
            height: 1756,
            featured: true,
          },
          {
            src: "assets/images/friends/chann/04-cropped.jpg",
            alt: "Two friends at a cafe table, one looking across at the other in soft lamplight",
            rotation: 2.5,
            width: 738,
            height: 494,
          },
          {
            src: "assets/images/friends/chann/05.jpg",
            alt: "A photo booth screen on a wall showing the two of them taking a selfie in purple light",
            rotation: -1.5,
            width: 1170,
            height: 1560,
          },
        ],
      },
      {
        id: "riya",
        name: "Riya",
        // No message from Riya — leave this null and her name is written on one
        // of her photos instead.
        message: null,
        photos: [
          {
            src: "assets/images/friends/riya/01.jpg",
            alt: "Three friends in a pink photo booth, one wearing a police cap and pulling a face",
            rotation: 2,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/riya/02-cropped.jpg",
            alt: "Two friends sitting side by side in the back seat of a car, both in glasses",
            rotation: -3,
            width: 591,
            height: 445,
          },
          {
            src: "assets/images/friends/riya/03.jpg",
            alt: "Four friends outdoors at Holi, faces smeared with coloured powder",
            rotation: -1.5,
            width: 1280,
            height: 960,
            featured: true,
          },
        ],
      },
      {
        id: "vanshika",
        name: "Vanshika",
        // Her words, exactly as she wrote them. Each line is its own paragraph.
        message: [
          "happy happy birthday my day1",
          "I HOPE UK u mean so much more to me than my dumass can express",
          "miss u pls come already bahut ho gaya I promise i’ll keep my mother away from u",
          "i love you smsmsmsmsmsm",
        ].join("\n\n"),
        photos: [
          {
            src: "assets/images/friends/vanshika/01.jpg",
            alt: "Mirror selfie of two friends in dark dresses against a stone wall",
            rotation: 2.5,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/02.jpg",
            alt: "Three friends pressed cheek to cheek, pulling faces at the camera",
            rotation: -2,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/03.jpg",
            alt: "Two friends sitting at a restaurant table under bamboo blinds",
            rotation: 1.5,
            width: 1180,
            height: 1572,
          },
          {
            src: "assets/images/friends/vanshika/04.jpg",
            alt: "A friend mid-shop, holding up a basket in a bright store",
            rotation: -3,
            width: 1180,
            height: 1572,
          },
          {
            src: "assets/images/friends/vanshika/05.jpg",
            alt: "Bathroom selfie, one friend pointing at another lying on the floor laughing",
            rotation: 2,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/06.jpg",
            alt: "Kitchen selfie, one in a striped tee while the other throws a peace sign",
            rotation: -2.5,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/07.jpg",
            alt: "Two friends tucked under blankets on a bed beside a bright window",
            rotation: 3,
            width: 1180,
            height: 1572,
          },
          {
            src: "assets/images/friends/vanshika/08.jpg",
            alt: "Full-length mirror selfie in a dark dress, taken in a quiet corridor",
            rotation: -1.5,
            width: 1179,
            height: 1179,
          },
          {
            src: "assets/images/friends/vanshika/09.jpg",
            alt: "Two friends outdoors in the evening, one in a white knit sweater",
            rotation: 1.5,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/10.jpg",
            alt: "A friend wrapped up in a bright pink blanket, held by the other",
            rotation: -2,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/11.jpg",
            alt: "An upside-down selfie of two friends in a shop aisle",
            rotation: 2.5,
            width: 1179,
            height: 884,
          },
          {
            src: "assets/images/friends/vanshika/12.jpg",
            alt: "Three friends smiling close together, warm and lit low",
            rotation: -1,
            width: 1180,
            height: 1228,
            featured: true,
          },
        ],
      },
      {
        id: "aaruni",
        name: "Aaruni",
        message:
          "HAPPIEST BIRTHDAYYY GORGEOUSSS!! I love you sooo muchhh. Bali was genuinely so so lit, and our Marquee nights are always a different kind of crazy. I’m so glad we’ve gotten this close and I can’t wait for all the trips, nights out and questionable decisions ahead of us. You’re genuinely such a gem and I hope this year brings you all the happiness and love you deserve. LOVE YOU LOADSSS!!",
        photos: [
          {
            src: "assets/images/friends/aaruni/01.jpg",
            alt: "Two friends cheek to cheek, the one in glasses leaning her head on the other's shoulder",
            rotation: -2.5,
            width: 960,
            height: 1280,
            featured: true,
          },
          {
            src: "assets/images/friends/aaruni/02.jpg",
            alt: "Two friends posing together in a fitting-room mirror",
            rotation: 2,
            width: 960,
            height: 1280,
          },
          {
            src: "assets/images/friends/aaruni/03.jpg",
            alt: "By a bright window overlooking a pool, one friend tipping a bottle to the other's mouth",
            rotation: -1.5,
            width: 959,
            height: 1280,
          },
          {
            src: "assets/images/friends/aaruni/04.jpg",
            alt: "Two friends in long dresses standing by a lit pool at night, framed by leaves",
            rotation: 2.5,
            width: 1205,
            height: 1203,
          },
          {
            src: "assets/images/friends/aaruni/05.jpg",
            alt: "A selfie caught in an ornate framed mirror on a dark wall",
            rotation: 3,
            width: 960,
            height: 1280,
          },
          {
            src: "assets/images/friends/aaruni/06.jpg",
            alt: "A bathroom mirror selfie, one friend in a pleated dress with the other leaning in",
            rotation: -2,
            width: 960,
            height: 1280,
          },
          {
            src: "assets/images/friends/aaruni/07.jpg",
            alt: "Two friends in swimwear at a night party, washed in blue light",
            rotation: 1.5,
            width: 960,
            height: 1280,
          },
          {
            src: "assets/images/friends/aaruni/08.jpg",
            alt: "Someone in a white dress standing in a warm-lit corridor hung with framed photographs",
            rotation: -3,
            width: 960,
            height: 1280,
          },
        ],
        // No video from her yet — add one and the card appears.
      },
      {
        id: "mahi",
        name: "Mahi",
        message: [
          "HAPPY BIRTHDAYY HAASINII !!! 💕",
          "I hope you have an amazing day and year ahead!! your such a wonderful person and you seriously light up the room. I love having you around, genuinely such a vibe hehe lovedd watching bridgerton S4 w u and the malaysia trip was so fun like seriously wudnt have been the same without u 🤩 ty for givin ringu sm love 🥺 (unlike somone, cough cough aaruni) n I had so muchh fun w u at marquee MUAHH ur such a girls girl and i feel like i can always talk to u bout anything and ur so easy to be around like cant believe we never talked in giis but issok ur stuck w me in uni now 😛 alsooo ur voice oh my lordddddskdahjsdkjs whnever i hear you sing its like an angel came down to bless me 🙏🙏 Anywayss keep doing youu queen and jst know ive got ur back no matter what!! LOVE YOU MUAH",
        ].join("\n\n"),
        photos: [
          {
            src: "assets/images/friends/mahi/01.jpg",
            alt: "Two friends standing in an empty car park, one in a pink top and dark flares",
            rotation: 2.5,
            width: 888,
            height: 1157,
          },
          {
            src: "assets/images/friends/mahi/02.jpg",
            alt: "A mirror selfie in a sports shop, three friends lined up between the shoe racks",
            rotation: -2,
            width: 720,
            height: 1280,
          },
          {
            src: "assets/images/friends/mahi/03.jpg",
            alt: "Four friends together in a bright bathroom mirror, one holding the phone up",
            rotation: 1.5,
            width: 960,
            height: 1280,
          },
          {
            src: "assets/images/friends/mahi/04.jpg",
            alt: "Two friends in white dresses at night, one wearing bunny ears and carrying a basket",
            rotation: -2.5,
            width: 853,
            height: 1280,
            featured: true,
          },
          {
            src: "assets/images/friends/mahi/05.jpg",
            alt: "Four friends sitting together on a bus, a bunch of pink flowers on a lap",
            rotation: 3,
            width: 1280,
            height: 960,
          },
        ],
      },
      {
        id: "navya",
        name: "Navya",
        message:
          "Happy birthday girlieeee!!!🥳🥳🥳 I am so glad I picked u off the streets day 1 of uni (ykwim) cause life has never been better with u in it. I am so proud of u with all of ur thousand UROPS and projects I know ur always gonna succeed in 💪💪💪. I am so grateful for all the music room memories and random ass 2am doomscrolling sessions and of course the best person to hit the clubs or gym or study room with (basically at this point anything)😭😭😭😭. I am so proud of u bagging that internship I know how hard u have worked and I know you will 100% get what u want and will lock tf in❤️❤️❤️. I can’t wait to see u and hear about the crazy ah side quests. I love u smmm 🫶🫶🫶Happy birthday hassi (yk I had to) :)",
        photos: [
          {
            src: "assets/images/friends/navya/01.jpg",
            alt: "A selfie across a table, two friends both in maroon",
            rotation: -2,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/navya/02.jpg",
            alt: "Three friends holding up papers outside a campus block, a small inset photo of two of them in the corner",
            rotation: 2.5,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/navya/03.jpg",
            alt: "A dark selfie in a lounge, two friends tucked close, one in glasses",
            rotation: -1.5,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/navya/04.jpg",
            alt: "A train selfie with four friends, one in sunglasses and a maroon top",
            rotation: 1.5,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/navya/05.jpg",
            alt: "Four friends posing together under warm lights outside a mall",
            rotation: -2.5,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/navya/06.jpg",
            alt: "Six friends squeezed into a mirrored lift for a group selfie",
            rotation: 2,
            width: 960,
            height: 1280,
            featured: true,
          },
        ],
      },
      {
        id: "daksh",
        name: "Daksh",
        message:
          "Happy Birthday Haasini!! 🥳🎉 I hope you have an amazing year ahead!! So much has happened this year, and honestly, every moment has been extremely fun and special. Anyways, happy 19th!! :>",
        photos: [
          {
            src: "assets/images/friends/daksh/01.jpg",
            alt: "A selfie in a study room, one friend pulling a face in front while another sits at the desks behind",
            rotation: -2,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/daksh/02.jpg",
            alt: "Two friends smiling at a table in a mall, one of them holding up a small box",
            rotation: 2.5,
            width: 1280,
            height: 960,
            featured: true,
          },
          {
            src: "assets/images/friends/daksh/03.jpg",
            alt: "Two friends in maroon university shirts standing beside a vending machine",
            rotation: -1.5,
            width: 960,
            height: 1280,
          },
        ],
      },
      {
        id: "saan",
        name: "Saan",
        // No message from Saan — her photos lead the page.
        message: null,
        photos: [
          {
            src: "assets/images/friends/saan/01.jpg",
            alt: "Three friends together in a sunlit campus corridor, one holding up a phone with a little plush charm dangling from it",
            rotation: 2,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/saan/02.jpg",
            alt: "Two friends kissing a third on either cheek, all three laughing",
            rotation: -2.5,
            width: 1280,
            height: 960,
            featured: true,
          },
          {
            src: "assets/images/friends/saan/03.jpg",
            alt: "Two friends side by side on a mall sofa, sharing a drink",
            rotation: 1.5,
            width: 960,
            height: 1280,
          },
          {
            src: "assets/images/friends/saan/04.jpg",
            alt: "Two friends in a mirror lit by a bright neon frame",
            rotation: -3,
            width: 960,
            height: 1280,
          },
        ],
      },
      {
        id: "hiya",
        name: "Hiya",
        message: null,
        photos: [
          {
            src: "assets/images/friends/hiya/01.jpg",
            alt: "A train selfie, two friends close together in soft light",
            rotation: 2,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/hiya/02.jpg",
            alt: "A mirror selfie under a red lantern in a dark restaurant, two friends in sleeveless tops",
            rotation: -2,
            width: 960,
            height: 1280,
            featured: true,
          },
          {
            src: "assets/images/friends/hiya/03.jpg",
            alt: "Two friends on a train pulling faces at the camera",
            rotation: 1.5,
            width: 1280,
            height: 960,
          },
        ],
      },
      {
        id: "ishaan",
        name: "Ishaan",
        // His words are set as the note on that one photo — see noteEntry() in
        // sections.js. Every message works the same way now.
        message: [
          "Happyyyy Birthdayyyy broooo!! 🥳❤️🎉",
          "Honestly, looking back at college, some of the best memories have to be all the random shit we did together",
          "bhai crazy randomly deciding to go to Malaysia and actually ending up there within hours of making the plan, to cycling around and all that bakwas",
          "You genuinely made college life so much more fun and maze aaye.........oh and btw yoichi pe birthday offer hai toh dont forget but im sure u didn't moti saali",
          "yoooo havve an absolutely amazing birthdayyyy and year ahead",
        ].join("\n\n"),
        photos: [
          {
            src: "assets/images/friends/ishaan/01.jpg",
            alt: "Three friends at a night market table, bright stalls and string lights behind them",
            rotation: -1.5,
            width: 1280,
            height: 960,
            featured: true,
          },
        ],
      },
      {
        id: "raghav",
        name: "Raghav",
        message: null,
        photos: [
          {
            src: "assets/images/friends/raghav/01.jpg",
            alt: "A metro selfie with three friends, one leaning into the frame from the left",
            rotation: 2,
            width: 1280,
            height: 960,
          },
          {
            src: "assets/images/friends/raghav/02.jpg",
            alt: "In a crowded party, a friend grinning at the camera with two others beside him",
            rotation: -2,
            width: 1280,
            height: 960,
            featured: true,
          },
        ],
      },
      {
        id: "dhruv",
        name: "Dhruv",
        message: null,
        photos: [
          {
            src: "assets/images/friends/dhruv/01.jpg",
            alt: "Three friends standing on a street at night in front of tall white pillars",
            rotation: 2,
            width: 960,
            height: 1280,
            featured: true,
          },
        ],
      },
    ],
  },

  closing: {
    heading: "Before you go ♡",
    supporting: "You are loved more than you know. ♡",
    message:
      "Hope you had fun looking at all these memories! You're gonna make a shit tonne more! Happy 19th cutie.",
    signOff: "Made with all my love, for Haasini. ♡",
    snowmanPrompt: "One last little thing...",
    hiddenMessage: "I now owe you a mcspicy lol see u when i do cutie",
  },

  footer: {
    note: "A little winter world, built by hand, for Haasini.",
    year: "2026",
    // The background track is Creative Commons, so it asks to be credited.
    credit: {
      text: "Music: “Breezy May (Acoustic)” by Axletree ·",
      label: "CC BY 4.0",
      href: "https://freemusicarchive.org/music/Axletree/Sunset_EP/Breezy_May_Acoustic",
    },
  },
};
