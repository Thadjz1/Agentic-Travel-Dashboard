"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PackingList from "./packing-list";
import AddPackingItemForm from "./add-packing-item-form";

export default function PackingSection({ tripId, initialItems, initialCategories }) {
  const router = useRouter();
  const supabase = createClient();

  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const visibleItems =
    selectedCategoryId === "all"
      ? initialItems
      : initialItems.filter((item) => item.category_id === selectedCategoryId);

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setLoading(true);
    await supabase
      .from("packing_categories")
      .insert({ trip_id: tripId, name: newCategoryName.trim() });
    setNewCategoryName("");
    setLoading(false);
    router.refresh();
  }

  async function handleRenameCategory(e) {
    e.preventDefault();
    if (!renameValue.trim() || !selectedCategory) return;
    setLoading(true);
    await supabase
      .from("packing_categories")
      .update({ name: renameValue.trim() })
      .eq("id", selectedCategory.id);
    setIsRenaming(false);
    setLoading(false);
    router.refresh();
  }

  async function handleDeleteCategory() {
    if (!selectedCategory) return;
    const confirmed = window.confirm(
      `Delete category "${selectedCategory.name}"? Its items will become uncategorized, not deleted.`
    );
    if (!confirmed) return;

    setLoading(true);
    await supabase.from("packing_categories").delete().eq("id", selectedCategory.id);
    setSelectedCategoryId("all");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedCategoryId}
          onChange={(e) => {
            setSelectedCategoryId(e.target.value);
            setIsRenaming(false);
          }}
          className="rounded border border-black/20 bg-white px-2 py-1 text-sm text-black"
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {selectedCategory && !isRenaming && (
          <>
            <button
              onClick={() => {
                setIsRenaming(true);
                setRenameValue(selectedCategory.name);
              }}
              className="text-sm underline"
            >
              Rename
            </button>
            <button
              onClick={handleDeleteCategory}
              disabled={loading}
              className="text-sm text-red-600 underline disabled:opacity-50"
            >
              Delete category
            </button>
          </>
        )}
      </div>

      {isRenaming && selectedCategory && (
        <form onSubmit={handleRenameCategory} className="flex items-center gap-2">
          <input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            className="rounded border border-black/20 bg-white px-2 py-1 text-sm text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsRenaming(false)}
            className="rounded border border-black/20 px-3 py-1 text-sm"
          >
            Cancel
          </button>
        </form>
      )}

      <form onSubmit={handleAddCategory} className="flex items-center gap-2">
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="rounded border border-black/20 bg-white px-2 py-1 text-sm text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded border border-black/20 px-3 py-1 text-sm disabled:opacity-50"
        >
          + Add category
        </button>
      </form>

      <p className="text-xs text-black/40">Drag items to reorder</p>
      <PackingList initialItems={visibleItems} categories={categories} />

      <AddPackingItemForm
        tripId={tripId}
        categories={categories}
        defaultCategoryId={selectedCategoryId !== "all" ? selectedCategoryId : ""}
      />
    </div>
  );
}
