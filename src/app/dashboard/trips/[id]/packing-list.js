"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PackingRow from "./packing-row";

export default function PackingList({ initialItems, categories = [] }) {
  const router = useRouter();
  const supabase = createClient();

  const [items, setItems] = useState(initialItems);
  const [dragIndex, setDragIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  async function handleDrop(dropIndex) {
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      return;
    }

    const reordered = [...items];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);

    setItems(reordered);
    setDragIndex(null);
    setError("");

    const results = await Promise.all(
      reordered.map((item, index) =>
        supabase.from("packing_items").update({ position: index }).eq("id", item.id)
      )
    );
    const failed = results.find((r) => r.error);
    if (failed) {
      setError("Could not save the new order: " + failed.error.message);
    }
    router.refresh();
  }

  if (items.length === 0) {
    return <p className="text-sm text-black/60">None yet</p>;
  }

  return (
    <div>
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      <ul className="space-y-1 text-sm">
        {items.map((packingItem, index) => (
          <PackingRow
            key={packingItem.id}
            packingItem={packingItem}
            categories={categories}
            dragHandlers={{
              draggable: true,
              onDragStart: () => setDragIndex(index),
              onDragOver: (e) => e.preventDefault(),
              onDrop: () => handleDrop(index),
            }}
          />
        ))}
      </ul>
    </div>
  );
}
