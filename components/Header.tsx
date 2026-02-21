"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if the user is strictly logged in (not an anonymous guest)
  const isRealUser = session && !session.user.isAnonymous;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo - Navigates Home */}
        <Link
          href="/"
          className="font-black text-2xl tracking-tighter flex items-center gap-1 group"
        >
          Eidi
          <span className="text-[#E2136E] group-hover:rotate-12 transition-transform">
            Pay
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Dashboard is only visible to real authenticated users */}
          {isRealUser && (
            <Link
              href="/dashboard"
              className="text-sm font-bold text-zinc-600 hover:text-black transition"
            >
              Dashboard
            </Link>
          )}

          {/* Auth Button Logic */}
          {!isPending &&
            (isRealUser ? (
              <button
                onClick={handleLogout}
                className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800 transition shadow-sm cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#E2136E] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 transition shadow-sm"
              >
                Login to Track
              </Link>
            ))}
        </div>

        {/* Mobile Menu Button - Optimized for Redmi Note 14 */}
        <button
          className="md:hidden p-2 rounded-lg bg-zinc-50 border border-zinc-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-1.5">
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></div>
          </div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="font-bold text-zinc-600"
          >
            Generate Link
          </Link>

          {isRealUser && (
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="font-bold text-zinc-600"
            >
              Dashboard
            </Link>
          )}

          <hr className="border-zinc-100" />

          {isRealUser ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-left font-bold text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="font-bold text-[#E2136E]"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
