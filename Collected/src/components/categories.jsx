import categories from "../data/categories";

function Categories() {
  return (
    <section className="section" id="categories">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Browse by category</div>
          <h2>Built for what collectors actually chase.</h2>
        </div>
        <div className="cat-grid">
          {categories.map((cat) => (
            <div className="cat-card" key={cat.name}>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;