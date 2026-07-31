function ProductCard({ product }) {

    return (
        <div className="product-card">

            <h2>
                {product.name}
            </h2>

            <p>
                Price: £{product.price}
            </p>

            <p>
                Seller: {product.seller}
            </p>

            <p>
                Status: In Stock
            </p>

            <button>
                View Product
            </button>

        </div>
    )
}

export default ProductCard;