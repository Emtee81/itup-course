import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p>{product.inStock ? "In stock" : "Out of stock"}</p>
    </article>
  );
}
