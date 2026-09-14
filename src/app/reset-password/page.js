"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(
        error.message.includes("session")
          ? "This reset link has expired or was already used — request a new one from the sign-in page."
          : error.message
      );
    } else {
      setDone(true);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 text-black">
      <div className="w-full max-w-sm space-y-4 rounded-lg border border-black/10 p-6">
        <h1 className="text-xl font-semibold">Set a new password</h1>

        {done ? (
          <>
            <p className="text-sm text-black/70">
              Your password has been updated.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full rounded bg-black py-2 text-white"
            >
              Go to your dashboard
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="new-password" className="text-sm font-medium">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
              />
            </div>

            {message && <p className="text-sm text-red-600">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save new password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
