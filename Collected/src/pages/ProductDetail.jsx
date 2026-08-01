import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

const sellerNames = [
  "CardVault UK", "MintCondition Co", "PokéSupply Direct", "TrueCollector",
  "SealedStock", "GradeOne Games", "RetroPack Retail", "NorthStar Hobbies",
  "PrimeCollectibles", "ChaseTheSet", "BoosterBase", "TCG Outpost",
];

function generateListings(product) {
  return Array.from({ length: product.sellerCount }, (_, i) => {
    const markup = i === 0 ? 0 : Math.round((i * 1.5 + Math.random() * 3) * 100) / 100;
    return {
      seller: sellerNames[i % sellerNames.length],
      price: Math.round((product.price + markup) * 100) / 100,
      rating: Math.max(3.5, Math.round((product.rating - i * 0.05) * 10) / 10),
      inStock: i < product.sellerCount - 1 || product.stock === "In stock",
    };
  }).sort((a, b) => a.price - b.price);
}

function ProductDetail() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setStatus("loading");
    const timer = setTimeout(() => {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setListings(generateListings(found));
        setStatus("ready");
      } else {
        setStatus("not-found");
      }
    }, 400);

    return () => clearTimeout(timer);
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
            <div className="amount">${product.price.toFixed(2)}</div>
            <div className="compare">
              + ${product.fee.toFixed(2)} service fee at checkout
            </div>
            <div className="pc-meta" style={{ marginTop: "16px" }}>
              <span>★ {product.rating}</span>
              <span className={product.stock === "In stock" ? "pc-stock in" : "pc-stock low"}>
                {product.stock}
              </span>
            </div>
          </div>

          <div className="listings-panel">
            <h3>All {listings.length} verified sellers</h3>
            <ul className="listings-list">
              {listings.map((l, i) => (
                <li key={l.seller} className={i === 0 ? "listing cheapest" : "listing"}>
                  <span className="listing-seller">{l.seller}</span>
                  <span className="listing-rating">★ {l.rating}</span>
                  <span className="listing-stock">
                    {l.inStock ? "In stock" : "Out of stock"}
                  </span>
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