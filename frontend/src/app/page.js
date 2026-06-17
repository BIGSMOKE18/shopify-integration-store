"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

import {
  getProducts,
} from "@/lib/productService";

export default function Home() {
  const [products, setProducts] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(
        data.data.products.nodes
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) return products;

      return products.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(query) ||
          product.description
            ?.toLowerCase()
            .includes(query)
      );
    }, [products, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Products
          </h1>
          <p className="mt-2 text-slate-600">
            Browse our store collection.
          </p>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search products..."
            className="mt-5 w-full max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </header>

        {loading ? (
          <p className="text-slate-500">
            Loading products...
          </p>
        ) : filteredProducts.length ===
          0 ? (
          <p className="text-slate-500">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(
              (product) => {
                const price =
                  product.priceRange
                    ?.minVariantPrice;
                const imageUrl =
                  product.featuredImage
                    ?.url;
                const description =
                  product.description?.replace(
                    /<[^>]*>/g,
                    ""
                  ) ?? "";

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          product
                            .featuredImage
                            ?.altText ||
                          product.title
                        }
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-slate-100 text-sm text-slate-400">
                        No image
                      </div>
                    )}

                    <div className="p-4">
                      <h2 className="font-semibold text-slate-900">
                        {product.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {description ||
                          "View product details."}
                      </p>

                      {price && (
                        <p className="mt-3 font-semibold text-slate-900">
                          {price.currencyCode ===
                          "INR"
                            ? "₹"
                            : "$"}
                          {Number(
                            price.amount
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}
