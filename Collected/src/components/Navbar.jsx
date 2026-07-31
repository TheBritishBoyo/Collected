function Navbar() {
  return (
    <header className="site-header">
      <nav>
        <div className="logo">Collected<span>.</span></div>
        <div className="nav-mid">
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#categories">Categories</a>
            <a href="#sellers">For sellers</a>
          </div>
          <a href="#" className="nav-cta">Sign in</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;