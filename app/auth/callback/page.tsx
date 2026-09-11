"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) setError("Invite link expired ya invalid hai. Naya invite request karein.");
      setReady(true);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password kam az kam 6 characters ka hona chahiye.");
    if (password !== confirmPassword) return setError("Passwords match nahi kar rahe.");

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) return setError(updateError.message);
    setMessage("Password set ho gaya. Dashboard open ho raha hai...");
    setTimeout(() => router.replace("/"), 900);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef0f2] p-6">
      <section className="w-full max-w-md rounded-[36px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">S</div>
          <h1 className="text-3xl font-semibold">Create your password</h1>
          <p className="mt-2 text-sm text-gray-500">Set a password to access Social Tracker.</p>
        </div>
        {!ready ? <p className="text-center text-sm text-gray-500">Checking invitation...</p> : error && !password ? <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block"><span className="mb-2 block text-sm font-medium">New password</span><span className="flex h-12 items-center gap-3 rounded-2xl bg-[#f5f6f7] px-4 focus-within:ring-2 focus-within:ring-black"><LockKeyhole size={17} className="text-gray-400" /><input type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" /></span></label>
            <label className="block"><span className="mb-2 block text-sm font-medium">Confirm password</span><input type="password" required minLength={6} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="h-12 w-full rounded-2xl bg-[#f5f6f7] px-4 text-sm outline-none focus:ring-2 focus:ring-black" /></label>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            {message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}
            <button type="submit" className="h-12 w-full rounded-2xl bg-black text-sm font-medium text-white hover:bg-neutral-800">Set password</button>
          </form>
        )}
      </section>
    </main>
  );
}
