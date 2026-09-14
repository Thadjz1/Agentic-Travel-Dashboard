"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ProfileForm({ userId, initialProfile }) {
  const router = useRouter();
  const supabase = createClient();

  const [nationality, setNationality] = useState(initialProfile?.nationality ?? "");
  const [countryOfResidence, setCountryOfResidence] = useState(
    initialProfile?.country_of_residence ?? ""
  );
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      nationality: nationality || null,
      country_of_residence: countryOfResidence || null,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-black/10 p-4">
      <div className="space-y-1">
        <label htmlFor="nationality" className="text-sm font-medium">
          Nationality (passport country)
        </label>
        <input
          id="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          placeholder="e.g. United States"
          className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="residence" className="text-sm font-medium">
          Country of residence (optional)
        </label>
        <input
          id="residence"
          value={countryOfResidence}
          onChange={(e) => setCountryOfResidence(e.target.value)}
          placeholder="e.g. United States"
          className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-green-700">Saved.</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
