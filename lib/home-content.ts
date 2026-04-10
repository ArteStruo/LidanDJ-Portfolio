export type HomeEvent = {
  date: string;
  year: string;
  venue: string;
  location: string;
  tag: string;
  button: string;
  highlight: boolean;
};

export const homeHeroTags: string[] = [
  "Progressive House",
  "Electronic Music",
  "DJ Sri Lanka",
  "Underground Sets",
];

export const homeEvents: HomeEvent[] = [
  {
    date: "FEB 14",
    year: "2026",
    venue: "Kulture Warehouse",
    location: "Colombo, Sri Lanka",
    tag: "Face-to-Face Battle",
    button: "Bravado vs Lidan F2F",
    highlight: true,
  },
  {
    date: "MAR 02",
    year: "2026",
    venue: "Deep Horizon Club",
    location: "Galle, Sri Lanka",
    tag: "Progressive Night",
    button: "Tickets Available",
    highlight: false,
  },
  {
    date: "MAR 15",
    year: "2026",
    venue: "Underground Marathon — 12 Hour Set",
    location: "Colombo, Sri Lanka",
    tag: "Marathon · 12hrs",
    button: "RSVP Only",
    highlight: false,
  },
  {
    date: "APR 05",
    year: "2026",
    venue: "Sunset Sessions",
    location: "Mirissa, Sri Lanka",
    tag: "Electronic / Outdoor",
    button: "Tickets Available",
    highlight: false,
  },
];
