"use client";

import Link from "next/link";
import {
  use,
  useEffect,
  useState,
} from "react";

import {
  getProduct,
} from "@/lib/productService";

import {
  useCart,
} from "@/context/CartContext";

export default function ProductPage({
  params,
}) {
  const resolvedParams = use(params);

  const [product, setProduct] =
    useState(null);
  const [loading, setLoading] =
    useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [resolvedParams.handle]);

  const loadProduct = async () => {
    try {
      const data = await getProduct(
        resolvedParams.handle
      );

      setProduct(
        data.data.product
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-slate-500">
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-slate-500">
            Product not found.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const price =
    product.variants?.nodes?.[0]
      ?.price;
  const images =
    product.images?.nodes ?? [];
  const description =
    product.description?.replace(
      /<[^>]*>/g,
      ""
    ) ?? "";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          ← Back to products
        </Link>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="bg-slate-100">
              {images.length > 0 ? (
                <img
                  src={images[0].url}
                  alt={product.title}
                  className="h-full w-full max-h-[480px] object-cover"
                />
              ) : (
                <div className="flex h-80 items-center justify-center text-sm text-slate-400">
                  No image
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <h1 className="text-3xl font-bold text-slate-900">
                {product.title}
              </h1>

              {price && (
                <p className="mt-4 text-2xl font-semibold text-slate-900">
                  {price.currencyCode ===
                  "INR"
                    ? "₹"
                    : "$"}
                  {Number(
                    price.amount
                  ).toLocaleString()}
                </p>
              )}

              <p className="mt-6 flex-1 text-sm leading-relaxed text-slate-600">
                {description ||
                  "No description available."}
              </p>

              <button
                type="button"
                onClick={() =>
                  addToCart(product)
                }
                className="mt-8 w-full rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
