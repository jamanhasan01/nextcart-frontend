"use client";

import Link from "next/link";
import {
  ShoppingBag,
  User,
  LayoutDashboard,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "@/hooks/auth/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useCart } from "@/hooks/cart/userCart";

export default function Navbar() {
  const { me, isLoading, logout } = useAuth();
  const { data } = useCart();
  const items = data?.items || [];

  if (isLoading) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-10 py-8 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Nexus<span className="text-blue-600">Tech</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/">Home</Link>
          <Link href="/products">All Product</Link> 
          <Link href="/orders">My Orders</Link>
        </nav>

        <div className="flex items-center ">
          {me ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={me.avatar} alt={me.name} />
                  <AvatarFallback>
                    {me.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <p className="font-medium">Hi, {me.name} 👋</p>
                <p className="text-xs font-normal text-muted-foreground">
                  {me.email}
                </p>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  }
                ></DropdownMenuItem>

                <DropdownMenuItem
                  render={
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  }
                ></DropdownMenuItem>

                <DropdownMenuItem
                  render={
                    <Link href="/orders">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  }
                ></DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    logout();
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}

          <Link href="/cart" className="relative rounded-md p-2 hover:bg-muted">
            <ShoppingBag className="h-5 w-5" />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {items.length || 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
