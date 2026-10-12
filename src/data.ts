export type Category = "Residential" | "Commercial" | "Interiors";
export type Project = {
  slug: string;
  name: string;
  category: Category;
  location: string;
  year: string;
  intro: string;
  approach: string;
  materials: string[];
  image: string;
  alt: string;
};
export const projects: Project[] = [
  {
    slug: "courtyard-house",
    name: "Courtyard House",
    category: "Residential",
    location: "Alentejo, Portugal",
    year: "2026",
    intro:
      "A home shaped around an open sky. A sheltered courtyard becomes the centre of daily life, connecting quiet rooms to the changing light.",
    approach:
      "A low, continuous limestone wall holds a sequence of intimate spaces. Deep reveals temper the summer sun, while an olive tree marks the threshold between shelter and landscape.",
    materials: [
      "Honed limestone",
      "Lime plaster",
      "Natural oak",
      "Clear glass",
    ],
    image: "/images/courtyard-house.webp",
    alt: "Fictional limestone courtyard house with an olive tree and deep shaded openings",
  },
  {
    slug: "tidal-house",
    name: "Tidal House",
    category: "Residential",
    location: "Comporta, Portugal",
    year: "2026",
    intro:
      "A coastal retreat that sits lightly above the dunes. Long views and protected thresholds give the house a measured relationship with the Atlantic.",
    approach:
      "Two offset volumes make room for sheltered terraces. The raised footprint preserves the imagined dune landscape, and recessed glazing brings daylight deep into the plan.",
    materials: ["Pale concrete", "Weathered oak", "Brushed aluminium", "Linen"],
    image: "/images/tidal-house.webp",
    alt: "Fictional pale concrete coastal house above dune grasses",
  },
  {
    slug: "stone-gallery",
    name: "Stone Gallery",
    category: "Commercial",
    location: "Marrakesh, Morocco",
    year: "2025",
    intro:
      "A place to pause before encountering art. A narrow entrance opens into a generous, sunlit courtyard, creating a gradual transition from city to gallery.",
    approach:
      "Solid stone surfaces establish a quiet background for changing exhibitions. Daylight is introduced through controlled openings, and the courtyard offers a moment of orientation between rooms.",
    materials: ["Sandstone", "Polished concrete", "Dark bronze", "Lime wash"],
    image: "/images/stone-gallery.webp",
    alt: "Fictional sandstone gallery framing a quiet courtyard",
  },
  {
    slug: "canopy-workplace",
    name: "Canopy Workplace",
    category: "Commercial",
    location: "Accra, Ghana",
    year: "2025",
    intro:
      "An alternative to the sealed office. Shaded edges, planted courts and open gathering spaces make room for a slower, more connected working day.",
    approach:
      "A rhythm of timber fins filters light along the perimeter. Shared spaces face a planted court, with smaller rooms arranged behind a generous shaded circulation route.",
    materials: ["Dark timber", "Local stone", "Clay plaster", "Recycled steel"],
    image: "/images/canopy-workplace.webp",
    alt: "Fictional timber workplace pavilion surrounded by tropical greenery",
  },
  {
    slug: "quiet-apartment",
    name: "Quiet Apartment",
    category: "Interiors",
    location: "Copenhagen, Denmark",
    year: "2026",
    intro:
      "A small interior with room to breathe. Carefully placed joinery and a restrained material palette bring warmth and clarity to everyday rituals.",
    approach:
      "A curved plaster wall softens the connection between living and sleeping spaces. Walnut storage reduces visual noise, while filtered daylight catches the grain of timber and stone.",
    materials: ["Walnut", "Travertine", "Linen", "Clay plaster"],
    image: "/images/quiet-apartment.webp",
    alt: "Fictional apartment with a curved plaster wall, walnut joinery and linen sofa",
  },
  {
    slug: "ritual-tea-room",
    name: "Ritual Tea Room",
    category: "Interiors",
    location: "Kyoto, Japan",
    year: "2025",
    intro:
      "An intimate space organised around the preparation of tea. Texture, low light and a simple counter turn a brief visit into an unhurried ritual.",
    approach:
      "A long stone counter anchors the room. Oak furniture and woven seats lend a tactile warmth, with recessed shelves holding the few objects needed for service.",
    materials: ["Clay plaster", "Solid oak", "Pale stone", "Woven fibre"],
    image: "/images/ritual-tea-room.webp",
    alt: "Fictional tea room with clay walls, oak tables and a pale stone counter",
  },
];
