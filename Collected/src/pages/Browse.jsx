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
        .from("public_product_listings")
        .select("*");

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      const shaped = data.map((p) => ({
        id: p.product_id,
        name: p.product_name,
        category: p.category_name ?? "Uncategorized",
        price: p.price,
        fee: p.service_fee,
        sellerCount: p.seller_count,
        stock: p.in_stock ? "In stock" : "Out of stock",
      }));

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