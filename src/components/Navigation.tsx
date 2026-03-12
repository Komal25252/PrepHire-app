"use client";

import Link from "next/link";
import { BarChart3, Menu, LogOut, User } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    const handleOpenAuthModal = () => setShowAuthModal(true);
    window.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => window.removeEventListener('openAuthModal', handleOpenAuthModal);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8" />
            <span className="text-2xl font-bold">PrepHire</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/prepare" className="hover:text-blue-100 transition">
              Prepare
            </Link>
            <Link href="/dashboard" className="hover:text-blue-100 transition">
              Dashboard
            </Link>

            {status === "loading" ? (
              <div className="w-24 h-8 bg-blue-400/50 animate-pulse rounded-md" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:text-blue-100 transition focus:outline-none"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white/50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/50">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <span className="font-medium hidden lg:block">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 hover:text-red-600 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-50 transition shadow-sm"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  PrepHire
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? "Create an account" : "Welcome back"}
              </h1>
              <p className="text-gray-500 text-center">
                {isSignUp
                  ? "Sign up to start your AI interview preparation"
                  : "Log in to continue your interview preparation"}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => signIn("google", { callbackUrl: window.location.pathname })}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
