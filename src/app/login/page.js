"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("sign-in"); // "sign-in" | "sign-up" | "forgot-password"
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else if (mode === "sign-up") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Account created! Check your email to confirm, then sign in.");
        setMode("sign-in");
      }
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email for a link to reset your password.");
      }
    }

    setLoading(false);
  }

  const titles = {
    "sign-in": "Sign in",
    "sign-up": "Create an account",
    "forgot-password": "Reset your password",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border border-black/10 p-6"
      >
        <h1 className="text-xl font-semibold">{titles[mode]}</h1>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
          />
        </div>

        {mode !== "forgot-password" && (
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-black/20 bg-white px-3 py-2 text-black"
            />
          </div>
        )}

        {message && <p className="text-sm text-red-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
        >
          {loading
            ? "Please wait…"
            : mode === "sign-in"
              ? "Sign in"
              : mode === "sign-up"
                ? "Sign up"
                : "Send reset link"}
        </button>

        {mode === "sign-in" && (
          <button
            type="button"
            onClick={() => {
              setMode("forgot-password");
              setMessage("");
            }}
            className="w-full text-sm text-black/60 underline"
          >
            Forgot password?
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
            setMessage("");
          }}
          className="w-full text-sm text-black/60 underline"
        >
          {mode === "sign-up"
            ? "Already have an account? Sign in"
            : mode === "forgot-password"
              ? "Back to sign in"
              : "Need an account? Sign up"}
        </button>
      </form>
    </div>
  );
}
