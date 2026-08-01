import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

const categoryFilters = ["All", "Pokémon Cards", "Booster Boxes", "Figures", "Sealed Product"];

function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      setStatus("loading");
      const { data, error } = await supabase
        .from("products")
        .select("id, name, categories(name), listings(price, service_fee, in_stock)");

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      const shaped = data.map((p) => {
        const inStockListings = p.listings.filter((l) => l.in_stock);
        const cheapest = inStockListings.length
          ? inStockListings.reduce((min, l) => (l.price < min.price ? l : min))
          : null;

        return {
          id: p.id,
          name: p.name,
          category: p.categories?.name ?? "Uncategorized",
          price: cheapest ? cheapest.price : null,
          fee: cheapest ? cheapest.service_fee : 0,
          sellerCount: p.listings.length,
          stock: inStockListings.length ? "In stock" : "Out of stock",
        };
      });

      setProducts(shaped);
      setStatus("ready");
    }

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

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

        {status === "loading" && <p className="browse-empty" role="status">Loading products…</p>}
        {status === "error" && <p className="browse-empty">Something went wrong loading products.</p>}
        {status === "ready" && filtered.length === 0 && (
          <p className="browse-empty">No products match your search.</p>
        )}
        {status === "ready" && filtered.length > 0 && (
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