"use client";

import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { ShoppingBag, User as UserIcon, LogOut } from "lucide-react";

export default function Navbar() {
  const { cart, user, logoutUser } = useShop();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 container justify-between items-center py-0">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-950"
        >
          Nexus<span className="text-blue-600">Tech</span>
        </Link>

        <nav className="hidden md:flex space-x-8 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition">
            Catalog
          </Link>
          <Link href="/orders" className="hover:text-slate-900 transition">
            My Orders
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-600 hidden sm:inline">
                Hi, <strong className="text-slate-800">{user.name}</strong>
              </span>
              <button
                onClick={logoutUser}
                className="flex items-center gap-1 border border-slate-200 text-slate-700 rounded-md px-2.5 py-1.5 hover:bg-slate-50 transition font-semibold"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 border border-slate-200 text-slate-700 rounded-md px-3 py-1.5 hover:bg-slate-50 transition text-xs font-semibold"
            >
              <UserIcon size={13} />
              <span>Login</span>
            </Link>
          )}

          <Link
            href="/cart"
            className="relative p-2 text-slate-700 hover:text-slate-900 transition"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
