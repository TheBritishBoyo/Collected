import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section auth-section">
      <div className="wrap auth-wrap">
        <div className="auth-box holo-border">
          <h2>Get in touch</h2>
          <p>Questions, seller applications, or feedback — send a message and we'll get back to you.</p>
          {submitted ? (
            <p className="cta-success">
              Message sent (placeholder — no backend connected yet).
            </p>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" required placeholder="Your name" />
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" required placeholder="you@email.com" />
              <label htmlFor="message">Message</label>
              <textarea id="message" required placeholder="How can we help?" rows="4"></textarea>
              <button type="submit" className="btn-primary">Send message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;