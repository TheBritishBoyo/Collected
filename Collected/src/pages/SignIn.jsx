import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [mode, setMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }
      navigate("/");
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }
      if (data.session) {
        navigate("/");
      } else {
        setStatus("check-email");
      }
    }
  }

  if (user) {
    return (
      <section className="section auth-section">
        <div className="wrap auth-wrap">
          <div className="auth-box holo-border">
            <h2>You're already signed in</h2>
            <p>Signed in as {user.email}.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section auth-section">
      <div className="wrap auth-wrap">
        <div className="auth-box holo-border">
          <h2>{mode === "sign-in" ? "Sign in to Collected" : "Create your account"}</h2>
          <p>
            {mode === "sign-in"
              ? "Welcome back."
              : "Sign up to save searches and track prices (more features coming soon)."}
          </p>

          {status === "check-email" ? (
            <p className="cta-success">
              Almost there — check {email} for a confirmation link before signing in.
            </p>
          ) : (
            <>
              <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {status === "error" && <p className="auth-error">{errorMessage}</p>}
                <button type="submit" className="btn-primary" disabled={status === "loading"}>
                  {status === "loading" ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
                </button>
              </form>

              <button
                type="button"
                className="auth-switch"
                onClick={() => {
                  setMode(mode === "sign-in" ? "sign-up" : "sign-in");
                  setStatus("idle");
                  setErrorMessage("");
                }}
              >
                {mode === "sign-in" ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default SignIn;