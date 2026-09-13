// Computes the total planned amount for a budget item given the trip's
// night count. "day"/"week"/"month" rates get scaled by the trip length;
// "total" (the default) is already a flat total.
export function plannedTotalFor(item, nights) {
  if (item.planned_amount == null) return 0;
  const n = nights ?? 0;
  switch (item.budget_period) {
    case "day":
      return item.planned_amount * n;
    case "week":
      return item.planned_amount * (n / 7);
    case "month":
      return item.planned_amount * (n / 30);
    default:
      return item.planned_amount;
  }
}

export const budgetPeriodOptions = [
  { value: "total", label: "total for the trip" },
  { value: "day", label: "per day" },
  { value: "week", label: "per week" },
  { value: "month", label: "per month" },
];
