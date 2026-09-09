"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddPackingItemForm({ tripId, categories = [], defaultCategoryId = "" }) {
  const router = useRouter();
  const supabase = createClient();

  const [item, setItem] = useState("");
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("packing_items").insert({
      trip_id: tripId,
      item,
      category_id: categoryId || null,
    });

    if (error) {
      setError(error.message);
    } else {
      setItem("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="space-y-1">
        <label htmlFor="packing-item" className="text-sm font-medium">
          Item
        </label>
        <input
          id="packing-item"
          required
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="e.g. Rain jacket"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>

      {categories.length > 0 && (
        <div className="space-y-1">
          <label htmlFor="packing-category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="packing-category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded border border-black/20 bg-white px-3 py-2 text-black"
          >
            <option value="">Uncategorized</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
