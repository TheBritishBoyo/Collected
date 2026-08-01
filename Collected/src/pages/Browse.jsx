import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const categoryFilters = ["All", "Pokémon Cards", "Booster Boxes", "Figures", "Sealed Product"];

function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="section browse-page">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Browse</div>
          <h2>Find it. Compare it. Buy the cheapest one.</h2>
        </div>

        <div className="browse-controls">
          <input
            type="text"
            className="browse-search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <div className="browse-chips">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                className={`chip ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="browse-empty">No products match your search.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Browse;