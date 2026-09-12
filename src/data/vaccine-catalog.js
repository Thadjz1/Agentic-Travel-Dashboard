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
};

// Keyed by lowercase, trimmed country name as entered on a trip.
// "level" is one of: "required", "recommended", "conditional" (depends on
// your specific itinerary/activities).
export const countryVaccineRecommendations = {
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
};

export function recommendationsForCountry(country) {
  if (!country) return [];
  const key = country.trim().toLowerCase();
  const entries = countryVaccineRecommendations[key];
  if (!entries) return [];
  return entries.map((entry) => ({ ...entry, ...vaccineInfo[entry.vaccine] }));
}
