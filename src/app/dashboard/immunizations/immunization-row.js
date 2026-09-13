"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { formatDate } from "@/utils/format-date";

export default function ImmunizationRow({ immunization, documents }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [vaccineName, setVaccineName] = useState(immunization.vaccine_name);
  const [dateReceived, setDateReceived] = useState(immunization.date_received ?? "");
  const [loading, setLoading] = useState(false);

  const linkedDoc = documents.find((doc) => doc.id === immunization.document_id);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("immunizations")
      .update({ vaccine_name: vaccineName, date_received: dateReceived || null })
      .eq("id", immunization.id);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await supabase.from("immunizations").delete().eq("id", immunization.id);
    router.refresh();
  }

  async function handleViewProof() {
    if (!linkedDoc?.file_path) return;
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(linkedDoc.file_path, 60);
    if (!error && data) {
      window.open(data.signedUrl, "_blank");
    }
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave} className="flex flex-wrap items-end gap-2">
          <input
            required
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <input
            type="date"
            value={dateReceived}
            onChange={(e) => setDateReceived(e.target.value)}
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
      <span>
        {immunization.vaccine_name}
        {immunization.date_received && (
          <span className="text-black/60"> — received {formatDate(immunization.date_received)}</span>
        )}
      </span>
      <span className="flex gap-3">
        {linkedDoc?.file_path && (
          <button onClick={handleViewProof} className="text-sm underline">
            Proof
          </button>
        )}
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
