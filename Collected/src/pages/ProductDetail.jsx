import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function ProductDetail() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      setStatus("loading");

      const { data, error } = await supabase
        .from("products")
        .select("id, name, categories(name), listings(price, service_fee, in_stock, sellers(name, rating))")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        setStatus("not-found");
        return;
      }

      const sortedListings = [...data.listings].sort((a, b) => a.price - b.price);

      setProduct({
        id: data.id,
        name: data.name,
        category: data.categories?.name ?? "Uncategorized",
      });
      setListings(sortedListings);
      setStatus("ready");
    }

    fetchProduct();
  }, [id]);

  if (status === "loading") {
    return (
      <section className="section">
        <div className="wrap">
          <p className="browse-empty" role="status">Loading product…</p>
        </div>
      </section>
    );
  }

  if (status === "not-found") {
    return (
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Not found</div>
            <h2>We couldn't find that product.</h2>
            <p>It may have been removed, or the link might be incorrect.</p>
          </div>
          <Link to="/browse" className="btn-primary">Back to Browse</Link>
        </div>
      </section>
    );
  }

  const cheapest = listings[0];

  return (
    <section className="section product-detail">
      <div className="wrap">
        <Link to="/browse" className="back-link">← Back to Browse</Link>
        <div className="section-head">
          <div className="eyebrow">{product.category}</div>
          <h2>{product.name}</h2>
        </div>

        <div className="detail-grid">
          <div className="detail-summary">
            {cheapest ? (
              <>
                <div className="amount">${cheapest.price.toFixed(2)}</div>
                <div className="compare">
                  + ${cheapest.service_fee.toFixed(2)} service fee at checkout
                </div>
              </>
            ) : (
              <div className="compare">No sellers currently listing this product.</div>
            )}
          </div>

          <div className="listings-panel">
            <h3>All {listings.length} verified sellers</h3>
            <ul className="listings-list">
              {listings.map((l, i) => (
                <li key={l.sellers.name} className={i === 0 ? "listing cheapest" : "listing"}>
                  <span className="listing-seller">{l.sellers.name}</span>
                  <span className="listing-rating">★ {l.sellers.rating}</span>
                  <span className="listing-stock">{l.in_stock ? "In stock" : "Out of stock"}</span>
                  <span className="listing-price">${l.price.toFixed(2)}</span>
                  {i === 0 && <span className="listing-badge">Cheapest</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;