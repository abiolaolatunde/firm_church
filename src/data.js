export const PILLARS = [
  { word: "Indoctrinate", text: "We root ourselves in sound truth, filling hearts and minds with the Word that shapes how we think, live and love." },
  { word: "Rejuvenate", text: "We are refreshed in spirit, soul and body — encountering God in worship and prayer that restores strength for the road ahead." },
  { word: "Ministry", text: "We are sent out to serve — carrying what we've received into our homes, churches and cities, from Ilorin to the ends of the earth." },
];

// Image crops copied from the Figma frames (position and size relative to each card).
export const LEADERS = [
  { name: "Abiola Olatunde", img: "abiola.png", crop: [-1.95, -25.97, 103.84, 171.1] },
  { name: "Salome Adeoti", img: "adeoti.png", crop: [-13.32, 2.79, 119.74, 143.55] },
  { name: "Goodnews Ekojah", img: "goodness.png", crop: [0.11, 2.79, 99.85, 154] },
  { name: "DreySongz", img: "dreysong.png", crop: [-0.14, 2.75, 100.03, 139.13] },
  { name: "Israel Bernard Paul", img: "israel.png", crop: [-11.26, 0.11, 111.29, 159.22] },
  { name: "The FIRM People", img: "people.png", crop: [-31.23, -13.07, 147.05, 125.81], alt: "Members of FIRM Church" },
];

const evening = [
  ["5:00 PM", "Call to Worship"], ["5:30 PM", "Worship"], ["6:00 PM", "Welcome to FIRM CAMP"],
  ["6:15 PM", "Worship"], ["6:40 PM", "Teaching: Pastor Abiola Olatunde"], ["7:50 PM", "Closing and Benediction"],
];

export const SCHEDULE = [
  { id: "thu", tab: "Thu, Dec 3", sessions: [{ kind: "Worship + Word", title: "Evening Session", time: "5:00 PM – 8:00 PM", start: "2026-12-03T17:00:00+01:00", end: "2026-12-03T20:00:00+01:00", day: "Day 1, Thu, Dec 3", items: evening }] },
  { id: "fri", tab: "Fri, Dec 4", sessions: [{ kind: "Worship + Word", title: "Evening Session", time: "5:00 PM – 8:00 PM", start: "2026-12-04T17:00:00+01:00", end: "2026-12-04T20:00:00+01:00", day: "Day 2, Fri, Dec 4", items: evening }] },
  { id: "sat", tab: "Sat, Dec 5", sessions: [
    { kind: "Worship + Word", title: "Morning Session", time: "9:00 AM – 12:00 PM", start: "2026-12-05T09:00:00+01:00", end: "2026-12-05T12:00:00+01:00", day: "Day 3, Sat, Dec 5", items: [
      ["9:00 AM", "Call to Worship"], ["9:15 AM", "Worship"], ["9:45 AM", "Prayer"], ["10:00 AM", "Worship"], ["10:40 AM", "Teaching: Pastor Abiola Olatunde"], ["12:00 PM", "Closing and Benediction"]] },
    { kind: "Worship + Word", title: "Afternoon Session", time: "12:15 PM – 3:00 PM", start: "2026-12-05T12:15:00+01:00", end: "2026-12-05T15:00:00+01:00", day: "Day 3, Sat, Dec 5", items: [
      ["12:15 PM", "Call to Worship"], ["12:30 PM", "Worship"], ["12:45 PM", "Prayer"], ["1:00 PM", "Worship"], ["1:40 PM", "Teaching: Pastor Abiola Olatunde"], ["3:00 PM", "Closing and Benediction"]] },
  ] },
  { id: "sun", tab: "Sun, Dec 6", sessions: [{ kind: "Worship + Word + Thanksgiving", title: "Grand Finale", time: "9:00 AM – 12:00 PM", start: "2026-12-06T09:00:00+01:00", end: "2026-12-06T12:00:00+01:00", day: "Day 4, Sun, Dec 6", items: [
    ["9:00 AM", "Call to Worship"], ["9:15 AM", "Worship"], ["9:30 AM", "Teaching: Pastor Abiola Olatunde"], ["10:45 AM", "Camp Thanksgiving"], ["11:00 AM", "Closing & Benediction"], ["11:15 AM", "After Party + Refreshments"]] }] },
];

// Gallery columns: [file, crop, tall?, alt]
// Placeholder photos: swap in the real gallery images and their Figma crops.
const FILL = [0, 0, 100, 100];
export const MOMENTS = [
  [["Group-1.png", FILL], ["Group-2.png", FILL], ["Group-3.png", FILL, true]],
  [["Group-4.png", FILL, true], ["Group-1.png", FILL]],
  [["Group-2.png", FILL], ["Group-3.png", FILL, true]],
  [["Group-4.png", FILL, false, "Friends laughing at the after party"], ["Group-1.png", FILL, false, "Friends embracing"], ["Group-2.png", FILL, true, "Two people embracing in prayer"]],
];

export const FAQ_TOPICS = [
  { id: "about", label: "About FIRM CAMP" },
  { id: "attending", label: "Attending" },
  { id: "involved", label: "Get involved" },
];

// Answers: strings are paragraphs; arrays are bullet lists ([label, text] for bold labels).
export const FAQS = [
  { topic: "about", q: "What’s a gospel movement?", a: ["A gospel movement is what happens when the good news of Jesus takes hold of people and spreads through them. It is not a programme or an event. It is people renewed by the gospel, gathered as one Church, and sent to carry that renewal into their homes, workplaces and city. That is the vision behind FIRM Church Global: everyone, everywhere, becoming one with God. FIRM CAMP is where we gather each year to celebrate what God is doing, catalyse fresh faith and obedience, and commission one another to keep the movement going from Ilorin to the ends of the earth."] },
  { topic: "about", q: "What’s the theme for FIRM CAMP 2026?", a: [
    "A Joy Culture: “May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit. I myself am convinced, my brothers and sisters, that you yourselves are full of goodness, filled with knowledge and competent to instruct one another.” (Romans 15:13–14)",
    "Authentic, overflowing joy is not a human effort—it is the direct work of the Holy Spirit filling us as we trust in the God of hope. Over four days, we intentionally make room for Him through the Word, worship, and prayer. We trust Him to fill us to overflowing, grounding us in The Joy Culture, and equipping us with goodness, sound knowledge, and mutual strength to carry this transformative culture into our homes, churches, workplaces, and cities."] },
  { topic: "about", q: "What makes FIRM CAMP different from other conferences?", a: [
    "FIRM CAMP exists to champion a gospel movement, not just host an event. Our focus is on:",
    [["Christ-Centered", "Jesus is the source and goal of all renewal"], ["Gospel-Driven", "Renewal flows from the good news of what Christ has done"], ["Spirit-Led", "We follow the Spirit’s leading in experiencing renewal"], ["Oneness is Our Pursuit", "We gather as one Church experiencing one renewal"], ["Kingdom-Minded", "We’re equipped for renewal that transforms every sphere"]]] },
  { topic: "attending", q: "Who should attend FIRM CAMP?", a: [
    "This is for everyone, everywhere. If you hunger for renewal, this is for you. If you believe God has more, this is for you.",
    ["Church leaders and business leaders", "Parents and students", "Believers and questioners", "Every generation, every background"],
    "Every tribe, tongue, and nation represented, from Ilorin to the ends of the earth. All becoming one in Christ."] },
  // { topic: "attending", q: "Who is the main speaker?", a: ["Abiola Olatunde: Pastor of Vision, Teaching & Discipleship at FIRM Church Global."] },
  // { topic: "attending", q: "What should I expect at FIRM CAMP?", a: [[
  //   ["Worship", "Spirit-led encounters with the God who makes all things new"], ["Teaching", "Gospel-centered messages on the Spirit’s renewing work in every sphere"], ["Prayer", "A dedicated prayer stretch to seek God together for our hearts, our minds, and our city"], ["Community", "Connections that model the renewed relationships God desires"], ["Commissioning", "Intentional sending moments with prayer and prophetic blessing"]]] },
  // { topic: "about", q: "What can I expect God to do at FIRM CAMP?", a: [[
  //   "Fresh encounters with the God who makes all things new", "Renewed vision for what God wants to do in and through us", "Healing in relationships and restoration in families", "Clarity on personal calling and kingdom purpose", "Networks formed for kingdom impact", "A movement of renewal that transforms our city and beyond"]] },
  // { topic: "involved", q: "Why should I join this movement?", a: ["This is more than a moment. It’s a movement of renewal. God is looking for people who will say yes to His renewing work in their generation. Jesus is still praying His prayer from John 17: “That they may all be one.” We want to be the generation that sees it answered."] },
];
