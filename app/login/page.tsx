"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Email ya password incorrect hai. Dobara check karein.");
      setLoading(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef0f2] p-6">
      <section className="w-full max-w-md rounded-[36px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10">
        <div className="mb-9">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">S</div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to your social tracker.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Email</span>
            <span className="flex h-12 items-center gap-3 rounded-2xl bg-[#f5f6f7] px-4 focus-within:ring-2 focus-within:ring-black">
              <Mail size={17} className="text-gray-400" />
              <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full bg-transparent text-sm outline-none" />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Password</span>
            <span className="flex h-12 items-center gap-3 rounded-2xl bg-[#f5f6f7] px-4 focus-within:ring-2 focus-within:ring-black">
              <LockKeyhole size={17} className="text-gray-400" />
              <input type="password" required minLength={6} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full bg-transparent text-sm outline-none" />
            </span>
          </label>

          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>
      </section>
    </main>
  );
}
