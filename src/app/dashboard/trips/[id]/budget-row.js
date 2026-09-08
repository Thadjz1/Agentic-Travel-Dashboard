"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function BudgetRow({ budgetItem }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState(budgetItem.category);
  const [plannedAmount, setPlannedAmount] = useState(budgetItem.planned_amount ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("budget_items")
      .update({
        category,
        planned_amount: plannedAmount ? Number(plannedAmount) : null,
      })
      .eq("id", budgetItem.id);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await supabase.from("budget_items").delete().eq("id", budgetItem.id);
    router.refresh();
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
            className="w-28 rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <button type="submit" disabled={loading} className="rounded bg-black px-3 py-1 text-white disabled:opacity-50">
            Save
          </button>
          <button type="button" onClick={() => setIsEditing(false)} disabled={loading} className="rounded border border-black/20 px-3 py-1">
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between gap-2">
      <span>
        {budgetItem.category}
        {budgetItem.planned_amount != null && (
          <span className="text-black/60"> — ${budgetItem.planned_amount}</span>
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
    </li>
  );
}
