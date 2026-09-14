import { recommendationsForCountry } from "./vaccine-catalog";

// General reference info, not legal/travel advice. Visa rules depend on
// your nationality and change over time, so rather than guessing a
// yes/no per country, every trip gets a reminder to check current
// requirements. The Yellow Fever certificate is derived from the
// existing vaccine catalog instead of guessed separately.

export const documentTypes = {
  passport: {
    name: "Passport (valid 6+ months beyond travel dates)",
    description:
      "Most countries require your passport to be valid for at least 6 months past your planned departure date, and some require at least one blank visa page.",
  },
  visa_check: {
    name: "Visa / Entry Requirements",
    description:
      "Whether you need a visa depends on your nationality and passport, and requirements change over time. Check the destination's current entry requirements (its embassy, or your government's travel advisory site) before booking.",
  },
  travel_insurance: {
    name: "Travel Insurance",
    description:
      "Not always required, but strongly recommended for medical emergencies and trip disruptions — some countries do require proof of insurance for entry.",
  },
  onward_travel: {
    name: "Proof of Onward/Return Travel",
    description:
      "Many countries require proof you will leave (a return or onward ticket) before letting you in, even if it is not always checked at the border.",
  },
  yellow_fever_certificate: {
    name: "Yellow Fever Vaccination Certificate",
    description:
      "The physical or digital \"yellow card\" proving you have had the yellow fever vaccine — required for entry to some countries, especially if arriving from another at-risk country.",
  },
  immunization_records: {
    name: "Immunization Records",
    description:
      "A copy of your vaccination history, useful to have on hand for a medical need abroad or an entry requirement you did not anticipate.",
  },
};

export function documentRecommendationsForCountry(country) {
  const items = [
    { doc: "passport", level: "required" },
    { doc: "visa_check", level: "required" },
    { doc: "travel_insurance", level: "recommended" },
    { doc: "onward_travel", level: "recommended" },
    { doc: "immunization_records", level: "recommended" },
  ];

  const yellowFever = recommendationsForCountry(country).find(
    (v) => v.name === "Yellow Fever"
  );
  if (yellowFever) {
    items.push({ doc: "yellow_fever_certificate", level: yellowFever.level });
  }

  return items.map((item) => ({ ...item, ...documentTypes[item.doc] }));
}
