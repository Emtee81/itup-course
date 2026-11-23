import type { ProductFilters } from "@/types";

export default function FilterPanel({
  filters,
  categories,
  onChange,
}: {
  filters: ProductFilters;
  categories: string[];
  onChange: (filters: ProductFilters) => void;
}) {
  return (
    <>
      <label>
        <span>Search products</span>
        <input
          type="search"
          placeholder="Search products..."
          value={filters.search ?? ""}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </label>
      <label>
        <span>Filter by category</span>
        <select
          value={filters.category ?? "all"}
          onChange={(event) => onChange({ ...filters, category: event.target.value })}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
