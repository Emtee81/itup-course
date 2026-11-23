import { Suspense } from "react";
import { connection } from "next/server";
import { categories, getProducts } from "@/lib/products";
import ProductGrid from "./components/ProductGrid";

export default function DashboardPage() {
  return (
    <main>
      <h1>ItUp app</h1>

      <Suspense fallback={<GridSkeleton />}>
        <ProductSection />
      </Suspense>
    </main>
  );
}

async function ProductSection() {
  await connection();
  const initialProducts = await getProducts();
  return <ProductGrid initialProducts={initialProducts} categories={categories} />;
}

function GridSkeleton() {
  return <p>loading</p>;
}
