"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { plannedTotalFor, budgetPeriodOptions } from "@/utils/budget";

export default function BudgetRow({ budgetItem, nights }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState(budgetItem.category);
  const [plannedAmount, setPlannedAmount] = useState(budgetItem.planned_amount ?? "");
  const [budgetPeriod, setBudgetPeriod] = useState(budgetItem.budget_period ?? "total");
  const [actualAmount, setActualAmount] = useState(budgetItem.actual_amount ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase
      .from("budget_items")
      .update({
        category,
        planned_amount: plannedAmount ? Number(plannedAmount) : null,
        budget_period: budgetPeriod,
        actual_amount: actualAmount ? Number(actualAmount) : null,
      })
      .eq("id", budgetItem.id);
    if (error) {
      setError(error.message);
    } else {
      setIsEditing(false);
      router.refresh();
    }
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    setError("");
    const { error } = await supabase.from("budget_items").delete().eq("id", budgetItem.id);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.refresh();
    }
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave} className="flex flex-wrap items-end gap-2">
          <input
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={plannedAmount}
            onChange={(e) => setPlannedAmount(e.target.value)}
            placeholder="Planned"
            className="w-24 rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <select
            value={budgetPeriod}
            onChange={(e) => setBudgetPeriod(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          >
            {budgetPeriodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.01"
            value={actualAmount}
            onChange={(e) => setActualAmount(e.target.value)}
            placeholder="Actual"
            className="w-24 rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <button type="submit" disabled={loading} className="rounded bg-black px-3 py-1 text-white disabled:opacity-50">
            Save
          </button>
          <button type="button" onClick={() => setIsEditing(false)} disabled={loading} className="rounded border border-black/20 px-3 py-1">
            Cancel
          </button>
        </form>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </li>
    );
  }

  const plannedTotal = budgetItem.planned_amount != null ? plannedTotalFor(budgetItem, nights) : null;
  const isScaled = budgetItem.budget_period && budgetItem.budget_period !== "total";
  const overBudget =
    plannedTotal != null && budgetItem.actual_amount != null && budgetItem.actual_amount > plannedTotal;

  return (
    <li>
      <div className="flex items-center justify-between gap-2">
        <span>
          {budgetItem.category}
          {plannedTotal != null && (
            <span className="text-black/60">
              {" "}
              — planned ${plannedTotal.toFixed(2)}
              {isScaled && (
                <span> (${budgetItem.planned_amount}/{budgetItem.budget_period})</span>
              )}
            </span>
          )}
          {budgetItem.actual_amount != null && (
            <span className={overBudget ? "text-red-600" : "text-black/60"}>
              {" "}
              — actual ${budgetItem.actual_amount}
            </span>
          )}
        </span>
        <span className="flex gap-3">
          <button onClick={() => setIsEditing(true)} className="text-sm underline">
            Edit
          </button>
          <button onClick={handleDelete} disabled={loading} className="text-black/40 hover:text-red-600 disabled:opacity-50" aria-label="Delete">
            ✕
          </button>
        </span>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </li>
  );
}
