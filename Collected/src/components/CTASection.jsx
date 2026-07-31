import { useState } from "react";

function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="cta-section" id="sellers">
      <div className="wrap">
        <div className="cta-box holo-border">
          <h2>Get notified the moment we launch.</h2>
          <p>
            Be first in line for early access, plus a founding member's
            discount on service fees.
          </p>
          {submitted ? (
            <p className="cta-success">You're on the list.</p>
          ) : (
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="you@email.com"
                required
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary">
                Notify me
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTASection;