"use client";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      // If Better Auth returns an error object
      if (res?.error) {
        console.error("Auth Error:", res.error.message);
        alert(res.error.message);
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Catch Block Error:", err);
      alert("Server is not responding. Check your terminal!");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-6 bg-zinc-50 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 text-center"
      >
        {/* Logo Icon */}
        <div className="w-20 h-20 bg-pink-50 text-[#E2136E] rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl font-black italic shadow-inner">
          S
        </div>

        <h1 className="text-4xl font-black tracking-tight mb-3">
          Welcome Back!
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed mb-10">
          Sign in to access your **Salami Tracker**, manage sponsors, and see
          total earnings.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-4 bg-white border border-zinc-200 py-4 rounded-2xl font-bold text-zinc-700 hover:bg-zinc-50 active:scale-95 transition shadow-sm disabled:opacity-50 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {/* You can add a Google Icon SVG here */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.14-4.53z"
                fill="#EA4335"
              />
            </svg>
            {loading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>

        <p className="mt-10 text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
          Secure authentication powered by <br /> Better Auth & Neon
        </p>
      </motion.div>
    </main>
  );
}
