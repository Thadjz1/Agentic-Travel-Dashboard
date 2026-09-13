export const exploreCategories = [
  { value: "tourism", label: "Tourism" },
  { value: "food", label: "Food & Dining" },
  { value: "outdoors", label: "Outdoor Adventure" },
  { value: "music", label: "Live Music" },
  { value: "other", label: "Other" },
];

export function exploreCategoryLabel(value) {
  return exploreCategories.find((c) => c.value === value)?.label ?? value;
}
