"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AddDocumentForm({ tripId }) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    let filePath = null;

    if (file) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      filePath = `${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("documents").insert({
      trip_id: tripId,
      title,
      doc_type: docType || null,
      file_path: filePath,
    });

    if (error) {
      setError(error.message);
    } else {
      setTitle("");
      setDocType("");
      setFile(null);
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="space-y-1">
        <label htmlFor="doc-title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="doc-title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Passport"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="doc-type" className="text-sm font-medium">
          Type (optional)
        </label>
        <input
          id="doc-type"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          placeholder="e.g. ID, ticket"
          className="rounded border border-black/20 bg-white px-3 py-2 text-black"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="doc-file" className="text-sm font-medium">
          File (optional)
        </label>
        <input
          id="doc-file"
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm"
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
