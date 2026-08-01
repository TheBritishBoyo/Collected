import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <Link to="/" className="logo footer-logo">Collected<span>.</span></Link>
        <div className="foot-links">
          <Link to="/#sellers">For sellers</Link>
          <Link to="/about">Trust & verification</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="copyright">© 2026 Collected. Placeholder build.</div>
      </div>
    </footer>
  );
}

export default Footer;