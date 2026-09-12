"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddSuggestedVaccineButton({
  tripId,
  name,
  requiredByDate,
  doseNumber,
  totalDoses,
}) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await supabase.from("vaccines").insert({
      trip_id: tripId,
      name,
      required_by_date: requiredByDate,
      dose_number: doseNumber,
      total_doses: totalDoses,
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-sm underline disabled:opacity-50"
    >
      {loading ? "Adding…" : "+ Add to my list"}
    </button>
  );
}
