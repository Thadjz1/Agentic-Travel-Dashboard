// General reference info for US passport holders, not legal advice.
// Visa policy depends on your specific nationality/passport and changes
// over time — always confirm current requirements before booking.
//
// `applyUrl` is only set where the official government e-visa/ETA portal
// is well-established and unlikely to be confused with a third-party
// "visa service" site. Where we are not confident of the exact official
// URL, we deliberately omit it rather than guess, and point to the
// State Department's country page instead.

const stateDeptSearch = (country) =>
  `https://www.google.com/search?q=site:travel.state.gov+${encodeURIComponent(country)}+entry+requirements`;

export const visaInfo = {
  india: {
    requirement: "E-visa required — apply online in advance",
    applyUrl: "https://indianvisaonline.gov.in/evisa/",
  },
  vietnam: {
    requirement: "E-visa required — apply online in advance",
    applyUrl: "https://evisa.gov.vn/",
  },
  cambodia: {
    requirement: "E-visa or visa on arrival available",
    applyUrl: "https://www.evisa.gov.kh/",
  },
  kenya: {
    requirement: "E-visa (eTA) required — apply online in advance",
    applyUrl: "https://www.etakenya.go.ke/",
  },
  tanzania: {
    requirement: "E-visa available — apply online in advance",
    applyUrl: "https://eservices.immigration.go.tz/visa/",
  },
  "sri lanka": {
    requirement: "Electronic Travel Authorization (ETA) required",
    applyUrl: "https://www.eta.gov.lk/",
  },
  myanmar: {
    requirement: "E-visa required — apply online in advance",
    applyUrl: "https://evisa.moip.gov.mm/",
  },
  egypt: {
    requirement: "E-visa or visa on arrival available",
    applyUrl: "https://visa2egypt.gov.eg/",
  },
  "new zealand": {
    requirement: "NZeTA (Electronic Travel Authority) required, even though no full visa is needed",
    applyUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta",
  },
  "south korea": {
    requirement: "K-ETA (Electronic Travel Authorization) required",
    applyUrl: "https://www.k-eta.go.kr/",
  },
  australia: {
    requirement: "Electronic Travel Authority (ETA) required, even for short visits",
    applyUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601",
  },

  // Visa-free for typical US tourist stays (general knowledge; still verify).
  mexico: { requirement: "Visa-free for tourism (tourist card issued on arrival)" },
  guatemala: { requirement: "Visa-free for tourism, up to 90 days" },
  belize: { requirement: "Visa-free for tourism, up to 30 days" },
  "costa rica": { requirement: "Visa-free for tourism, up to 90 days" },
  "el salvador": { requirement: "Visa-free for tourism" },
  honduras: { requirement: "Visa-free for tourism" },
  nicaragua: { requirement: "Visa-free for tourism" },
  panama: { requirement: "Visa-free for tourism, up to 90 days" },
  argentina: { requirement: "Visa-free for tourism, up to 90 days" },
  chile: { requirement: "Visa-free for tourism, up to 90 days" },
  colombia: { requirement: "Visa-free for tourism, up to 90 days" },
  ecuador: { requirement: "Visa-free for tourism, up to 90 days" },
  paraguay: { requirement: "Visa-free for tourism" },
  peru: { requirement: "Visa-free for tourism, up to 90/183 days" },
  uruguay: { requirement: "Visa-free for tourism, up to 90 days" },
  guyana: { requirement: "Visa-free for tourism" },
  "south africa": { requirement: "Visa-free for tourism, up to 90 days" },
  morocco: { requirement: "Visa-free for tourism, up to 90 days" },
  namibia: { requirement: "Visa-free for tourism, up to 90 days" },
  botswana: { requirement: "Visa-free for tourism, up to 90 days" },
  senegal: { requirement: "Visa-free for tourism" },
  tunisia: { requirement: "Visa-free for tourism, up to 90 days" },
  france: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  italy: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  spain: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  germany: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  "united kingdom": { requirement: "Visa-free for tourism, up to 6 months" },
  portugal: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  netherlands: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  greece: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  switzerland: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  ireland: { requirement: "Visa-free for tourism, up to 90 days" },
  austria: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  belgium: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  poland: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  "czech republic": { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  hungary: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  croatia: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  romania: { requirement: "Visa-free for tourism, up to 90 days" },
  bulgaria: { requirement: "Visa-free for tourism, up to 90 days" },
  slovenia: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  slovakia: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  estonia: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  latvia: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  lithuania: { requirement: "Visa-free (Schengen), up to 90 days in a 180-day period" },
  thailand: { requirement: "Visa-free for tourism (typically up to 30-60 days)" },
  philippines: { requirement: "Visa-free for tourism, up to 30 days" },
  malaysia: { requirement: "Visa-free for tourism, up to 90 days" },
  singapore: { requirement: "Visa-free for tourism, up to 90 days" },
  japan: { requirement: "Visa-free for tourism, up to 90 days" },
  fiji: { requirement: "Visa-free for tourism, up to 4 months" },
  samoa: { requirement: "Visa-free for tourism" },
  tonga: { requirement: "Visa-free for tourism" },
  "french polynesia": { requirement: "Visa-free for tourism, up to 90 days" },
  vanuatu: { requirement: "Visa-free for tourism" },
  "cook islands": { requirement: "Visa-free for tourism, up to 31 days" },

  // Visa required in advance, or visa-on-arrival that is still a real visa.
  bolivia: { requirement: "Visa required — e-visa or visa on arrival available" },
  venezuela: { requirement: "Visa required — apply in advance" },
  suriname: { requirement: "E-visa required — apply online in advance" },
  zimbabwe: { requirement: "Visa required — visa on arrival generally available" },
  rwanda: { requirement: "Visa required — e-visa or visa on arrival available" },
  ghana: { requirement: "Visa required — apply in advance" },
  china: { requirement: "Visa required — apply in advance" },
  nepal: { requirement: "Visa on arrival available (still a real visa, bring passport photos and cash)" },
  laos: { requirement: "Visa required — visa on arrival or e-visa available" },
  indonesia: { requirement: "Visa on arrival or e-visa (Visa on Arrival is still a paid visa)" },
  "papua new guinea": { requirement: "Visa required — e-visa available" },

  // Genuinely uncertain / recently volatile — flagged rather than guessed.
  brazil: {
    requirement: "Policy has changed multiple times recently for US citizens — confirm current status before booking",
  },
};

export function visaInfoForCountry(country) {
  if (!country) return null;
  const key = country.trim().toLowerCase();
  const entry = visaInfo[key];
  return {
    requirement: entry?.requirement ?? "Check current requirements for your nationality",
    applyUrl: entry?.applyUrl ?? null,
    searchUrl: stateDeptSearch(country.trim()),
  };
}
