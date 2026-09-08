import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "./sign-out-button";
import AddTripForm from "./add-trip-form";

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

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your trips</h1>
        <SignOutButton />
      </div>

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
          <li
            key={trip.id}
            className="rounded-lg border border-black/10 p-4"
          >
            <div className="font-medium">
              {trip.city ? `${trip.city}, ${trip.country}` : trip.country}
            </div>
            <div className="text-sm text-black/60">
              {trip.arrival_date} → {trip.departure_date}
            </div>
            {trip.visa_length_days != null && (
              <div className="text-sm text-black/60">
                Visa: {trip.visa_length_days} days
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
