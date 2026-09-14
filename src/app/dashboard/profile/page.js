import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-white p-6 text-black">
      <Link href="/dashboard" className="text-sm text-black/60 underline">
        ← Back to trips
      </Link>

      <h1 className="mt-2 mb-2 text-xl font-semibold">Your profile</h1>
      <p className="mb-6 text-sm text-black/60">
        Your nationality determines which visa rules actually apply to you — the
        Docs section on each trip uses this to personalize its disclaimers.
      </p>

      <ProfileForm userId={user.id} initialProfile={profile} />
    </div>
  );
}
