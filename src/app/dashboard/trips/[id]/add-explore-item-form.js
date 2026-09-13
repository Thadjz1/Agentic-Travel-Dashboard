"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { exploreCategories } from "@/data/explore-categories";

export default function AddExploreItemForm({ tripId }) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("tourism");
  const [notes, setNotes] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("explore_items").insert({
      trip_id: tripId,
      name,
      category,
      notes: notes || null,
      link: link || null,
    });

    if (error) {
      setError(error.message);
    } else {
      setName("");
      setNotes("");
      setLink("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="space-y-1">
        <label htmlFor="explore-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="explore-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Taj Mahal"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="explore-category" className="text-sm font-medium">
          Category
        </label>
        <select
          id="explore-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        >
          {exploreCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label htmlFor="explore-notes" className="text-sm font-medium">
          Notes (optional)
        </label>
        <input
          id="explore-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Go at sunrise"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="explore-link" className="text-sm font-medium">
          Link (optional)
        </label>
        <input
          id="explore-link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://…"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
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
