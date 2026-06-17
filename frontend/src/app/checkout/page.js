"use client";

import Link from "next/link";
import { useState } from "react";

import {
  useCart,
} from "@/context/CartContext";

const inputClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [customer, setCustomer] =
    useState({
      name: "",
      email: "",
      address: "",
    });

  const [orderPlaced, setOrderPlaced] =
    useState(false);
  const [error, setError] =
    useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        item.variants?.nodes?.[0]
          ?.price?.amount ?? 0
      ) *
        item.quantity,
    0
  );

  const placeOrder = () => {
    if (
      !customer.name.trim() ||
      !customer.email.trim() ||
      !customer.address.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    setError("");
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-20">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Order placed
            </h1>
            <p className="mt-3 text-slate-600">
              Thank you for shopping with us.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Checkout
          </h1>
          <p className="mt-2 text-slate-600">
            Enter your details to complete the order.
          </p>
        </header>

        {cart.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">
              Your cart is empty.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Customer details
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={customer.name}
                    placeholder="John Doe"
                    className={inputClassName}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        name:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={customer.email}
                    placeholder="john@example.com"
                    className={inputClassName}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        email:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={4}
                    value={customer.address}
                    placeholder="Street, city, postal code"
                    className={inputClassName}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        address:
                          event.target
                            .value,
                      })
                    }
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Order summary
              </h2>

              <div className="mt-5 space-y-3">
                {cart.map((item) => {
                  const unitPrice =
                    Number(
                      item.variants
                        ?.nodes?.[0]
                        ?.price?.amount ?? 0
                    );

                  return (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <p className="text-slate-600">
                        {item.title}{" "}
                        × {item.quantity}
                      </p>
                      <p className="shrink-0 font-medium text-slate-900">
                        ₹
                        {(
                          unitPrice *
                          item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-between border-t border-slate-200 pt-4">
                <span className="font-semibold text-slate-900">
                  Total
                </span>
                <span className="text-xl font-semibold text-slate-900">
                  ₹
                  {total.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={placeOrder}
                className="mt-6 w-full rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Place order
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
