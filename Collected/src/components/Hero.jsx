import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Live across 40+ verified retailers</div>
          <h1>
            Every drop.<br />
            One <span className="holo-text">binder</span>.<br />
            The lowest verified price.
          </h1>
          <p className="lead">
            Collected watches every trusted retailer for the cards, boxes, and
            figures you're after — and always shows you the cheapest one still
            in stock.
          </p>
          <div className="hero-actions">
            <Link to="/browse" className="btn-primary">Start searching</Link>
            <a href="#how" className="btn-secondary">See how it works</a>
          </div>
          <div className="trust-row">
            <span><strong>0%</strong> markup hidden — fee shown up front</span>
            <span><strong>Verified</strong> sellers only</span>
          </div>
        </div>

        <div className="binder">
          <div className="slot s1" aria-hidden="true"></div>
          <div className="slot s2" aria-hidden="true"></div>
          <div className="slot s3" aria-hidden="true"></div>
          <div className="price-card holo-border">
            <div className="pc-label">Booster Box · Sealed</div>
            <h3>Charizard ex Collection</h3>
            <div className="amount">$89.99</div>
            <div className="compare">+ $2.50 service fee at checkout</div>
            <div className="seller-count">Cheapest of 12 verified sellers</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;