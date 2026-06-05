"use client";

import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/all_rooms" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
              All Rooms
            </Link>
            {!isPending && session && (
              <>
                <Link href="/all_rooms/add" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
                  Add Room
                </Link>
                <Link href="/yourrooms" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
                  My Booking
                </Link>
                <Link href="/listing" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
                  My Listings
                </Link>
              </>
            )}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-20 h-9 bg-slate-100 rounded-full animate-pulse" />
            ) : !session ? (
              <>
                <Link href="/login" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link href="/register">
                  <Button color="primary" className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold truncate max-w-[100px]">
                      {session?.user?.name}
                    </p>
                    <p className="text-[10px] text-slate-500">Student</p>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">{session?.user?.name}</p>
                    <p className="text-xs truncate text-slate-500">{session?.user?.email}</p>
                  </div>
                  <Link href="/listing" className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> My Listings
                  </Link>
                  <Link href="/yourrooms" className="px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <CalendarCheck className="w-4 h-4" /> My Bookings
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <Link href="/" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
            Home
          </Link>
          <Link href="/all_rooms" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
            All Rooms
          </Link>

          {!isPending && session && (
            <>
              <Link href="/all_rooms/add" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
                Add Room
              </Link>
              <Link href="/yourrooms" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
                My Bookings
              </Link>
              <Link href="/listing" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">
                My Listings
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-slate-200 mt-4">
            {isPending ? (
              <div className="w-full h-10 bg-slate-100 rounded-xl animate-pulse" />
            ) : !session ? (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" className="w-full">
                  <Button variant="bordered" className="w-full rounded-xl">Login</Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button color="primary" className="w-full rounded-xl">Register</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="px-4 py-3 bg-slate-50 rounded-xl mb-2">
                  <p className="font-bold text-sm">{session?.user?.name}</p>
                  <p className="text-xs text-slate-500">{session?.user?.email}</p>
                </div>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}