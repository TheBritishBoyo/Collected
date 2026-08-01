import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subStatus, setSubStatus] = useState("idle");

  useEffect(() => {
    async function fetchProduct() {
      setStatus("loading");

      const { data, error } = await supabase
        .from("public_product_listings")
        .select("*")
        .eq("product_id", id)
        .maybeSingle();

      if (error || !data) {
        setStatus("not-found");
        return;
      }

      setProduct(data);
      setStatus("ready");
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function checkSubscription() {
      if (!user || !product) return;
      const { data } = await supabase
        .from("stock_notifications")
        .select("id")
        .eq("product_id", product.product_id)
        .eq("user_id", user.id)
        .maybeSingle();
      setSubscribed(!!data);
    }
    checkSubscription();
  }, [user, product]);

  async function handleSubscribe() {
    setSubStatus("loading");
    const { error } = await supabase
      .from("stock_notifications")
      .insert({ product_id: product.product_id, user_id: user.id });

    if (!error) setSubscribed(true);
    setSubStatus("idle");
  }

  async function handleUnsubscribe() {
    setSubStatus("loading");
    const { error } = await supabase
      .from("stock_notifications")
      .delete()
      .eq("product_id", product.product_id)
      .eq("user_id", user.id);

    if (!error) setSubscribed(false);
    setSubStatus("idle");
  }

  if (status === "loading") {
    return (
      <section className="section">
        <div className="wrap">
          <p className="browse-empty" role="status">Loading product…</p>
        </div>
      </section>
    );
  }

  if (status === "not-found") {
    return (
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Not found</div>
            <h2>We couldn't find that product.</h2>
            <p>It may have been removed, or the link might be incorrect.</p>
          </div>
          <Link to="/browse" className="btn-primary">Back to Browse</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section product-detail">
      <div className="wrap">
        <Link to="/browse" className="back-link">← Back to Browse</Link>
        <div className="section-head">
          <div className="eyebrow">{product.category_name}</div>
          <h2>{product.product_name}</h2>
        </div>

        <div className="detail-summary" style={{ maxWidth: "420px" }}>
          {product.in_stock ? (
            <>
              <div className="amount">${product.price.toFixed(2)}</div>
              <div className="compare">
                + ${product.service_fee.toFixed(2)} service fee at checkout
              </div>
              <div className="pc-meta" style={{ marginTop: "16px" }}>
                <span className="pc-stock in">In stock</span>
                <span>Compared across {product.seller_count} verified sellers</span>
              </div>
            </>
          ) : (
            <>
              <div className="compare">Currently out of stock across all verified sellers.</div>

              {!user && (
                <Link to="/sign-in" className="btn-secondary" style={{ marginTop: "20px", display: "inline-block" }}>
                  Sign in to get notified
                </Link>
              )}

              {user && !subscribed && (
                <button
                  className="btn-primary"
                  style={{ marginTop: "20px" }}
                  disabled={subStatus === "loading"}
                  onClick={handleSubscribe}
                >
                  {subStatus === "loading" ? "Please wait…" : "Notify me when back in stock"}
                </button>
              )}

              {user && subscribed && (
                <div style={{ marginTop: "20px" }}>
                  <p className="cta-success" style={{ marginBottom: "10px" }}>
                    You'll be notified when this is back in stock.
                  </p>
                  <button
                    className="auth-switch"
                    disabled={subStatus === "loading"}
                    onClick={handleUnsubscribe}
                  >
                    Remove notification
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;