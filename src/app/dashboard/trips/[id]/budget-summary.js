import { plannedTotalFor } from "@/utils/budget";

export default function BudgetSummary({ budgetItems, nights }) {
  if (!budgetItems || budgetItems.length === 0) return null;

  const totalPlanned = budgetItems.reduce((sum, item) => sum + plannedTotalFor(item, nights), 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + (item.actual_amount ?? 0), 0);
  const remaining = totalPlanned - totalActual;

  const byCategory = {};
  for (const item of budgetItems) {
    if (!byCategory[item.category]) {
      byCategory[item.category] = { planned: 0, actual: 0 };
    }
    byCategory[item.category].planned += plannedTotalFor(item, nights);
    byCategory[item.category].actual += item.actual_amount ?? 0;
  }

  return (
    <div className="rounded-lg border border-black/10 p-3 text-sm">
      <div className="flex flex-wrap gap-x-6 gap-y-1 font-medium">
        <span>Planned: ${totalPlanned.toFixed(2)}</span>
        <span>Actual: ${totalActual.toFixed(2)}</span>
        <span className={remaining < 0 ? "text-red-600" : "text-green-700"}>
          {remaining < 0
            ? `Over by $${Math.abs(remaining).toFixed(2)}`
            : `Remaining: $${remaining.toFixed(2)}`}
        </span>
      </div>

      <div className="mt-2 space-y-1 text-black/60">
        {Object.entries(byCategory).map(([category, totals]) => (
          <div key={category}>
            {category}: ${totals.actual.toFixed(2)} of ${totals.planned.toFixed(2)} planned
          </div>
        ))}
      </div>
    </div>
  );
}
