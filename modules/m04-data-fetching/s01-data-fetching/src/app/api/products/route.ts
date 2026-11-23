import { NextRequest, NextResponse } from "next/server";
import { filterProducts } from "@/lib/products";
import type { ProductFilters } from "@/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters: ProductFilters = {
    category: searchParams.get("category") ?? "all",
    search: searchParams.get("search") ?? "",
  };

  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(filterProducts(filters));
}
