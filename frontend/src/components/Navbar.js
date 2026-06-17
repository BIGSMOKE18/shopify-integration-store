"use client";

import Link from "next/link";

import {
  useCart,
} from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold text-slate-900"
        >
          ShopHub
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="transition hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 transition hover:text-slate-900"
          >
            Cart
            {totalItems > 0 && (
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
