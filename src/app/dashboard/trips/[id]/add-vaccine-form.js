"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddVaccineForm({ tripId }) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [requiredByDate, setRequiredByDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("vaccines").insert({
      trip_id: tripId,
      name,
      required_by_date: requiredByDate || null,
    });

    if (error) {
      setError(error.message);
    } else {
      setName("");
      setRequiredByDate("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="space-y-1">
        <label htmlFor="vaccine-name" className="text-sm font-medium">
          Vaccine
        </label>
        <input
          id="vaccine-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Hepatitis A"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="vaccine-date" className="text-sm font-medium">
          Needed by (optional)
        </label>
        <input
          id="vaccine-date"
          type="date"
          value={requiredByDate}
          onChange={(e) => setRequiredByDate(e.target.value)}
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
