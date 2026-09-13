"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { exploreCategories, exploreCategoryLabel } from "@/data/explore-categories";

export default function ExploreRow({ item }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [notes, setNotes] = useState(item.notes ?? "");
  const [link, setLink] = useState(item.link ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("explore_items")
      .update({ name, category, notes: notes || null, link: link || null })
      .eq("id", item.id);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await supabase.from("explore_items").delete().eq("id", item.id);
    router.refresh();
  }

  async function handleToggleVisited(e) {
    setLoading(true);
    await supabase
      .from("explore_items")
      .update({ is_visited: e.target.checked })
      .eq("id", item.id);
    router.refresh();
    setLoading(false);
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave} className="flex flex-wrap items-end gap-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          >
            {exploreCategories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link"
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
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
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={item.is_visited}
          onChange={handleToggleVisited}
          disabled={loading}
        />
        <span className={item.is_visited ? "line-through text-black/40" : ""}>
          {item.name}
        </span>
        <span className="text-xs text-black/40">({exploreCategoryLabel(item.category)})</span>
        {item.notes && <span className="text-black/60">— {item.notes}</span>}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm underline">
            link
          </a>
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
