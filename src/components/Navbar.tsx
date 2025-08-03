"use client";

import { sora } from "@/lib/fonts";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Loading from "./Loading";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SimpleUserInfo } from "./SimpleUserInfo";

function Navbar() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<{
    name?: string;
    email?: string;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Hide navbar on auth routes
  const shouldHideNavbar = pathname === "/sign-in" || pathname === "/sign-up";

  const handleLogOut = async () => {
    setLoading(true);
    try {
      setUser(null);
    } catch (error: any) {
      alert(error?.message || "Not logged in");
    } finally {
      setLoading(false);
    }
  };

  const handleRandomClick = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/random", { cache: "no-store" });
      const data = await res.json();
      if (data?.data?.id) {
        router.push(`/manga/${data.data.id}`);
      } else {
        alert("Failed to fetch random manga");
      }
    } catch {
      alert("Failed to fetch random manga");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Don't render navbar on auth routes
  if (shouldHideNavbar) {
    return null;
  }

  return (
    <div>
      <nav
        className={`fixed top-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 w-auto sm:w-[95vw] sm:max-w-3xl p-3 sm:px-8 sm:py-4 bg-black/70 border border-white/20 rounded-full shadow-xl backdrop-blur-md flex items-center justify-end sm:justify-between ${sora.className}`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-x-6 justify-center w-full">
          <Link
            href="/"
            className="text-white hover:text-blue-400 transition-colors font-semibold text-sm sm:text-lg px-2 py-1 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-white hover:text-blue-400 transition-colors font-semibold text-sm sm:text-lg px-2 py-1 rounded-md"
          >
            Search
          </Link>
          <Link
            href="/tags"
            className="text-white hover:text-blue-400 transition-colors font-semibold text-sm sm:text-lg px-2 py-1 rounded-md"
          >
            Tags
          </Link>
          <a
            href="#"
            onClick={handleRandomClick}
            className={`text-white hover:text-blue-400 transition-colors font-semibold text-sm sm:text-lg px-2 py-1 rounded-md ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <div className="flex w-full opacity-60 pointer-events-none">
                <Loading message="Random Manga" />
              </div>
            ) : (
              "Random Manga"
            )}
          </a>
          <SignedIn>
            <SimpleUserInfo />
          </SignedIn>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden w-full flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Open menu"
              >
                <MoreHorizontal size={22} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-44 bg-black/70 backdrop-blur-md text-white border border-white/10 rounded-xl shadow-2xl p-2 space-y-1"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/"
                  className="block w-full px-3 py-2 rounded-md hover:bg-white/10 hover:text-blue-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/search"
                  className="block w-full px-3 py-2 rounded-md hover:bg-white/10 hover:text-blue-400 transition-colors text-sm"
                >
                  Search
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tags"
                  className="block w-full px-3 py-2 rounded-md hover:bg-white/10 hover:text-blue-400 transition-colors text-sm"
                >
                  Tags
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRandomClick}
                className="block w-full px-3 py-2 rounded-md hover:bg-white/10 hover:text-blue-400 transition-colors text-sm cursor-pointer"
              >
                {loading ? <Loading message="Random Manga" /> : "Random Manga"}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/user"
                  className="block w-full px-3 py-2 rounded-md hover:bg-white/10 hover:text-blue-400 transition-colors text-sm"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
