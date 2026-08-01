import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const inStock = product.stock === "In stock";

  return (
    <div className="product-card">
      <div className="product-card-top">
        <span className="pc-category">{product.category}</span>
        <span className={`pc-stock ${inStock ? "in" : "low"}`}>
          {product.stock}
        </span>
      </div>
      <h3>{product.name}</h3>

      {inStock ? (
        <div className="pc-price-row">
          <span className="pc-price">${product.price.toFixed(2)}</span>
          <span className="pc-fee">+ ${product.fee.toFixed(2)} fee</span>
        </div>
      ) : (
        <div className="pc-price-row">
          <span className="pc-fee">No sellers currently in stock</span>
        </div>
      )}

      <div className="pc-meta">
        <span>Compared across {product.sellerCount} sellers</span>
      </div>
      <Link to={`/product/${product.id}`} className="btn-secondary pc-btn">
        View listing
      </Link>
    </div>
  );
}

export default ProductCard;