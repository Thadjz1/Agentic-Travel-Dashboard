import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AddDocumentForm from "./add-document-form";
import AddVaccineForm from "./add-vaccine-form";
import AddPackingItemForm from "./add-packing-item-form";
import AddBudgetItemForm from "./add-budget-item-form";
import DeleteItemButton from "./delete-item-button";

export default async function TripDetailPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (!trip) {
    notFound();
  }

  const [{ data: documents }, { data: vaccines }, { data: packingItems }, { data: budgetItems }] =
    await Promise.all([
      supabase.from("documents").select("*").eq("trip_id", id),
      supabase.from("vaccines").select("*").eq("trip_id", id),
      supabase.from("packing_items").select("*").eq("trip_id", id),
      supabase.from("budget_items").select("*").eq("trip_id", id),
    ]);

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <Link href="/dashboard" className="text-sm text-black/60 underline">
        ← Back to trips
      </Link>

      <h1 className="mt-2 mb-6 text-xl font-semibold">
        {trip.city ? `${trip.city}, ${trip.country}` : trip.country}
        <span className="ml-2 text-sm font-normal text-black/60">
          {trip.arrival_date} → {trip.departure_date}
        </span>
      </h1>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Docs</h2>
        <ul className="space-y-1 text-sm">
          {documents?.length === 0 && <li className="text-black/60">None yet</li>}
          {documents?.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-2">
              <span>
                {doc.title}
                {doc.doc_type && <span className="text-black/60"> — {doc.doc_type}</span>}
              </span>
              <DeleteItemButton table="documents" id={doc.id} />
            </li>
          ))}
        </ul>
        <AddDocumentForm tripId={id} />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Health</h2>
        <ul className="space-y-1 text-sm">
          {vaccines?.length === 0 && <li className="text-black/60">None yet</li>}
          {vaccines?.map((vaccine) => (
            <li key={vaccine.id} className="flex items-center justify-between gap-2">
              <span>
                {vaccine.name}
                {vaccine.required_by_date && (
                  <span className="text-black/60"> — needed by {vaccine.required_by_date}</span>
                )}
              </span>
              <DeleteItemButton table="vaccines" id={vaccine.id} />
            </li>
          ))}
        </ul>
        <AddVaccineForm tripId={id} />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Packing</h2>
        <ul className="space-y-1 text-sm">
          {packingItems?.length === 0 && <li className="text-black/60">None yet</li>}
          {packingItems?.map((packingItem) => (
            <li key={packingItem.id} className="flex items-center justify-between gap-2">
              <span>
                {packingItem.is_packed ? "✅" : "⬜"} {packingItem.item}
              </span>
              <DeleteItemButton table="packing_items" id={packingItem.id} />
            </li>
          ))}
        </ul>
        <AddPackingItemForm tripId={id} />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Budget</h2>
        <ul className="space-y-1 text-sm">
          {budgetItems?.length === 0 && <li className="text-black/60">None yet</li>}
          {budgetItems?.map((budgetItem) => (
            <li key={budgetItem.id} className="flex items-center justify-between gap-2">
              <span>
                {budgetItem.category}
                {budgetItem.planned_amount != null && (
                  <span className="text-black/60"> — ${budgetItem.planned_amount}</span>
                )}
              </span>
              <DeleteItemButton table="budget_items" id={budgetItem.id} />
            </li>
          ))}
        </ul>
        <AddBudgetItemForm tripId={id} />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Explore</h2>
        <p className="text-sm text-black/60">Coming soon.</p>
      </section>
    </div>
  );
}
