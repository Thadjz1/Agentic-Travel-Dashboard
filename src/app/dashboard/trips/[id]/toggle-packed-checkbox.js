"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function TogglePackedCheckbox({ id, isPacked }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    setLoading(true);
    await supabase
      .from("packing_items")
      .update({ is_packed: e.target.checked })
      .eq("id", id);
    router.refresh();
    setLoading(false);
  }

  return (
    <input
      type="checkbox"
      defaultChecked={isPacked}
      onChange={handleChange}
      disabled={loading}
    />
  );
}
