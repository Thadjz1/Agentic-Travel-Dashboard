"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddSuggestedVaccineButton({ tripId, name, doses }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");

    const rows = doses.map((dose) => ({
      trip_id: tripId,
      name,
      required_by_date: dose.requiredByDate,
      dose_number: doses.length > 1 ? dose.doseNumber : null,
      total_doses: doses.length > 1 ? doses.length : null,
    }));

    const { error } = await supabase.from("vaccines").insert(rows);

    if (error) {
      setError(error.message);
    } else {
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="text-sm underline disabled:opacity-50"
      >
        {loading ? "Adding…" : "+ Add to my list"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
