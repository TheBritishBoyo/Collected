import stats from "../data/stats";

function TrustBand() {
  return (
    <section className="trust-band">
      <div className="wrap">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="num">{stat.value}</span>
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBand;