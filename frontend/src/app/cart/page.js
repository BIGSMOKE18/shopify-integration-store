"use client";

import Link from "next/link";

import {
  useCart,
} from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

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

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Shopping Cart
          </h1>
          <p className="mt-2 text-slate-600">
            Review your items before checkout.
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
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cart.map((item) => {
                const price =
                  item.variants
                    ?.nodes?.[0]?.price;
                const unitPrice =
                  Number(
                    price?.amount ?? 0
                  );
                const lineTotal =
                  unitPrice *
                  item.quantity;
                const imageUrl =
                  item.images
                    ?.nodes?.[0]?.url;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-5 sm:p-5"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="h-24 w-24 shrink-0 rounded-lg object-cover sm:h-28 sm:w-28"
                      />
                    ) : (
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400 sm:h-28 sm:w-28">
                        No image
                      </div>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-semibold text-slate-900">
                            {item.title}
                          </h2>
                          {price && (
                            <p className="mt-1 text-sm text-slate-500">
                              {price.currencyCode ===
                              "INR"
                                ? "₹"
                                : "$"}
                              {unitPrice.toLocaleString()}{" "}
                              each
                            </p>
                          )}
                        </div>

                        <p className="shrink-0 font-semibold text-slate-900">
                          ₹
                          {lineTotal.toLocaleString()}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            className="px-3 py-1.5 text-slate-600 transition hover:bg-slate-50"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-8 border-x border-slate-200 px-3 py-1.5 text-center text-sm font-medium text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            className="px-3 py-1.5 text-slate-600 transition hover:bg-slate-50"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Order summary
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>
                    Items (
                    {cart.reduce(
                      (sum, item) =>
                        sum +
                        item.quantity,
                      0
                    )}
                    )
                  </span>
                  <span>
                    ₹
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
                <span className="font-semibold text-slate-900">
                  Total
                </span>
                <span className="text-xl font-semibold text-slate-900">
                  ₹
                  {total.toLocaleString()}
                </span>
              </div>

              <Link href="/checkout">
                <button
                  type="button"
                  className="mt-6 w-full rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
