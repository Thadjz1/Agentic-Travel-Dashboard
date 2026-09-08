"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PackingRow from "./packing-row";

export default function PackingList({ initialItems }) {
  const router = useRouter();
  const supabase = createClient();

  const [items, setItems] = useState(initialItems);
  const [dragIndex, setDragIndex] = useState(null);

  // Keep in sync whenever the server gives us fresh data (e.g. after adding
  // or editing an item elsewhere on the page).
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

    // Persist the whole new order (small lists, simplest to reason about).
    await Promise.all(
      reordered.map((item, index) =>
        supabase.from("packing_items").update({ position: index }).eq("id", item.id)
      )
    );
    router.refresh();
  }

  if (items.length === 0) {
    return <p className="text-sm text-black/60">None yet</p>;
  }

  return (
    <ul className="space-y-1 text-sm">
      {items.map((packingItem, index) => (
        <PackingRow
          key={packingItem.id}
          packingItem={packingItem}
          dragHandlers={{
            draggable: true,
            onDragStart: () => setDragIndex(index),
            onDragOver: (e) => e.preventDefault(),
            onDrop: () => handleDrop(index),
          }}
        />
      ))}
    </ul>
  );
}
