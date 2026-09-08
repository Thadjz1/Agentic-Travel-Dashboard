"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const emptyForm = {
  country: "",
  city: "",
  arrival_date: "",
  departure_date: "",
  visa_length_days: "",
};

export default function AddTripForm() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // user_id isn't set here on purpose: the "trips" table defaults it to
    // auth.uid(), which Supabase can resolve because this request is sent
    // with the signed-in user's session.
    const { error } = await supabase.from("trips").insert({
      country: form.country,
      city: form.city || null,
      arrival_date: form.arrival_date,
      departure_date: form.departure_date,
      visa_length_days: form.visa_length_days
        ? Number(form.visa_length_days)
        : null,
    });

    if (error) {
      setError(error.message);
    } else {
      setForm(emptyForm);
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-3 rounded-lg border border-black/10 p-4"
    >
      <h2 className="font-medium">Add a trip</h2>

      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <input
            id="country"
            required
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
          />
        </div>
        <div className="flex-1 space-y-1">
          <label htmlFor="city" className="text-sm font-medium">
            City (optional)
          </label>
          <input
            id="city"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          <label htmlFor="arrival_date" className="text-sm font-medium">
            Arrival date
          </label>
          <input
            id="arrival_date"
            type="date"
            required
            value={form.arrival_date}
            onChange={(e) => updateField("arrival_date", e.target.value)}
            className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
          />
        </div>
        <div className="flex-1 space-y-1">
          <label htmlFor="departure_date" className="text-sm font-medium">
            Departure date
          </label>
          <input
            id="departure_date"
            type="date"
            required
            value={form.departure_date}
            onChange={(e) => updateField("departure_date", e.target.value)}
            className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="visa_length_days" className="text-sm font-medium">
          Visa length in days (optional)
        </label>
        <input
          id="visa_length_days"
          type="number"
          min="0"
          value={form.visa_length_days}
          onChange={(e) => updateField("visa_length_days", e.target.value)}
          className="w-full max-w-[150px] rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Adding…" : "Add trip"}
      </button>
    </form>
  );
}
