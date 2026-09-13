"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddImmunizationForm({ documents }) {
  const router = useRouter();
  const supabase = createClient();

  const [vaccineName, setVaccineName] = useState("");
  const [dateReceived, setDateReceived] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("immunizations").insert({
      vaccine_name: vaccineName,
      date_received: dateReceived || null,
      document_id: documentId || null,
    });

    if (error) {
      setError(error.message);
    } else {
      setVaccineName("");
      setDateReceived("");
      setDocumentId("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-2 rounded-lg border border-black/10 p-4"
    >
      <div className="space-y-1">
        <label htmlFor="imm-name" className="text-sm font-medium">
          Vaccine
        </label>
        <input
          id="imm-name"
          required
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
          placeholder="e.g. Hepatitis A"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="imm-date" className="text-sm font-medium">
          Date received (optional)
        </label>
        <input
          id="imm-date"
          type="date"
          value={dateReceived}
          onChange={(e) => setDateReceived(e.target.value)}
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      {documents.length > 0 && (
        <div className="space-y-1">
          <label htmlFor="imm-doc" className="text-sm font-medium">
            Proof document (optional)
          </label>
          <select
            id="imm-doc"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            className="rounded border border-black/20 bg-white px-3 py-2 text-black"
          >
            <option value="">None</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>
      )}
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
