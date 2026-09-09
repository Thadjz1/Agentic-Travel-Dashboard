"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function PackingRow({ packingItem, categories = [], dragHandlers }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(packingItem.item);
  const [categoryId, setCategoryId] = useState(packingItem.category_id ?? "");
  const [loading, setLoading] = useState(false);

  const categoryName = categories.find((c) => c.id === packingItem.category_id)?.name;

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("packing_items")
      .update({ item, category_id: categoryId || null })
      .eq("id", packingItem.id);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await supabase.from("packing_items").delete().eq("id", packingItem.id);
    router.refresh();
  }

  async function handleTogglePacked(e) {
    setLoading(true);
    await supabase
      .from("packing_items")
      .update({ is_packed: e.target.checked })
      .eq("id", packingItem.id);
    router.refresh();
    setLoading(false);
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave} className="flex flex-wrap items-end gap-2">
          <input
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          {categories.length > 0 && (
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded border border-black/20 bg-white px-2 py-1 text-black"
            >
              <option value="">Uncategorized</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
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
    <li
      {...dragHandlers}
      className="flex cursor-grab items-center justify-between gap-2 active:cursor-grabbing"
    >
      <span className="flex items-center gap-2">
        <span className="text-black/30">⠿</span>
        <input
          type="checkbox"
          defaultChecked={packingItem.is_packed}
          onChange={handleTogglePacked}
          disabled={loading}
        />
        {packingItem.item}
        {categoryName && <span className="text-xs text-black/40">({categoryName})</span>}
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
