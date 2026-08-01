import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav>
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          Collected<span>.</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-mid ${open ? "open" : ""}`}>
          <div className="nav-links">
            <NavLink to="/browse" onClick={() => setOpen(false)}>Browse</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <Link to="/#how" onClick={() => setOpen(false)}>How it works</Link>
          </div>
          <Link to="/sign-in" className="nav-cta" onClick={() => setOpen(false)}>
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;