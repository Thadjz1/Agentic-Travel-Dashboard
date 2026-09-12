import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AddDocumentForm from "./add-document-form";
import AddVaccineForm from "./add-vaccine-form";
import AddBudgetItemForm from "./add-budget-item-form";
import DocumentRow from "./document-row";
import VaccineRow from "./vaccine-row";
import PackingSection from "./packing-section";
import VaccineRecommendations from "./vaccine-recommendations";
import BudgetRow from "./budget-row";
import TripHeader from "./trip-header";
import PackingProgress from "@/app/dashboard/packing-progress";

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

  const [
    { data: documents },
    { data: vaccines },
    { data: packingItems },
    { data: packingCategories },
    { data: budgetItems },
  ] = await Promise.all([
    supabase.from("documents").select("*").eq("trip_id", id).order("created_at"),
    supabase.from("vaccines").select("*").eq("trip_id", id).order("created_at"),
    supabase
      .from("packing_items")
      .select("*")
      .eq("trip_id", id)
      .order("position", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true }),
    supabase.from("packing_categories").select("*").eq("trip_id", id).order("created_at"),
    supabase.from("budget_items").select("*").eq("trip_id", id).order("created_at"),
  ]);

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <Link href="/dashboard" className="text-sm text-black/60 underline">
        ← Back to trips
      </Link>

      <div className="mt-2">
        <TripHeader trip={trip} />
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/60">
        <span>{documents?.length ?? 0} documents</span>
        <span>{vaccines?.length ?? 0} vaccines logged</span>
        <PackingProgress
          packed={packingItems?.filter((item) => item.is_packed).length ?? 0}
          total={packingItems?.length ?? 0}
        />
      </div>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Docs</h2>
        <ul className="space-y-1 text-sm">
          {documents?.length === 0 && <li className="text-black/60">None yet</li>}
          {documents?.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </ul>
        <AddDocumentForm tripId={id} />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Health</h2>

        <VaccineRecommendations
          tripId={id}
          country={trip.country}
          arrivalDate={trip.arrival_date}
          existingVaccines={vaccines ?? []}
        />

        <h3 className="pt-2 text-sm font-medium text-black/60">Your list</h3>
        <ul className="space-y-1 text-sm">
          {vaccines?.length === 0 && <li className="text-black/60">None yet</li>}
          {vaccines?.map((vaccine) => (
            <VaccineRow key={vaccine.id} vaccine={vaccine} />
          ))}
        </ul>
        <AddVaccineForm tripId={id} />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Packing</h2>
        <PackingSection
          tripId={id}
          initialItems={packingItems ?? []}
          initialCategories={packingCategories ?? []}
        />
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="font-medium">Budget</h2>
        <ul className="space-y-1 text-sm">
          {budgetItems?.length === 0 && <li className="text-black/60">None yet</li>}
          {budgetItems?.map((budgetItem) => (
            <BudgetRow key={budgetItem.id} budgetItem={budgetItem} />
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
