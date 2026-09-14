"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddSuggestedDocumentButton({ tripId, name, level }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    const { error } = await supabase.from("documents").insert({
      trip_id: tripId,
      title: name,
      doc_type: level,
    });
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
