"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { formatDate } from "@/utils/format-date";

export default function VaccineRow({ vaccine }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(vaccine.name);
  const [requiredByDate, setRequiredByDate] = useState(vaccine.required_by_date ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("vaccines")
      .update({ name, required_by_date: requiredByDate || null })
      .eq("id", vaccine.id);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await supabase.from("vaccines").delete().eq("id", vaccine.id);
    router.refresh();
  }

  async function handleToggleDone(e) {
    setLoading(true);
    await supabase
      .from("vaccines")
      .update({ completed_date: e.target.checked ? new Date().toISOString().slice(0, 10) : null })
      .eq("id", vaccine.id);
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
          <input
            type="date"
            value={requiredByDate}
            onChange={(e) => setRequiredByDate(e.target.value)}
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
          defaultChecked={!!vaccine.completed_date}
          onChange={handleToggleDone}
          disabled={loading}
        />
        {vaccine.name}
        {vaccine.dose_number && (
          <span className="text-black/60">
            (dose {vaccine.dose_number} of {vaccine.total_doses})
          </span>
        )}
        {vaccine.required_by_date && (
          <span className="text-black/60">— needed by {formatDate(vaccine.required_by_date)}</span>
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
