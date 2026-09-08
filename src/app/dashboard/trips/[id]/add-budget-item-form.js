"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddBudgetItemForm({ tripId }) {
  const router = useRouter();
  const supabase = createClient();

  const [category, setCategory] = useState("");
  const [plannedAmount, setPlannedAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("budget_items").insert({
      trip_id: tripId,
      category,
      planned_amount: plannedAmount ? Number(plannedAmount) : null,
    });

    if (error) {
      setError(error.message);
    } else {
      setCategory("");
      setPlannedAmount("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="space-y-1">
        <label htmlFor="budget-category" className="text-sm font-medium">
          Category
        </label>
        <input
          id="budget-category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Lodging"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="budget-planned" className="text-sm font-medium">
          Planned amount (optional)
        </label>
        <input
          id="budget-planned"
          type="number"
          min="0"
          step="0.01"
          value={plannedAmount}
          onChange={(e) => setPlannedAmount(e.target.value)}
          className="w-28 rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Adding…" : "Add"}
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </form>
  );
}
