import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./sign-out-button";
import AddTripForm from "./add-trip-form";
import Timeline from "./timeline";
import PackingProgress from "./packing-progress";
import { formatDate } from "@/utils/format-date";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
    .order("arrival_date", { ascending: true });

  const { data: packingItems } = await supabase
    .from("packing_items")
    .select("trip_id, is_packed");

  const { data: profile } = await supabase
    .from("profiles")
    .select("nationality")
    .eq("id", user.id)
    .maybeSingle();

  function packingProgressFor(tripId) {
    const items = packingItems?.filter((item) => item.trip_id === tripId) ?? [];
    return {
      packed: items.filter((item) => item.is_packed).length,
      total: items.length,
    };
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your trips</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/profile" className="text-sm underline">
            Profile
          </Link>
          <Link href="/dashboard/immunizations" className="text-sm underline">
            Immunization history
          </Link>
          <Link href="/dashboard/vault" className="text-sm underline">
            Vault
          </Link>
          <SignOutButton />
        </div>
      </div>

      {!profile?.nationality && (
        <p className="mb-6 rounded-lg border border-black/10 bg-black/5 p-3 text-sm">
          Set your{" "}
          <Link href="/dashboard/profile" className="underline">
            nationality
          </Link>{" "}
          for more accurate visa guidance on your trips.
        </p>
      )}

      <Timeline trips={trips} />

      <AddTripForm />

      {error && (
        <p className="text-sm text-red-600">
          Couldn&apos;t load trips: {error.message}
        </p>
      )}

      {!error && trips?.length === 0 && (
        <p className="text-sm text-black/60">No trips yet. Add one above.</p>
      )}

      <ul className="space-y-3">
        {trips?.map((trip) => (
          <li key={trip.id}>
            <Link
              href={`/dashboard/trips/${trip.id}`}
              className="block rounded-lg border border-black/10 p-4 hover:bg-black/5"
            >
              <div className="font-medium">
                {trip.city ? `${trip.city}, ${trip.country}` : trip.country}
              </div>
              <div className="text-sm text-black/60">
                {formatDate(trip.arrival_date)} → {formatDate(trip.departure_date)}
              </div>
              {trip.visa_length_days != null && (
                <div className="text-sm text-black/60">
                  Visa: {trip.visa_length_days} days
                </div>
              )}
              <PackingProgress {...packingProgressFor(trip.id)} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
