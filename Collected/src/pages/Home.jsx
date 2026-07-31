import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {

    return (

        <div>

            <h1>
                Collected
            </h1>

            <div>

                {
                    products.map(product => (

                        <ProductCard>
                            key={product.id}
                            product={product}
                        </ProductCard>

                    ))
                }

            </div>

        </div>

    )

}

export default Home;