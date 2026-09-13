import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AddImmunizationForm from "./add-immunization-form";
import ImmunizationRow from "./immunization-row";

export default async function ImmunizationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: immunizations }, { data: documents }] = await Promise.all([
    supabase.from("immunizations").select("*").order("vaccine_name"),
    supabase.from("documents").select("id, title, file_path").order("created_at"),
  ]);

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <Link href="/dashboard" className="text-sm text-black/60 underline">
        ← Back to trips
      </Link>

      <h1 className="mt-2 text-xl font-semibold">Your immunization history</h1>
      <p className="mb-6 text-sm text-black/60">
        This list is global across all your trips — log a vaccine here once and every
        trip&apos;s recommendations will know you already have it.
      </p>

      <ul className="mb-4 space-y-1 text-sm">
        {immunizations?.length === 0 && <li className="text-black/60">None logged yet</li>}
        {immunizations?.map((immunization) => (
          <ImmunizationRow
            key={immunization.id}
            immunization={immunization}
            documents={documents ?? []}
          />
        ))}
      </ul>

      <AddImmunizationForm documents={documents ?? []} />
    </div>
  );
}
