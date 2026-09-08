"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DocumentRow({ doc }) {
  const router = useRouter();
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(doc.title);
  const [docType, setDocType] = useState(doc.doc_type ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("documents")
      .update({ title, doc_type: docType || null })
      .eq("id", doc.id);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await supabase.from("documents").delete().eq("id", doc.id);
    router.refresh();
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave} className="flex flex-wrap items-end gap-2">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-black"
          />
          <input
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            placeholder="Type (optional)"
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
        {doc.title}
        {doc.doc_type && <span className="text-black/60"> — {doc.doc_type}</span>}
      </span>
      <span className="flex gap-3">
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
