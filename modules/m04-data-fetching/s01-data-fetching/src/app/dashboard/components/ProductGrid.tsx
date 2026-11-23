"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Product, ProductFilters } from "@/types";
import FilterPanel from "./FilterPanel";
import ProductCard from "./ProductCard";

async function fetchProducts(url: string): Promise<Product[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export default function ProductGrid({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: string[];
}) {
  const [filters, setFilters] = useState<ProductFilters>({
    category: "all",
    search: "",
  });
  const category = filters.category ?? "all";
  const search = filters.search ?? "";
  const query = new URLSearchParams({ category, search }).toString();
  const { data, error, isValidating, mutate } = useSWR<Product[]>(
    `/api/products?${query}`,
    fetchProducts,
    {
      fallbackData: category === "all" && !search ? initialProducts : undefined,
      keepPreviousData: true,
      revalidateOnFocus: false,
      refreshInterval: 30000,
    },
  );
  const products = data ?? [];

  return (
    <section>
      <div>
        <FilterPanel
          filters={filters}
          categories={categories}
          onChange={setFilters}
        />
        <button type="button" onClick={() => mutate()} disabled={isValidating}>
          {isValidating ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error ? (
        <div role="alert">
          <span>Products couldn’t be updated. Please try again.</span>
          <button type="button" onClick={() => mutate()}>
            Retry
          </button>
        </div>
      ) : (
        <div aria-busy={isValidating}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
