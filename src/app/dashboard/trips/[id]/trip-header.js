"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { formatDate } from "@/utils/format-date";

export default function TripHeader({ trip }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    country: trip.country,
    city: trip.city ?? "",
    arrival_date: trip.arrival_date,
    departure_date: trip.departure_date,
    visa_length_days: trip.visa_length_days ?? "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase
      .from("trips")
      .update({
        country: form.country,
        city: form.city || null,
        arrival_date: form.arrival_date,
        departure_date: form.departure_date,
        visa_length_days: form.visa_length_days
          ? Number(form.visa_length_days)
          : null,
      })
      .eq("id", trip.id);

    if (error) {
      setError(error.message);
    } else {
      setIsEditing(false);
      router.refresh();
    }

    setLoading(false);
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this trip? This also deletes its docs, health, packing, and budget items."
    );
    if (!confirmed) return;

    setLoading(true);
    const { error } = await supabase.from("trips").delete().eq("id", trip.id);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="mb-6 space-y-3 rounded-lg border border-black/10 p-4">
        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <label htmlFor="edit-country" className="text-sm font-medium">
              Country
            </label>
            <input
              id="edit-country"
              required
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label htmlFor="edit-city" className="text-sm font-medium">
              City (optional)
            </label>
            <input
              id="edit-city"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <label htmlFor="edit-arrival" className="text-sm font-medium">
              Arrival date
            </label>
            <input
              id="edit-arrival"
              type="date"
              required
              value={form.arrival_date}
              onChange={(e) => updateField("arrival_date", e.target.value)}
              className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label htmlFor="edit-departure" className="text-sm font-medium">
              Departure date
            </label>
            <input
              id="edit-departure"
              type="date"
              required
              value={form.departure_date}
              onChange={(e) => updateField("departure_date", e.target.value)}
              className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="edit-visa" className="text-sm font-medium">
            Visa length in days (optional)
          </label>
          <input
            id="edit-visa"
            type="number"
            min="0"
            value={form.visa_length_days}
            onChange={(e) => updateField("visa_length_days", e.target.value)}
            className="w-full max-w-[150px] rounded border border-black/20 bg-white px-3 py-2 text-black"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="rounded border border-black/20 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mb-6 flex items-start justify-between">
      <h1 className="text-xl font-semibold">
        {trip.city ? `${trip.city}, ${trip.country}` : trip.country}
        <span className="ml-2 text-sm font-normal text-black/60">
          {formatDate(trip.arrival_date)} → {formatDate(trip.departure_date)}
        </span>
      </h1>
      <div className="flex shrink-0 gap-3 text-sm">
        <button onClick={() => setIsEditing(true)} className="underline">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-600 underline">
          Delete trip
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
