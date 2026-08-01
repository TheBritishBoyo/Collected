function About() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">About Collected</div>
            <h2>Built so collectors stop getting burned.</h2>
            <p>
              Collected exists because finding a fair price on the products
              you actually want shouldn't mean juggling a dozen tabs, or
              trusting a seller you've never heard of.
            </p>
          </div>
        </div>
      </section>

      <section className="section verify-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Verification</div>
            <h2>What "verified seller" actually means.</h2>
          </div>
          <ul className="verify-list">
            <li>
              <h3>Business identity check</h3>
              <p>Every seller confirms their registered business details before listing a single product.</p>
            </li>
            <li>
              <h3>Fulfilment track record</h3>
              <p>We monitor delivery times and order accuracy on an ongoing basis, not just at signup.</p>
            </li>
            <li>
              <h3>Transparent ratings</h3>
              <p>Ratings come from completed Collected orders only — no seller can buy or fake their way to the top.</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default About;