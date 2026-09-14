// General travel-health reference data (not personalized medical advice).
// Based on widely published CDC/WHO-style travel guidance. Confirm specifics
// with a doctor or travel clinic, since real recommendations depend on your
// health history, itinerary, and season.
//
// `doses` lists each shot needed before this trip, as weeks-before-travel it
// should ideally happen. Some vaccines (like Hepatitis A) have a second dose
// for long-term immunity that isn't needed for a single upcoming trip, so
// it's intentionally left out here and mentioned in the description instead.

export const vaccineInfo = {
  routine: {
    name: "Routine vaccines up to date",
    cause:
      "Not a single disease — this just means your regular childhood/adult vaccines (MMR, Tdap, varicella, flu, COVID) are current.",
    description:
      "CDC recommends every traveler be up to date on routine vaccines regardless of destination, since diseases like measles are more common in many countries than in the US.",
    doses: [{ weeksBeforeTravel: 4 }],
  },
  hepatitis_a: {
    name: "Hepatitis A",
    cause: "A virus spread through contaminated food and water.",
    description:
      "Causes liver inflammation, fatigue, nausea, and jaundice. One dose protects for this trip; a second dose 6-12 months later gives long-term immunity for future travel.",
    doses: [{ weeksBeforeTravel: 4 }],
  },
  hepatitis_b: {
    name: "Hepatitis B",
    cause: "A virus spread through blood and other bodily fluids.",
    description:
      "Causes liver inflammation; can become chronic and lead to serious liver disease. Recommended for longer stays, medical work, or anyone who might have sexual contact, get tattoos/piercings, or need medical care abroad. Normally a 3-dose series — an accelerated schedule exists if you're short on time, so check with a clinic.",
    doses: [
      { weeksBeforeTravel: 24 },
      { weeksBeforeTravel: 20 },
      { weeksBeforeTravel: 2 },
    ],
  },
  typhoid: {
    name: "Typhoid",
    cause: "A bacteria (Salmonella Typhi) spread through contaminated food and water.",
    description:
      "Causes sustained high fever, weakness, and stomach pain. More of a risk with street food, rural travel, or longer trips.",
    doses: [{ weeksBeforeTravel: 2 }],
  },
  yellow_fever: {
    name: "Yellow Fever",
    cause: "A virus spread by mosquitoes.",
    description:
      "Can cause fever, jaundice, and in severe cases organ failure. Some countries legally require proof of vaccination (a \"yellow card\") for entry, especially if arriving from another at-risk country — worth double-checking current entry requirements before you go.",
    doses: [{ weeksBeforeTravel: 2 }],
  },
  japanese_encephalitis: {
    name: "Japanese Encephalitis",
    cause: "A virus spread by mosquitoes, mainly in rural agricultural areas.",
    description:
      "Rare in travelers but can cause serious brain swelling. Mainly recommended for longer stays (a month or more) or extensive rural/outdoor time in endemic areas. Usually a 2-dose series about 28 days apart.",
    doses: [{ weeksBeforeTravel: 6 }, { weeksBeforeTravel: 2 }],
  },
  rabies: {
    name: "Rabies",
    cause: "A virus spread through bites or scratches from infected animals.",
    description:
      "Nearly always fatal once symptoms start, but preventable. Recommended if you'll be hiking, camping, working with animals, or somewhere far from reliable medical care. Pre-exposure protection is usually 2-3 doses over about a month.",
    doses: [
      { weeksBeforeTravel: 4 },
      { weeksBeforeTravel: 3 },
      { weeksBeforeTravel: 1 },
    ],
  },
  meningococcal: {
    name: "Meningococcal",
    cause: "A bacteria spread through close contact and respiratory droplets.",
    description:
      "Can cause meningitis or a serious bloodstream infection. Recommended for travel to parts of sub-Saharan Africa's \"meningitis belt\" (especially dry season), for the Hajj/Umrah pilgrimage, or during local outbreaks.",
    doses: [{ weeksBeforeTravel: 2 }],
  },
  tick_borne_encephalitis: {
    name: "Tick-borne Encephalitis",
    cause: "A virus spread by tick bites, mainly in forested areas of Central/Eastern Europe and parts of Asia.",
    description:
      "Can cause brain or spinal cord inflammation. Mainly relevant if you'll be hiking, camping, or spending real time outdoors in forested/rural areas during tick season (spring through fall).",
    doses: [{ weeksBeforeTravel: 5 }, { weeksBeforeTravel: 2 }],
  },
};

// Some countries get typed differently than their catalog key below —
// redirect the common alternates to the canonical entry.
const countryAliases = {
  uk: "united kingdom",
  "great britain": "united kingdom",
  england: "united kingdom",
  czechia: "czech republic",
  burma: "myanmar",
  holland: "netherlands",
};

// Keyed by lowercase, trimmed country name as entered on a trip.
// "level" is one of: "required", "recommended", "conditional" (depends on
// your specific itinerary/activities).
export const countryVaccineRecommendations = {
  // Already-visited / original set
  india: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  mexico: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  guatemala: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "conditional" },
  ],
  australia: [{ vaccine: "routine", level: "recommended" }],

  // Central America
  belize: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  "costa rica": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  "el salvador": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  honduras: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "conditional" },
  ],
  nicaragua: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  panama: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "conditional" },
  ],

  // South America
  argentina: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  bolivia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  brazil: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  chile: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  colombia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  ecuador: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  paraguay: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
  ],
  peru: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  uruguay: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  venezuela: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  guyana: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
  ],
  suriname: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
  ],

  // Africa (major tourist destinations)
  "south africa": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  morocco: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  egypt: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  kenya: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "meningococcal", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  tanzania: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "meningococcal", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  namibia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  botswana: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  zimbabwe: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  rwanda: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "recommended" },
    { vaccine: "rabies", level: "conditional" },
  ],
  ghana: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "required" },
    { vaccine: "meningococcal", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  senegal: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "yellow_fever", level: "required" },
    { vaccine: "meningococcal", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  tunisia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],

  // Western Europe (generally low-risk)
  france: [{ vaccine: "routine", level: "recommended" }],
  italy: [{ vaccine: "routine", level: "recommended" }],
  spain: [{ vaccine: "routine", level: "recommended" }],
  germany: [{ vaccine: "routine", level: "recommended" }],
  "united kingdom": [{ vaccine: "routine", level: "recommended" }],
  portugal: [{ vaccine: "routine", level: "recommended" }],
  netherlands: [{ vaccine: "routine", level: "recommended" }],
  greece: [{ vaccine: "routine", level: "recommended" }],
  switzerland: [{ vaccine: "routine", level: "recommended" }],
  ireland: [{ vaccine: "routine", level: "recommended" }],
  austria: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  belgium: [{ vaccine: "routine", level: "recommended" }],

  // Eastern Europe
  poland: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  "czech republic": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  hungary: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  croatia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  romania: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "conditional" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  bulgaria: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "conditional" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  slovenia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  slovakia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  estonia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  latvia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],
  lithuania: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "tick_borne_encephalitis", level: "conditional" },
  ],

  // Main Asian destinations
  thailand: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  vietnam: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  cambodia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  laos: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  indonesia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  philippines: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  malaysia: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  singapore: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "conditional" },
    { vaccine: "typhoid", level: "conditional" },
  ],
  japan: [{ vaccine: "routine", level: "recommended" }],
  "south korea": [{ vaccine: "routine", level: "recommended" }],
  china: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
  ],
  nepal: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  "sri lanka": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  myanmar: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],

  // South Pacific
  fiji: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  "new zealand": [{ vaccine: "routine", level: "recommended" }],
  samoa: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  tonga: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "conditional" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  "french polynesia": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  vanuatu: [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
  "papua new guinea": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "typhoid", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
    { vaccine: "japanese_encephalitis", level: "conditional" },
    { vaccine: "rabies", level: "conditional" },
  ],
  "cook islands": [
    { vaccine: "routine", level: "recommended" },
    { vaccine: "hepatitis_a", level: "recommended" },
    { vaccine: "hepatitis_b", level: "recommended" },
  ],
};

export function recommendationsForCountry(country) {
  if (!country) return [];
  const rawKey = country.trim().toLowerCase();
  const key = countryAliases[rawKey] ?? rawKey;
  const entries = countryVaccineRecommendations[key];
  if (!entries) return [];
  return entries.map((entry) => ({ ...entry, ...vaccineInfo[entry.vaccine] }));
}
