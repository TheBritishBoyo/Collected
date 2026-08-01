import { useState } from "react";

function SignIn() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section auth-section">
      <div className="wrap auth-wrap">
        <div className="auth-box holo-border">
          <h2>Sign in to Collected</h2>
          <p>
            Accounts aren't connected to a real backend yet — this is a
            preview of the sign-in flow.
          </p>
          {submitted ? (
            <p className="cta-success">
              Signed in (placeholder — no account system yet).
            </p>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required placeholder="you@email.com" />
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required placeholder="••••••••" />
              <button type="submit" className="btn-primary">Sign in</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default SignIn;