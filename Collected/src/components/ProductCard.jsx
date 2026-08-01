function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-top">
        <span className="pc-category">{product.category}</span>
        <span className={`pc-stock ${product.stock === "In stock" ? "in" : "low"}`}>
          {product.stock}
        </span>
      </div>
      <h3>{product.name}</h3>
      <div className="pc-price-row">
        <span className="pc-price">${product.price.toFixed(2)}</span>
        <span className="pc-fee">+ ${product.fee.toFixed(2)} fee</span>
      </div>
      <div className="pc-meta">
        <span>★ {product.rating}</span>
        <span>Cheapest of {product.sellerCount} sellers</span>
      </div>
      <button className="btn-secondary pc-btn">View listing</button>
    </div>
  );
}

export default ProductCard;