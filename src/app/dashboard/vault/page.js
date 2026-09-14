import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DocumentRow from "../trips/[id]/document-row";
import AddDocumentForm from "../trips/[id]/add-document-form";

export default async function VaultPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .is("trip_id", null)
    .order("created_at");

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <Link href="/dashboard" className="text-sm text-black/60 underline">
        ← Back to trips
      </Link>

      <h1 className="mt-2 text-xl font-semibold">Vault</h1>
      <p className="mb-6 text-sm text-black/60">
        Documents here are not tied to any one trip — passport copies, insurance
        policies, IDs, anything you would want to reach even if everything you
        packed got lost or stolen. Trip-specific things like tickets belong on
        that trip&apos;s Docs tab instead.
      </p>

      <ul className="mb-4 space-y-1 text-sm">
        {documents?.length === 0 && <li className="text-black/60">Nothing here yet</li>}
        {documents?.map((doc) => (
          <DocumentRow key={doc.id} doc={doc} />
        ))}
      </ul>

      <AddDocumentForm />
    </div>
  );
}
